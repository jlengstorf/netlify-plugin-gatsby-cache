const fs = require("fs-extra");
const path = require("path");

module.exports = ({
  gatsby_cache_dir = ".cache",
  gatsby_public_dir = "public"
}) => {
  const gatsbyCacheDir = path.join(__dirname, "..", gatsby_cache_dir);
  const gatsbyPublicDir = path.join(__dirname, "..", gatsby_public_dir);

  return {
    name: "netlify-plugin-persist-gatsby-cache",
    preBuild: ({ constants }) => {
      const netlifyCacheDir = path.join(constants.CACHE_DIR, gatsby_cache_dir);
      const netlifyPublicDir = path.join(
        constants.CACHE_DIR,
        gatsby_public_dir
      );

      if (!fs.existsSync(netlifyCacheDir) || !fs.existsSync(netlifyPublicDir)) {
        console.log("No Gatsby cache found. Building fresh...");
        return;
      }

      Promise.all([
        fs.copy(netlifyCacheDir, gatsbyCacheDir),
        fs.copy(netlifyPublicDir, gatsbyPublicDir)
      ]).then(() => {
        console.log(
          "Loaded a previous Gatsby cache. Buckle up; we’re about to go FAST. ⚡️"
        );
      });
    },
    saveCache: ({ constants }) => {
      const netlifyCacheDir = path.join(constants.CACHE_DIR, gatsby_cache_dir);
      const netlifyPublicDir = path.join(
        constants.CACHE_DIR,
        gatsby_public_dir
      );

      Promise.all([
        fs.copy(gatsbyCacheDir, netlifyCacheDir),
        fs.copy(gatsbyPublicDir, netlifyPublicDir)
      ]).then(() => {
        console.log("Stored the Gatsby cache to speed up future builds.");
      });
    }
  };
};
