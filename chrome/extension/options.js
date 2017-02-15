import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { Store } from 'react-chrome-redux';
import Options from '../../app/containers/Options';

const store = new Store({
  portName: 'Heutagogy',
});

store.ready().then(() => {
  ReactDOM.render(
    <Options store={store} />,
      document.querySelector('#root')
  );
});
