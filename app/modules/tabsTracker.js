import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  tabs: new Immutable.Map(),
  activeTabId: null,
});

export const getCurrentTab = (store) => store.getIn(['tabs', 'activeTabId']);

export const getTabUrl = (store, tabId) => store.getIn(['tabs', 'tabs', tabId, 'url']);

export const getTabs = (store) => store.getIn(['tabs', 'tabs']);

export const getTab = (store, tabId) => store.getIn(['tabs', 'tabs', tabId], new Immutable.Map());

export const getCurrentUrl = (store) => getTabUrl(store, getCurrentTab(store));

export const initTabTracker = (store) => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { // eslint-disable-line
    const action = {
      type: 'TAB_CHANGED',
      tabId,
    };

    if (changeInfo.url) {
      action.url = changeInfo.url; // eslint-disable-line
    }
    if (changeInfo.title) {
      action.title = changeInfo.title; // eslint-disable-line
    }
    if (changeInfo.status) {
      action.status = changeInfo.status; // eslint-disable-line
    }
    store.dispatch(action);
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      store.dispatch({
        type: 'TAB_ACTIVATED',
        tabId: activeInfo.tabId,
        url: tab.url,
        title: tab.title,
        status: tab.status,
      });
    });
  });

  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => { // eslint-disable-line
    store.dispatch({
      type: 'TAB_REMOVED',
      tabId,
    });
  });
};

const updateState = (state, action) =>
      state.mergeIn(['tabs', action.tabId], Immutable.fromJS(action).delete('type').delete('tabId'));

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TAB_CHANGED': {
      return updateState(state, action);
    }
    case 'TAB_REMOVED': {
      return state.deleteIn(['tabs', action.tabId]);
    }
    case 'TAB_ACTIVATED': {
      return updateState(state.set('activeTabId', action.tabId), action);
    }
    default: {
      return state;
    }
  }
};
