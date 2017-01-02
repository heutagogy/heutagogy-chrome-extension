import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { initRedux } from './../../app/utils/utils';
import Root from '../../app/containers/Root';
import './../../app/assets/media.less';
import './../../app/assets/normalize.less';
import './../../app/assets/typography.less';

initRedux((store) => {
  /* eslint-disable */
  chrome.extension.getBackgroundPage().console.log('app');
  chrome.extension.getBackgroundPage().console.log(JSON.stringify(store.getState(), null, 2));
  /* eslint-enable */

  chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' });
  ReactDOM.render(
    <Root store={store} />,
      document.querySelector('#root')
  );
});
