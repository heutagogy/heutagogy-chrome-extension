import Immutable from 'immutable';

export const callWithStore = (callback) => {
  chrome.storage.local.get('state', (obj) => {
    const { state } = obj;
    const initialState = state ? JSON.parse(state) : { entities: {} };
    const createStore = require('./configureStore'); //eslint-disable-line
    const store = createStore(Immutable.fromJS(initialState));

    callback(store);
  });
};
