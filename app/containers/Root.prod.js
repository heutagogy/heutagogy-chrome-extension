import { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';

import i18n from '../i18n';

import ru from './../../lang/ru.json';
import en from './../../lang/en.json';

const localeData = {
  en,
  ru,
};

const DEFAULT_LOCALE = 'en';

class Root extends Component {
  static propTypes = {
    children: PropTypes.node,
    store: PropTypes.object.isRequired,
  }

  render() {
    const { store } = this.props;
    const lang = DEFAULT_LOCALE;
    const i18nTools = new i18n.Tools({ localeData: localeData[lang], locale: lang });

    return (
      <Provider store={store}>
        <div className="projectname-root-wrapper">
          <i18n.Provider
            i18n={i18nTools}
            setLanguage={this.setLanguage}
          >
            <App />
          </i18n.Provider>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

export default Root;
