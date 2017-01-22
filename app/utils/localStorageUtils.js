import { ZERO } from './../constants/Constants';

const save = (newEntities, key) => {
  if (Object.keys(newEntities).length === ZERO) {
    return;
  }

  chrome.storage.local.get('state', ({ state }) => {
    const prevState = state ? JSON.parse(state) : {};

    const newState = Object.assign(
      {},
      prevState,
      { [key]: newEntities.toJS() }
    );

    chrome.storage.local.set({ state: JSON.stringify(newState) });
  });
};

export const saveEntities = (newEntities) => {
  save(newEntities, 'entities');
};

export const saveOptions = (newOptions) => {
  save(newOptions, 'options');
};
