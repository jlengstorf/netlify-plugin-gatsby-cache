module.exports = () => {
  return {
    name: 'netlify-plugin-gatsby-cache',
    async onPreBuild({ pluginConfig, utils }) {
      const hasCache = await utils.cache.restore([
        `${pluginConfig.build.publish}/.cache`,
        `${pluginConfig.build.publish}/public`,
      ]);

      if (hasCache) {
        console.log(
          'Loaded a previous Gatsby cache. Buckle up; we’re about to go FAST. ⚡️',
        );
      }
    },
    async onSaveCache({ pluginConfig, utils }) {
      const savedCache = await utils.cache.save([
        `${pluginConfig.build.publish}/.cache`,
        `${pluginConfig.build.publish}/public`,
      ]);

      if (savedCache) {
        console.log('Stored the Gatsby cache to speed up future builds.');
      }
    },
  };
};
