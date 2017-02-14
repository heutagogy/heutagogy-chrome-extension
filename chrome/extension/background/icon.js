import { fetchArticleByUrl } from './../../../app/actions/article';
import { getArticle } from './../../../app/selectors/article';
import { getUser } from './../../../app/selectors/user';
import { isLoggedIn } from './../../../app/utils/userUtils';

import icon16 from './../../assets/img/icon-16.png';
import icon32 from './../../assets/img/icon-32.png';
import icon128 from './../../assets/img/icon-128.png';

import icon16Saved from './../../assets/img/icon-16-saved.png';
import icon32Saved from './../../assets/img/icon-32-saved.png';
import icon128Saved from './../../assets/img/icon-128-saved.png';

export const tabHandler = (store) => (tabId, url) => {
  store.dispatch(fetchArticleByUrl(url)).then(() => {
    const state = store.getState();
    const article = getArticle(state, url);
    const user = getUser(state);

    if (isLoggedIn(user)) {
      if (article.get('read')) {
        chrome.browserAction.setBadgeBackgroundColor({ color: '#ff4081', tabId });
        chrome.browserAction.setBadgeText({ text: ' ', tabId });
      } else {
        chrome.browserAction.setBadgeText({ text: '', tabId });
      }

      if (article.get('id')) {
        chrome.browserAction.setIcon({
          path: { 16: icon16Saved, 32: icon32Saved, 128: icon128Saved },
          tabId,
        });
      } else {
        chrome.browserAction.setIcon({
          path: { 16: icon16, 32: icon32, 128: icon128 },
          tabId,
        });
      }
    }
  });
};
