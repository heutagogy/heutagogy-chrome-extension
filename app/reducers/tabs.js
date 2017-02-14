import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  urls: Immutable.Map(),
  activeTabId: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TAB_CHANGED': {
      return state.setIn(['urls', action.tabId], action.url);
    }
    case 'TAB_REMOVED': {
      return state.deleteIn(['urls', action.tabId]);
    }
    case 'TAB_ACTIVATED': {
      return state.set('activeTabId', action.tabId).setIn(['urls', action.tabId], action.url);
    }
    default: {
      return state;
    }
  }
}
