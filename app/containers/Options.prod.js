import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { PropTypes, Component } from 'react';
import { connect, Provider } from 'react-redux';

import LoginForm from './../components/LoginForm';
import en from './../../lang/en.json';
import i18n from '../i18n';
import ru from './../../lang/ru.json';
import themes from './../uiTheme/themes';


const localeData = { en, ru };
const DEFAULT_LOCALE = 'en';
const activeTheme = themes.DARK_THEME;
const theme = () => getMuiTheme({});

class Options extends Component {
  static propTypes = {
    children: PropTypes.node,
    store: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    theme: PropTypes.object,
  }

  getChildContext() {
    return {
      theme: activeTheme,
    };
  }

  getThematicStyles = () => ({
    app: {},
  })


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
            <MuiThemeProvider muiTheme={theme()}>
              <LoginForm />
            </MuiThemeProvider>
          </i18n.Provider>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

export default connect()(Options);
