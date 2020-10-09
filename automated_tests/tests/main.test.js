const ScreenshotTester = require('puppeteer-screenshot-tester');

// this is timeouts after which error will be produced
jest.setTimeout(100000);
// this timeout should be lower than jest's otherwise error is happening
page.setDefaultTimeout(50000);

describe('Flask-Base', () => {
  beforeAll(async () => {
    // open index page
    await page.goto('http://127.0.0.1:5000/');

    // allow request interception to mock api calls
    await page.setRequestInterception(true);

    // mocking api call
    page.on('request', request => {
      if (request.url().includes('jsonplaceholder')) {
        request.respond(
          {
            content: 'application/json',
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
              "info": "intercepted by tests"
            })
          }
        );
        // this is a must
        return;
      }
      // if request was not matched continue as is
      request.continue();
    });
  });

  test('should be titled "Flask-Base"', async () => {
    await expect(page.title()).resolves.toMatch('Flask-Base');
  });

  test('login works', async () => {
    // getting array of elements with .sign class
    const sign = await page.$$('.sign');
    // we need the first one
    // click on it redirects us to login page
    await sign[1].click();

    // waiting for login field be loaded
    // it means that login page has been loaded
    await page.waitForSelector('#email');

    // entering email which we've specified in fixtures
    await page.type('#email', 'aleks@space-xxx.com');
    // entering password which we've specified in fixtures
    await page.type('#password', 'password');
    // submitting
    await page.click('#submit');

    // if we don't know which element to wait for then we can specify a timer
    await page.waitForTimeout(2000);

    // check that we are actually logged-in as user with unconfirmed account
    await page.$x('//h1[contains(text(), "Aleks Zakharov")]');

  });

  test('screenshot testing', async () => {
    const tester = await ScreenshotTester(
      0.1, // threshold of difference to raise error
      false, // anti-aliasing
      false, // ignore colors
      {
        ignoreRectangles: [[650, 300, 700, 200]], // areas to ignore
        includeRectangles: [[300, 200, 1100, 1100]]  // areas to include
      },
      {
        transparency: 0.5
      }
    );

    const result = await tester(page, 'test-screenshot', {
      fullPage: true,  // takes the screenshot of the full scrollable page
    });

    // make assertion result is always boolean
    expect(result).toBe(true);
  });

});
