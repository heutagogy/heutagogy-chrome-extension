import chromedriver from 'chromedriver';
import webdriver from 'selenium-webdriver';

export const delay = (time) => {
  const promise = new Promise((resolve) => setTimeout(resolve, time));

  return promise;
};

let crdvIsStarted = false; //eslint-disable-line
export const startChromeDriver = () => {
  if (crdvIsStarted) return Promise.resolve();
  chromedriver.start();
  process.on('exit', chromedriver.stop);
  crdvIsStarted = true; //eslint-disable-line

  return delay(1000); //eslint-disable-line
};

export const buildWebDriver = (extPath) => {
  const builder = new webdriver.Builder().
        usingServer('http://localhost:9515').
        withCapabilities({
          chromeOptions: {
            args: [`load-extension=${extPath}`],
          },
        }).
        forBrowser('chrome');

  return builder.build();
};
