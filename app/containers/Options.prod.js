import { PropTypes, Component } from 'react';
import { connect, Provider } from 'react-redux';
import { loginUser } from './../actions/options';
import { getUser } from './../selectors/user';
import TextInput from './../components/TextInput';

import i18n from '../i18n';

import ru from './../../lang/ru.json';
import en from './../../lang/en.json';

const localeData = {
  en,
  ru,
};

const inlineStyles = {
  button: {
    display: 'block',
    fontSize: '15px',
    margin: '30px 10px',
  },
  state: {
    fontSize: '15px',
    margin: '15px 10px',
  },
};

const DEFAULT_LOCALE = 'en';

class Options extends Component {

  static propTypes = {
    children: PropTypes.node,
    loginUser: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    user: PropTypes.object,
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
      this.props.loginUser({ username, password, serverAddress });
    }
  }

  render() {
    const { store } = this.props;
    const lang = DEFAULT_LOCALE;
    const i18nTools = new i18n.Tools({ localeData: localeData[lang], locale: lang });
    const status = this.props.user ? 'You are logged in' : 'You are not logged in';

    return (
      <Provider store={store}>
        <div className="projectname-root-wrapper">
          <i18n.Provider
            i18n={i18nTools}
            setLanguage={this.setLanguage}
          >
            <div className="form-div">
              <div style={inlineStyles.state}>
                <p><i>{status}</i></p>
              </div>
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
                style={inlineStyles.button}
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
  user: getUser(state),
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
