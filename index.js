const fs = require("fs-extra");
const path = require("path");

module.exports = ({
  gatsby_cache_dir = ".cache",
  gatsby_public_dir = "public"
}) => {
  return {
    name: "netlify-plugin-persist-gatsby-cache",
    preBuild: async ({ constants }) => {
      const gatsbyCacheDir = path.join(
        path.dirname(constants.CONFIG_PATH),
        gatsby_cache_dir
      );
      const gatsbyPublicDir = path.join(
        path.dirname(constants.CONFIG_PATH),
        gatsby_public_dir
      );
      const netlifyCacheDir = path.join(constants.CACHE_DIR, gatsby_cache_dir);
      const netlifyPublicDir = path.join(
        constants.CACHE_DIR,
        gatsby_public_dir
      );

      console.log(
        JSON.stringify(
          {
            gatsbyCacheDir,
            gatsbyPublicDir,
            netlifyCacheDir,
            netlifyPublicDir
          },
          null,
          2
        )
      );

      if (!fs.existsSync(netlifyCacheDir) || !fs.existsSync(netlifyPublicDir)) {
        console.log("No Gatsby cache found. Building fresh...");
        return;
      }

      await Promise.all([
        fs.copy(netlifyCacheDir, gatsbyCacheDir),
        fs.copy(netlifyPublicDir, gatsbyPublicDir)
      ]).then(() => {
        console.log(
          "Loaded a previous Gatsby cache. Buckle up; we’re about to go FAST. ⚡️"
        );
      });
    },
    saveCache: async ({ constants }) => {
      const gatsbyCacheDir = path.join(
        path.dirname(constants.CONFIG_PATH),
        gatsby_cache_dir
      );
      const gatsbyPublicDir = path.join(
        path.dirname(constants.CONFIG_PATH),
        gatsby_public_dir
      );
      const netlifyCacheDir = path.join(constants.CACHE_DIR, gatsby_cache_dir);
      const netlifyPublicDir = path.join(
        constants.CACHE_DIR,
        gatsby_public_dir
      );

      console.log(
        JSON.stringify(
          {
            gatsbyCacheDir,
            gatsbyPublicDir,
            netlifyCacheDir,
            netlifyPublicDir
          },
          null,
          2
        )
      );

      await Promise.all([
        fs.copy(gatsbyCacheDir, netlifyCacheDir),
        fs.copy(gatsbyPublicDir, netlifyPublicDir)
      ]).then(() => {
        console.log("Stored the Gatsby cache to speed up future builds.");
      });
    }
  };
};
