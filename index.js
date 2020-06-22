const path = require('path');

const getCacheDirs = (constants) => [
  constants.PUBLISH_DIR,
  path.normalize(`${constants.PUBLISH_DIR}/../.cache`),
];

module.exports = {
  async onPreBuild({ constants, utils }) {
    // print a helpful message if the publish dir is misconfigured
    if (process.cwd() === constants.PUBLISH_DIR) {
      utils.build.failBuild(
        `Gatsby sites must publish the public directory, but your site’s publish directory is set to “${constants.PUBLISH_DIR}”. Please set your publish directory to your Gatsby site’s public directory.`,
      );
    }

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
