import Immutable from 'immutable';

export const rememberCurrentArticle = (state, rememberArticle) => {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  }, (tabs) => {
    const currentUrl = tabs[0].url;
    const currentTitle = tabs[0].title;
    const icon = tabs[0].favIconUrl;

    rememberArticle({
      article: Immutable.fromJS({
        title: currentTitle,
        url: currentUrl,
        timestamp: Date.now(),
        icon,
        state,
      }),
    });
  });
};
