import path from 'path'; //eslint-disable-line
import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import { delay, buildWebDriver } from '../func';

describe('inject page (in github.com)', function test() {
  let driver; //eslint-disable-line

  this.timeout(15000); //eslint-disable-line

  before(async () => {
    const extPath = path.resolve('build');

    driver = buildWebDriver(extPath); //eslint-disable-line
    await driver.get('https://github.com');
  });

  after(async () => driver.quit());

  it('should open Github', async () => {
    const title = await driver.getTitle();

    expect(title).to.equal('How people build software · GitHub');
  });

  it('should render inject app', async () => {
    await driver.wait(
      () => driver.findElements(webdriver.By.className('inject-react-example')).
        then((elems) => elems.length > 0), //eslint-disable-line
      10000, //eslint-disable-line
      'Inject app not found'
    );
  });

  it('should find `Open` button', async () => {
    await driver.wait(
      () => driver.findElements(webdriver.By.css('.inject-react-example button')).
        then((elems) => elems.length > 0), //eslint-disable-line
      10000, //eslint-disable-line
      'Inject app `Open` button not found'
    );
  });

  it('should find iframe', async () => {
    driver.findElement(webdriver.By.css('.inject-react-example button')).click();
    await delay(1000); //eslint-disable-line
    await driver.wait(
      () => driver.findElements(webdriver.By.css('.inject-react-example iframe')).
        then((elems) => elems.length > 0), //eslint-disable-line
      10000, //eslint-disable-line
      'Inject app iframe not found'
    );
  });
});
