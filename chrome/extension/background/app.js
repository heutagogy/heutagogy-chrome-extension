import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { bindKeyRememberArticle } from './keyBindings';
import Root from '../../../app/containers/Root';
import './../../../app/assets/media.less';
import './../../../app/assets/normalize.less';
import './../../../app/assets/typography.less';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = state ? JSON.parse(state) : { entities: {} };
  const createStore = require('../../../app/store/configureStore'); //eslint-disable-line		
  const store = createStore(Immutable.fromJS(initialState));

  chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' });

  bindKeyRememberArticle(store);

  ReactDOM.render(
    <Root store={store} />,
      document.querySelector('#root')
  );
});
