import Immutable from 'immutable';
import bluebird from 'bluebird';
import { wrapStore } from 'react-chrome-redux';
import watch from 'redux-watch';
import { handleRememberArticle, handleReadArticle } from '../../app/utils/keyBindings';
import { tabHandler } from './background/icon';
import { getArticle } from './../../app/selectors/article';
import { initTabTracker, getTabs, getTab } from './../../app/modules/tabsTracker';
import { getUser } from './../../app/selectors/user';
import { isLoggedIn } from './../../app/utils/userUtils';

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

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;

  const initialState = state ? JSON.parse(state) : {};
  const createStore = require('../../app/store/configureStore'); //eslint-disable-line
  const store = createStore(initialState);

  wrapStore(store, { portName: 'Heutagogy' });

  chrome.commands.onCommand.addListener((command) => {
    if (command === 'remember-article') {
      handleRememberArticle(store);
    } else if (command === 'read-article') {
      handleReadArticle(store);
    }
  });

  initTabTracker(store);

  const w = watch(store.getState);

  store.subscribe(w((newVal, oldVal) => {
    newVal = Immutable.fromJS(newVal); // eslint-disable-line
    oldVal = Immutable.fromJS(oldVal); // eslint-disable-line

    getTabs(newVal).forEach((tab, tabId) => {
      const url = tab.get('url');
      const oldTab = getTab(oldVal, tabId);

      if (isLoggedIn(getUser(newVal)) !== isLoggedIn(getUser(oldVal)) ||
          url !== oldTab.get('url') ||
          tab.get('status') !== oldTab.get('status') ||
          !getArticle(newVal, url).equals(getArticle(oldVal, url))) {
        tabHandler(store)(parseInt(tabId, 10), url);
      }

      return true;
    });
  }));
});
