import webdriver from 'selenium-webdriver';

export const delay = (time) => {
  const promise = new Promise((resolve) => setTimeout(resolve, time));

  return promise;
};

export const buildWebDriver = (extPath) => {
  const builder = new webdriver.Builder().
        withCapabilities({
          chromeOptions: {
            args: [`load-extension=${extPath}`],
          },
        }).
        forBrowser('chrome');

  return builder.build();
};
