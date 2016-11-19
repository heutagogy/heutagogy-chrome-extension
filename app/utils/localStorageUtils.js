export const saveEntities = (state) => {
  chrome.storage.local.set({ state: JSON.stringify({ entities: state.toJS() }) });
};
