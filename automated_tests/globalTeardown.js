const utils = require('./utils');

module.exports = async function globalTeardown(globalConfig) {
  await utils.knex.destroy();
};
