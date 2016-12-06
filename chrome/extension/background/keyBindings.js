import Immutable from 'immutable';
import { rememberArticle } from '../../../app/actions/article';
import { runOnCurrentArticle } from '../../../app/utils/utils';
import { getArticle } from '../../../app/selectors/article';
import { saveCurrentUrl } from '../../../app/actions/view';

export const bindKeyRememberArticle = (store) => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'remember-article') {
      runOnCurrentArticle(({ url, title, icon }) => {
        const state = store.getState();
        const article = getArticle(state, state.getIn(['view', 'currentUrl']));

        if (article.get('state') === true) {
          chrome.notifications.create({
            iconUrl: '/img/icon-48.png',
            type: 'basic',
            title: 'Heutagogy',
            message: 'Article already saved. Use extension\'s popup for duplication.',
          });
        } else {
          store.dispatch(saveCurrentUrl({ currentUrl: url }));
          rememberArticle({
            article: Immutable.fromJS({
              title,
              url,
              timestamp: Date.now(),
              icon,
              state: true,
            }),
          })(store.dispatch);
        }
      });
    }
  });
};
