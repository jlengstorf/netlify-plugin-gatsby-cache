const CACHE_DIRS = ['./.cache', './public'];

module.exports = () => {
  return {
    name: 'netlify-plugin-gatsby-cache',
    async onPreBuild({ utils }) {
      if (await utils.cache.restore(CACHE_DIRS)) {
        console.log('Found a Gatsby cache. We’re about to go FAST. ⚡️');
      } else {
        console.log('No Gatsby cache found. Building fresh.');
      }
    },
    async onPostBuild({ utils }) {
      if (await utils.cache.save(CACHE_DIRS)) {
        console.log('Stored the Gatsby cache to speed up future builds.');
      } else {
        console.log('Something went wrong storing the cache.');
      }
    },
  };
};
