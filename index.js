const path = require('path');

const getCacheDirs = constants => [
  constants.BUILD_DIR,
  path.normalize(`${constants.BUILD_DIR}/../.cache`),
];

module.exports = () => {
  return {
    name: 'netlify-plugin-gatsby-cache',
    async onPreBuild({ constants, utils }) {
      const cacheDirs = getCacheDirs(constants);

      if (await utils.cache.restore(cacheDirs)) {
        console.log('Found a Gatsby cache. We’re about to go FAST. ⚡️');
      } else {
        console.log('No Gatsby cache found. Building fresh.');
      }
    },
    async onPostBuild({ constants, utils }) {
      const cacheDirs = getCacheDirs(constants);

      if (await utils.cache.save(cacheDirs)) {
        console.log('Stored the Gatsby cache to speed up future builds.');
      } else {
        console.log('No Gatsby build found.');
      }
    },
  };
};
