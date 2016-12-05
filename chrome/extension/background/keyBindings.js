import Immutable from 'immutable';
import { rememberArticle } from '../../../app/actions/article';
import { showModal } from '../../../app/actions/modal';
import { runOnCurrentArticle } from '../../../app/utils/utils';
import { getArticle } from '../../../app/selectors/article';
import { saveCurrentUrl } from '../../../app/actions/view';

export const bindKeyRememberArticle = (store) => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'remember-article') {
      runOnCurrentArticle(({ url, title, icon }) => {
        store.dispatch(saveCurrentUrl({ currentUrl: url }));

        const state = store.getState();
        const article = getArticle(state, state.getIn(['view', 'currentUrl']));

        if (article.get('state') === true) {
          showModal({
            article: Immutable.fromJS({ title, url, icon }),
          })(store.dispatch);
        } else {
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
