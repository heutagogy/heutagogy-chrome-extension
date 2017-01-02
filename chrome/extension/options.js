import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import Options from '../../app/containers/Options';
import { initRedux } from '../../app/utils/utils';

initRedux((store) => {
  ReactDOM.render(
    <Options store={store} />,
      document.querySelector('#root')
  );
});
