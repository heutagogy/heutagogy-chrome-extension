import Immutable from 'immutable';
import RaisedButton from 'material-ui/RaisedButton';
import { Component, PropTypes } from 'react';
import { blue500 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Spinner from './../Spinner';
import styles from './LoginForm.less';
import { LOGIN_VIEW_STATE } from './../../constants/ViewStates';
import { getOptions } from './../../selectors/options';
import { getUser } from './../../selectors/user';
import { getViewState } from './../../selectors/view';
import { isLoggedIn } from './../../utils/userUtils';
import { loginUser } from './../../actions/options';
import { renderTextField } from './../renders';
import { setServerAddress } from './../../actions/server';

injectTapEventPlugin();

const inlineStyles = {
  input: {
    backgroundColor: '#fafafa',
  },
  floatingLabelStyle: {
    fontSize: '18px',
  },
  blue500: {
    color: blue500,
  },
  statusDiv: {
    height: '30px',
    textAlign: 'center',
    margin: '5px 0 30px 0',
  },
  statusMessage: {
    fontSize: '14px',
  },
};

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func, // from redux-form
    loginUser: PropTypes.func,
    options: PropTypes.instanceOf(Immutable.Map),
    setServerAddress: PropTypes.func,
    user: PropTypes.object,
    viewState: PropTypes.instanceOf(Immutable.Map),
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  submit = (form) => {
    form = Immutable.fromJS(form); // eslint-disable-line
    this.props.setServerAddress({ address: form.get('server') });
    this.props.loginUser({ username: form.get('login'), password: form.get('password') });
  }

  render() {
    return (
      <form
        className={styles.loginForm}
        onSubmit={this.props.handleSubmit(this.submit)}
      >
        <div>
          <div style={inlineStyles.statusDiv}>
            { this.props.viewState && this.props.viewState.get('isInProgress') ? <Spinner size={28} /> : null }
            { this.props.viewState && this.props.viewState.get('isFailed')
              ? <div style={inlineStyles.statusMessage}><i>{this.props.viewState.get('message')}</i></div> : null }
            { isLoggedIn(this.props.user)
              ? <div style={inlineStyles.statusMessage}>
                <i>{`You are logged in, ${this.props.options.get('username')}!`}</i>
              </div> : null }
          </div>
          <Field
            component={renderTextField}
            floatingLabelFixed
            floatingLabelFocusStyle={inlineStyles.blue500}
            floatingLabelStyle={inlineStyles.floatingLabelStyle}
            floatingLabelText={'Login'}
            fullWidth
            inputStyle={inlineStyles.input}
            name="login"
            placeholder={'My username'}
            underlineFocusStyle={inlineStyles.blue500}
          />
          <Field
            component={renderTextField}
            floatingLabelFixed
            floatingLabelFocusStyle={inlineStyles.blue500}
            floatingLabelStyle={inlineStyles.floatingLabelStyle}
            floatingLabelText={'Password'}
            fullWidth
            inputStyle={inlineStyles.input}
            name="password"
            placeholder={'My secret password'}
            type="password"
            underlineFocusStyle={inlineStyles.blue500}
          />
          <Field
            component={renderTextField}
            floatingLabelFixed
            floatingLabelFocusStyle={inlineStyles.blue500}
            floatingLabelStyle={inlineStyles.floatingLabelStyle}
            floatingLabelText={'Server address'}
            fullWidth
            inputStyle={inlineStyles.input}
            name="server"
            underlineFocusStyle={inlineStyles.blue500}
          />
          <RaisedButton
            className={styles.login}
            fullWidth
            label={'Login'}
            primary
            type="submit"
          />
        </div>
      </form>
    );
  }
}

const LoginFormWrapped = reduxForm({ form: 'LoginForm' })(LoginForm);

const mapStateToProps = (state) => {
  state = Immutable.fromJS(state); // eslint-disable-line

  return ({
    viewState: getViewState(state, LOGIN_VIEW_STATE),
    user: getUser(state),
    options: getOptions(state),
    initialValues: {
      server: getOptions(state).get('serverAddress'),
    },
  });
};

export default connect(mapStateToProps, { loginUser, setServerAddress })(LoginFormWrapped);
