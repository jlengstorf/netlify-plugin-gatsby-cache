const fs = require("fs-extra");
const path = require("path");

const getNetlifyCacheDirs = ({ config, constants }) => {
  const cacheDir = constants.CACHE_DIR;
  const gatsbyDir = path.dirname(config.build.publish);

  return {
    gatsbyCacheDir: path.join(gatsbyDir, ".cache"),
    gatsbyPublicDir: path.join(gatsbyDir, "public"),
    netlifyCacheDir: path.join(cacheDir, "gatsby/.cache"),
    netlifyPublicDir: path.join(cacheDir, "gatsby/public")
  };
};

module.exports = () => {
  return {
    name: "netlify-plugin-gatsby-cache",
    onPreBuild: async args => {
      const {
        gatsbyCacheDir,
        gatsbyPublicDir,
        netlifyCacheDir,
        netlifyPublicDir
      } = getNetlifyCacheDirs(args);

      if (!fs.existsSync(netlifyCacheDir) || !fs.existsSync(netlifyPublicDir)) {
        console.log("No Gatsby cache found. Building fresh...");
        return;
      }

      await Promise.all([
        fs.copy(netlifyCacheDir, gatsbyCacheDir),
        fs.copy(netlifyPublicDir, gatsbyPublicDir)
      ])
        .then(() => {
          console.log(
            "Loaded a previous Gatsby cache. Buckle up; we’re about to go FAST. ⚡️"
          );
        })

        .catch(() => {
          console.error(error.message);
        });
    },
    onSaveCache: async args => {
      const {
        gatsbyCacheDir,
        gatsbyPublicDir,
        netlifyCacheDir,
        netlifyPublicDir
      } = getNetlifyCacheDirs(args);

      await Promise.all([
        fs.copy(gatsbyCacheDir, netlifyCacheDir),
        fs.copy(gatsbyPublicDir, netlifyPublicDir)
      ])
        .then(() => {
          console.log("Stored the Gatsby cache to speed up future builds.");
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  };
};
