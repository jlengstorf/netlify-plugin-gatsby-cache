const path = require('path');

const getCacheDirs = constants => [
  constants.PUBLISH_DIR,
  path.normalize(`${constants.PUBLISH_DIR}/../.cache`),
];

module.exports = {
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
      console.log('Something went wrong storing the cache.');
    }
  },
};
