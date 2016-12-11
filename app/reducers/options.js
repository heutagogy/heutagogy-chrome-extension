import Immutable from 'immutable';

import { SAVE_OPTIONS } from './../actions/options';
import { saveOptions } from './../utils/localStorageUtils';


const initialState = Immutable.fromJS({
  serverAddress: 'http://localhost:5000',
  username: 'myuser',
  password: 'mypassword',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OPTIONS: {
      const newState = Immutable.fromJS({
        serverAddress: action.serverAddress,
        username: action.username,
        password: action.password,
      });

      saveOptions(newState);

      return newState;
    }
    default: {
      return state;
    }
  }
};
