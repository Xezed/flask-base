// this is timeouts after which error will be produced
jest.setTimeout(100000);
// this timeout should be lower than jest's otherwise error is happening
page.setDefaultTimeout(50000);

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5000/');
  });

  test('should be titled "Google"', async () => {
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

    // wait for this class to be sure that page have been loaded
    await page.waitForSelector('.raised');

    // check that we are actually logged-in as user with unconfirmed account
    await page.$x('//h3[contains(text(), "You need to confirm your account before continuing.")]');

  });

});
