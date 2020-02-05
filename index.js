const fs = require('fs');

module.exports = () => {
  return {
    name: 'netlify-plugin-gatsby-cache',
    async onPreBuild({ netlifyConfig, utils }) {
      console.log([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);
      const hasCache = await utils.cache.restore([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);

      if (fs.existsSync(`${netlifyConfig.build.publish}/.cache`)) {
        console.log('cache dir found!');
      } else {
        console.log('no cache dir :(');
      }

      console.log({ hasCache });

      if (hasCache) {
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
      const savedCache = await utils.cache.save([
        `${netlifyConfig.build.publish}/.cache`,
        `${netlifyConfig.build.publish}/public`,
      ]);
      console.log({ savedCache });
      if (fs.existsSync(`${netlifyConfig.build.publish}/.cache`)) {
        console.log('cache dir found!');
      } else {
        console.log('no cache dir :(');
      }

      if (savedCache) {
        console.log('Stored the Gatsby cache to speed up future builds.');
      }
    },
  };
};
