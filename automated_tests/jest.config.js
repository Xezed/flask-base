module.exports = {
  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: "./globalSetup.js",

  // A path to a module which exports an async function that is triggered once after all test suites
  globalTeardown: "./globalTeardown.js",

  preset: "jest-puppeteer",
  testEnvironment: 'jest-environment-puppeteer',
};
