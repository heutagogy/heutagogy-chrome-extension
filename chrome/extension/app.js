import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { Store } from 'react-chrome-redux';
import Root from '../../app/containers/Root';
import './../../app/assets/media.less';
import './../../app/assets/normalize.less';
import './../../app/assets/typography.less';

const store = new Store({
  portName: 'Heutagogy',
});

store.ready().then(() => {
  ReactDOM.render(
    <Root store={store} />,
      document.querySelector('#root')
  );
});
