import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import Options from '../../app/containers/Options';
import { Store } from 'react-chrome-redux';

const store = new Store({
  portName: 'Heutagogy',
});

store.ready().then(() => {
  ReactDOM.render(
    <Options store={store} />,
      document.querySelector('#root')
  );
});
