module.exports = {
  // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
  launch: {
    // here we can specify where we want to launch UI
    headless: false,
    defaultViewport: { width: 1600, height: 900 }
  },
  browserContext: 'incognito',
};
