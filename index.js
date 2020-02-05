module.exports = () => {
  return {
    name: 'netlify-plugin-gatsby-cache',
    async onPreBuild({ netlifyConfig, utils }) {
      const cacheDirectories = [
        path.join(netlifyConfig.build.publish, '..', '.cache'),
        netlifyConfig.build.publish,
      ];

      console.log({ cacheDirectories });

      if (await utils.cache.restore(cacheDirectories)) {
        console.log(
          'Loaded a previous Gatsby cache. Buckle up; we’re about to go FAST. ⚡️',
        );
      } else {
        console.log('No Gatsby cache found. Building fresh.');
      }
    },
    async onPostBuild({ netlifyConfig, utils }) {
      const cacheDirectories = [
        path.join(netlifyConfig.build.publish, '..', '.cache'),
        netlifyConfig.build.publish,
      ];

      if (await utils.cache.save(cacheDirectories)) {
        console.log('Stored the Gatsby cache to speed up future builds.');
      } else {
        console.log('Something went wrong storing the cache.');
      }
    },
  };
};
