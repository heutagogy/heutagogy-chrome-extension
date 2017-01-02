import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import Options from '../../app/containers/Options';
import { initRedux } from '../../app/utils/utils';

initRedux((store) => {
  /* eslint-disable */
  chrome.extension.getBackgroundPage().console.log('options');
  chrome.extension.getBackgroundPage().console.log(JSON.stringify(store.getState(), null, 2));
  /* eslint-enable */

  ReactDOM.render(
    <Options store={store} />,
      document.querySelector('#root')
  );
});
