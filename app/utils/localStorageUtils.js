export const saveEntities = (newEntities) => {
  chrome.storage.local.get('state', ({ state }) => {
    const prevState = state ? JSON.parse(state) : {};

    const newState = Object.assign(
      {},
      prevState,
      { entities: newEntities.toJS() }
    );

    chrome.storage.local.set({ state: JSON.stringify(newState) });
  });
};

export const saveOptions = (newOptions) => {
  chrome.storage.local.get('state', ({ state }) => {
    const prevState = state ? JSON.parse(state) : {};

    const newState = Object.assign(
      {},
      prevState,
      { options: newOptions.toJS() },
    );

    chrome.storage.local.set({ state: JSON.stringify(newState) });
  });
};
