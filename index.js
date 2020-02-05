module.exports = () => {
  return {
    name: 'netlify-plugin-gatsby-cache',
    async onPreBuild({ netlifyConfig, utils }) {
      const hasCache = await utils.cache.restore([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);

      if (hasCache) {
        console.log(
          'Loaded a previous Gatsby cache. Buckle up; we’re about to go FAST. ⚡️',
        );
      }
    },
    async onSaveCache({ netlifyConfig, utils }) {
      const savedCache = await utils.cache.save([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);

      if (savedCache) {
        console.log('Stored the Gatsby cache to speed up future builds.');
      }
    },
  };
};
