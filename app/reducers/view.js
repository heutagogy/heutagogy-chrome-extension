import Immutable from 'immutable';

import { SET_CURRENT_URL } from './../actions/view';

const initialState = Immutable.fromJS({
  currentUrl: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_URL: {
      return state.set('currentUrl', action.url);
    }
    default: {
      return state;
    }
  }
};
