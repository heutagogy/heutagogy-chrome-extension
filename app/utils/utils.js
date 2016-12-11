import Immutable from 'immutable';

export const runOnCurrentArticle = (callback) => {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  }, (tabs) => {
    const url = tabs[0].url;
    const title = tabs[0].title;
    const icon = tabs[0].favIconUrl;

    callback({ url, title, icon });
  });
};

export const initRedux = (callback) => {
  chrome.storage.local.get('state', (obj) => {
    const { state } = obj;

    const initialState = state ? JSON.parse(state) : {};
    const createStore = require('../store/configureStore'); //eslint-disable-line
    const store = createStore(Immutable.fromJS(initialState));

    callback(store);
  });
};
