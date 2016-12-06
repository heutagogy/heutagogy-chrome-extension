import ZERO from '../../../app/constants/Constants';

let windowId = ZERO; //eslint-disable-line
const CONTEXT_MENU_ID = 'example_context_menu';

const closeIfExist = () => {
  if (windowId > ZERO) {
    chrome.windows.remove(windowId);
    windowId = chrome.windows.WINDOW_ID_NONE; //eslint-disable-line
  }
};

const popWindow = (type) => {
  closeIfExist();
  const options = {
    type: 'popup',
    left: 100,
    top: 100,
    width: 800,
    height: 475,
  };

  if (type === 'open') {
    options.url = 'window.html'; //eslint-disable-line
    chrome.windows.create(options, (win) => {
      windowId = win.id; //eslint-disable-line
    });
  }
};

chrome.contextMenus.create({
  id: CONTEXT_MENU_ID,
  title: 'Heutagogy Extension',
  contexts: ['all'],
  documentUrlPatterns: [
    'https://github.com/*',
  ],
});

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === CONTEXT_MENU_ID) {
    popWindow('open');
  }
});
