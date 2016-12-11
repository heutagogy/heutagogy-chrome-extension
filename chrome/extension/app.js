import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { initRedux } from './../../app/utils/utils';
import Root from '../../app/containers/Root';
import './../../app/assets/media.less';
import './../../app/assets/normalize.less';
import './../../app/assets/typography.less';

initRedux((store) => {
  chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' });
  ReactDOM.render(
    <Root store={store} />,
      document.querySelector('#root')
  );
});
