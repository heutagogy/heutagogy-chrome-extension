import { rememberArticle } from '../../../app/actions/article';
import { rememberCurrentArticle } from '../../../app/utils/utils';

export const bindKeyRememberArticle = (store) => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'remember-article') {
      rememberCurrentArticle(store.getState(), (article) => {
        store.dispatch(rememberArticle(article));
      });
    }
  });
};
