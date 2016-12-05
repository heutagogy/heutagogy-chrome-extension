import Immutable from 'immutable';

import { SHOW_MODAL, HIDE_MODAL } from './../actions/modal';

const initialState = Immutable.fromJS({
  modalMeta: {},
  modalType: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return Immutable.fromJS({
        modalMeta: action.modalMeta,
        modalType: action.modalType,
      });
    }
    case HIDE_MODAL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
