const { setup: setupPuppeteer } = require('jest-environment-puppeteer');
const utils = require('./utils');

const knexCleaner = require('knex-cleaner');
const sqlFixtures = require('sql-fixtures');

const fixtureCreator = new sqlFixtures(utils.knex);

module.exports = async function globalSetup(globalConfig) {
  await setupPuppeteer(globalConfig);
  // clean DB before each run
  await knexCleaner.clean(utils.knex);
  // these are fixtures with which we are populating the database
  // Order is important. The earlier an assignment - the earlier creation.
  await fixtureCreator.create({
    roles: [
      {
        id: 1,
        name: 'Admin',
        index: 'admin',
        default: false,
        // admin permission in flask_base
        permissions: 255
      }
    ],
    users: [
      {
        first_name: 'Aleks',
        last_name: 'Zakharov',
        confirmed: true,
        email: 'aleks@space-xxx.com',
        // double the colon in order to escape
        password_hash: 'pbkdf2::sha256::150000$cUczhMmV$2a20becb3dd09d6c2464fcc44f2f9154df4f71b05beb9201716f591f4a5f9393',
        role_id: 1
      }
    ],
  });
};
