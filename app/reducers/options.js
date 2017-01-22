import Immutable from 'immutable';

import { USER_LOGIN_STARTED, USER_LOGIN_SUCCESS } from './../actions/options';
import { saveOptions } from './../utils/localStorageUtils';

const initialState = Immutable.fromJS({
  serverAddress: 'http://localhost:5000',
  username: 'myuser',
  password: 'mypassword',
  authUser: Immutable.fromJS({}),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_STARTED: {
      return Immutable.fromJS({
        serverAddress: action.meta.serverAddress,
        username: action.meta.username,
        password: action.meta.password,
        authUser: Immutable.fromJS({}),
      });
    }
    case USER_LOGIN_SUCCESS: {
      const user = action.payload.getIn(['entities', 'authUser']);
      const newState = state.setIn(['authUser'], user ? user.toList().first() : Immutable.fromJS({}));

      saveOptions(newState);

      return newState;
    }
    default: {
      return state;
    }
  }
};
