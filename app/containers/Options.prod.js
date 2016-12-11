import { PropTypes, Component } from 'react';
import { connect, Provider } from 'react-redux';
import { saveOptions } from './../actions/options';
import TextInput from './../components/TextInput';

import i18n from '../i18n';

import ru from './../../lang/ru.json';
import en from './../../lang/en.json';

const localeData = {
  en,
  ru,
};

const inlineStyles = {
  options: {
    display: 'block',
    margin: 10,
  },
};

const DEFAULT_LOCALE = 'en';

class Options extends Component {

  static propTypes = {
    children: PropTypes.node,
    options: PropTypes.object.isRequired,
    saveOptions: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
  }

  static usernameId = 'username';
  static passwordId = 'password';
  static serverAddressId = 'server-address';

  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    const username = document.getElementById(Options.usernameId).value;
    const password = document.getElementById(Options.passwordId).value;
    const serverAddress = document.getElementById(Options.serverAddressId).value;

    if (username !== '' && password !== '' && serverAddress !== '') {
      this.props.saveOptions({ username, password, serverAddress });
    }
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
            <div className="form-div">
              <TextInput
                id={Options.usernameId}
                label="Username"
                placeholder={this.props.options.get('username')}
              />
              <TextInput
                id={Options.passwordId}
                label="Password"
                placeholder={this.props.options.get('password')}
                type="password"
              />
              <TextInput
                id={Options.serverAddressId}
                label="Server address"
                placeholder={this.props.options.get('serverAddress')}
              />
              <button
                style={inlineStyles.options}
                onClick={this.handleSave}
              >
                {'Save'}
              </button>
            </div>
          </i18n.Provider>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  options: state.get('options'),
});

const mapDispatchToProps = {
  saveOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
