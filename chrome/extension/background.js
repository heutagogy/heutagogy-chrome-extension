import bluebird from 'bluebird';
import { handleRememberArticle, handleReadArticle } from '../../app/utils/keyBindings';
import { initRedux } from '../../app/utils/utils';

global.Promise = bluebird; //eslint-disable-line

const promisifier = (method) => {
  // a function
  const promisified = (...args) => {
    // which returns a promise
    const promise = new Promise(
      (resolve) => {
        args.push(resolve);
        method.apply(this, args);
      }
    );

    return promise;
  };

  return promisified;
};

const promisifyAll = (obj, list) => {
  list.forEach((api) => bluebird.promisifyAll(obj[api], { promisifier }));
};

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus',
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/icon'); //eslint-disable-line

chrome.commands.onCommand.addListener((command) => {
  if (command === 'remember-article') {
    initRedux(handleRememberArticle);
  } else if (command === 'read-article') {
    initRedux(handleReadArticle);
  }
});
