module.exports = () => {
  return {
    name: 'netlify-plugin-gatsby-cache',
    async onPreBuild({ netlifyConfig, utils }) {
      console.log([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);

      const hasCacheRestored = await utils.cache.restore([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);

      if (await utils.cache.has(`${netlifyConfig.build.publish}/.cache`)) {
        console.log('cache dir found!');
      } else {
        console.log('no cache dir :(');
      }

      console.log({ hasCacheRestored });

      if (hasCacheRestored) {
        console.log(
          'Loaded a previous Gatsby cache. Buckle up; we’re about to go FAST. ⚡️',
        );
      }
    },
    async onPostBuild({ netlifyConfig, utils }) {
      console.log([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);

      const hasCacheSaved = await utils.cache.save([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);

      console.log({ hasCacheSaved });

      if (await utils.cache.has(`${netlifyConfig.build.publish}/.cache`)) {
        console.log('cache dir found!');
      } else {
        console.log('no cache dir :(');
      }

      if (hasCacheSaved) {
        console.log('Stored the Gatsby cache to speed up future builds.');
      }
    },
  };
};
