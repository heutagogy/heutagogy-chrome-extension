import Immutable from 'immutable';

import { USER_LOGIN_STARTED } from './../actions/options';
import { saveOptions } from './../utils/localStorageUtils';


const initialState = Immutable.fromJS({
  serverAddress: 'http://localhost:5000',
  username: 'myuser',
  password: 'mypassword',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_STARTED: {
      const newState = Immutable.fromJS({
        serverAddress: action.meta.serverAddress,
        username: action.meta.username,
        password: action.meta.password,
      });

      saveOptions(newState);

      return newState;
    }
    default: {
      return state;
    }
  }
};
