import Immutable from 'immutable';

import { USER_LOGIN_STARTED, USER_LOGIN_SUCCESS } from './../actions/options';
import { SET_SERVER_ADDRESS } from './../actions/server';
import { saveOptions } from './../utils/localStorageUtils';


const initialState = Immutable.fromJS({
  authUser: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVER_ADDRESS: {
      const newState = state.setIn(['serverAddress'], action.address);

      saveOptions(newState);

      return newState;
    }
    case USER_LOGIN_STARTED: {
      const newState = state.setIn(['authUser'], Immutable.fromJS({}));

      saveOptions(newState);

      return newState;
    }
    case USER_LOGIN_SUCCESS: {
      const userData = action.payload.getIn(['entities', 'authUser']);
      const user = userData ? userData.toList().first() : Immutable.fromJS({});
      const stateWithAuth = state.setIn(['authUser'], user);
      const newState = stateWithAuth.setIn(['username'], action.meta.username);

      saveOptions(newState);

      return newState;
    }
    default: {
      return state;
    }
  }
};
