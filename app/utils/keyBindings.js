import Immutable from 'immutable';
import { rememberArticle } from '../actions/article';
import { runOnCurrentArticle } from '../utils/utils';
import { getArticle } from '../selectors/article';
import { getOptions } from '../selectors/options';

const updateDuplicationConfirmationState = (url) => {
  const prevState = JSON.parse(localStorage.duplicationConfirmation || '{}');
  const newState = Object.assign({}, prevState, { [url]: true });

  localStorage.setItem('duplicationConfirmation', JSON.stringify(newState));
};

export const bindKeyRememberArticle = (store) => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'remember-article') {
      runOnCurrentArticle(({ url, title, icon }) => {
        const state = store.getState();
        const article = getArticle(state, url);

        updateDuplicationConfirmationState(url);

        if (article.get('state') === true) {
          chrome.notifications.create({
            iconUrl: '/img/icon-48.png',
            type: 'basic',
            title: 'Heutagogy',
            message: 'Article is already saved. Use extension\'s popup for duplication.',
          });
        } else {
          rememberArticle({
            article: Immutable.fromJS({
              title,
              url,
              timestamp: Date.now(),
              icon,
              state: true,
            }),
            options: getOptions(state),
          })(store.dispatch);
        }
      });
    }
  });
};
