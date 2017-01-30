import Immutable from 'immutable';
import moment from 'moment';
import { rememberArticle, updateArticle } from './../actions/article';
import { runOnCurrentArticle } from './../utils/utils';
import { getArticle } from './../selectors/article';
import { getUser } from './../selectors/user';
import { isLoggedIn } from './../utils/userUtils';

const showNotification = (message) => {
  chrome.notifications.create({
    iconUrl: '/img/icon-48.png',
    type: 'basic',
    title: 'Heutagogy',
    message,
  });
};

export const handleRememberArticle = (store) => {
  runOnCurrentArticle(({ url, title, icon }) => {
    const state = store.getState();
    const article = getArticle(state, url);
    const user = getUser(state);

    if (!isLoggedIn(user)) {
      chrome.runtime.openOptionsPage();
    } else if (article.get('id')) {
      showNotification('Article is already saved.');
    } else {
      rememberArticle({
        article: Immutable.fromJS({
          title,
          url,
          timestamp: moment().format(),
          icon,
        }),
      })(store.dispatch);
      showNotification('Article saved.');
    }
  });
};

export const handleReadArticle = (store) => {
  runOnCurrentArticle(({ url }) => {
    const state = store.getState();
    const article = getArticle(state, url);
    const user = getUser(state);

    if (!isLoggedIn(user)) {
      chrome.runtime.openOptionsPage();
    } else if (article.get('id')) {
      showNotification(article.get('read') ? 'Article marked as unread' : 'Article marked as read');
      updateArticle(
        article.get('id'),
        { read: article.get('read') ? null : moment().format() }
      )(store.dispatch);
    } else {
      showNotification('Please, save article first');
    }
  });
};
