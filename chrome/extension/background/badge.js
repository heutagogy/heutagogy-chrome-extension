import { initRedux } from './../../../app/utils/utils';
import { fetchArticleByUrl } from './../../../app/actions/article';
import { getArticle } from './../../../app/selectors/article';
import { getUser } from './../../../app/selectors/user';
import { isLoggedIn } from './../../../app/utils/userUtils';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    const currentUrl = tab.url;
    const changeBadge = (store) => {
      fetchArticleByUrl(currentUrl)(store.dispatch).
        then(() => {
          const state = store.getState();
          const article = getArticle(state, currentUrl);
          const user = getUser(state);

          chrome.extension.getBackgroundPage().console.log(article.get('id'));

          if (isLoggedIn(user) && article.get('id')) {
            chrome.browserAction.setBadgeBackgroundColor({ color: '#00bcd4', tabId });
            chrome.browserAction.setBadgeText({ text: ' ', tabId });
          }
        });
    };

    initRedux(changeBadge);
  }
});
