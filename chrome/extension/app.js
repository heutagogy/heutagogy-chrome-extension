import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import { callWithStore } from '../../app/store/utils';
import './../../app/assets/normalize.less';
import './../../app/assets/media.less';
import './../../app/assets/typography.less';

callWithStore((store) => {
  chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' });

  ReactDOM.render(
    <Root store={store} />,
      document.querySelector('#root')
    );
});
