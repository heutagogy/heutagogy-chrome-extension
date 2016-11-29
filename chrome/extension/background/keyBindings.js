import Immutable from 'immutable';
import { callWithStore } from '../../../app/store/utils';
import { rememberArticle } from '../../../app/actions/article';

callWithStore((store) => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'remember-article') {
      chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      }, (tabs) => {
        const currentUrl = tabs[0].url;
        const currentTitle = tabs[0].title;
        const icon = tabs[0].favIconUrl;
        const state = store.getState();

        rememberArticle({
          article: Immutable.fromJS({
            title: currentTitle,
            url: currentUrl,
            timestamp: Date.now(),
            icon,
            state,
          }),
        })(store.dispatch);
      });
    }
  });
});
