import Immutable from 'immutable';
import moment from 'moment';
import { rememberArticle } from './../actions/article';
import { runOnCurrentArticle } from './../utils/utils';
import { getArticle } from './../selectors/article';
import { getOptions } from './../selectors/options';
import { getUser } from './../selectors/user';

const updateDuplicationConfirmationState = (url) => {
  const prevState = JSON.parse(localStorage.duplicationConfirmation || '{}');
  const newState = Object.assign({}, prevState, { [url]: true });

  localStorage.setItem('duplicationConfirmation', JSON.stringify(newState));
};

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

    updateDuplicationConfirmationState(url);

    if (!user) {
      showNotification('Please, open “Options” window and log in.');
    } else if (article.get('state') === true) {
      showNotification('Article is already saved. Use extension\'s popup for duplication.');
    } else {
      rememberArticle({
        article: Immutable.fromJS({
          title,
          url,
          timestamp: moment().format(),
          icon,
          state: true,
        }),
        serverAddress: getOptions(state).get('serverAddress'),
        token: user.get('access_token'),
      })(store.dispatch);
    }
  });
};
