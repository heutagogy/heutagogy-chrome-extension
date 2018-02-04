import Immutable from 'immutable';
import moment from 'moment';
import { rememberArticle, updateArticle } from './../actions/article';
import { getArticle } from './../selectors/article';
import { getUser } from './../selectors/user';
import { isLoggedIn } from './../utils/userUtils';
import { getCurrentTab, getTab } from './../modules/tabsTracker';

const showNotification = (message) => {
  chrome.notifications.create({
    iconUrl: '/img/icon-32.png',
    type: 'basic',
    title: 'Heutagogy',
    message,
  });
};

export const handleRememberArticle = (store) => {
  const state = Immutable.fromJS(store.getState());
  const tab = getTab(state, getCurrentTab(state));
  const url = tab.get('url');
  const title = tab.get('title');
  const article = getArticle(state, url);
  const user = getUser(state);

  if (!isLoggedIn(user)) {
    chrome.runtime.openOptionsPage();
  } else if (article.get('id')) {
    showNotification('Article is already saved');
  } else {
    store.dispatch(rememberArticle({
      article: Immutable.fromJS({
        title,
        url,
        timestamp: moment().format(),
      }),
    }));
    showNotification('Article saved.');
  }
};

export const handleReadArticle = (store) => {
  const state = Immutable.fromJS(store.getState());
  const tab = getTab(state, getCurrentTab(state));
  const url = tab.get('url');
  const article = getArticle(state, url);
  const user = getUser(state);

  if (!isLoggedIn(user)) {
    chrome.runtime.openOptionsPage();
  } else if (article.get('id')) {
    showNotification(article.get('read') ? 'Article marked as unread' : 'Article marked as read');
    store.dispatch(updateArticle(
      article.get('id'),
      { read: article.get('read') ? null : moment().format() }
    ));
  } else {
    showNotification('Please, save article first');
  }
};
