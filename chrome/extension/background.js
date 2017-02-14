import Immutable from 'immutable';
import bluebird from 'bluebird';
import { wrapStore } from 'react-chrome-redux';
import watch from 'redux-watch';
import { handleRememberArticle, handleReadArticle } from '../../app/utils/keyBindings';
import { tabHandler } from './background/icon';

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
  const store = createStore(Immutable.fromJS(initialState));
  wrapStore(store, {portName: 'Heutagogy'});

  chrome.commands.onCommand.addListener((command) => {
    if (command === 'remember-article') {
      handleRememberArticle(store);
    } else if (command === 'read-article') {
      handleReadArticle(store);
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      store.dispatch({
        type: 'TAB_CHANGED',
        tabId,
        url: changeInfo.url,
      });
    }
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      store.dispatch({
        type: 'TAB_ACTIVATED',
        tabId: activeInfo.tabId,
        url: tab.url,
      });
    });
  });

  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    store.dispatch({
      type: 'TAB_REMOVED',
      tabId,
    });
  });

  let w = watch(() => store.getState().getIn(['tabs', 'urls']));
  store.subscribe(w((newVal, oldVal, objectPath) => {
    newVal.forEach((url, tabId) => {
      if (url !== oldVal.get(tabId, null)) {
        tabHandler(store)(tabId, url);
      }
      return true;
    });
  }));
});
