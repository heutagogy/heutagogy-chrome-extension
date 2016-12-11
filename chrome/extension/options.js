import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import Options from '../../app/containers/Options';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = state ? JSON.parse(state) : {};
  const createStore = require('../../app/store/configureStore'); //eslint-disable-line
  const store = createStore(Immutable.fromJS(initialState));

  ReactDOM.render(
    <Options store={store} />,
      document.querySelector('#root')
  );
});
