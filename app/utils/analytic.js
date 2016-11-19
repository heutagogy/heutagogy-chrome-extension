import ReactGA from 'react-ga';
import { ANALYTYC_USER_ID } from './../constants/Api';

const CATEGORIES = {
  USER_ACTIONS: 'User actions',
  FORMS: 'Forms actions',
};

const defaultConfig = process.env.NODE_ENV === 'production' ? {} : {
  options: {
    cookieDomain: 'none',
  },
};

const eventsHash = {
};

class Analytyc {
  constructor() {
    ReactGA.initialize(ANALYTYC_USER_ID, {
      ...defaultConfig,
    });
    ReactGA.event({
      category: CATEGORIES.USER_ACTIONS,
      action: 'User opened website',
    });
  }

  sendPageView(path) {
    ReactGA.pageview(path);
  }

  sendEvent(category, action) {
    ReactGA.event({
      category: CATEGORIES[category] || 'Unknown',
      action,
    });
  }

  handleEvent(action) {
    if (eventsHash[action.type]) {
      eventsHash[action.type]({
        action,
        sendEvent: this.sendEvent,
        sendPageView: this.sendPageView,
      });
    }
  }
}

export default (new Analytyc());
