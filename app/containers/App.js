import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SaveControl from './../components/SaveControl';
import DuplicationConfirmation from './../components/DuplicationConfirmation';
import { rememberArticle, updateArticle } from './../actions/article';
import { saveCurrentUrl } from './../actions/view';
import { getArticle } from './../selectors/article';
import { getUser } from './../selectors/user';
import { runOnCurrentArticle } from './../utils/utils';
import { isLoggedIn } from './../utils/userUtils';

import themes from './../uiTheme/themes';

const activeTheme = themes.DARK_THEME;

const theme = () => getMuiTheme({});

class App extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func.isRequired,
    saveCurrentUrl: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  static childContextTypes = {
    theme: PropTypes.object,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  getChildContext() {
    return {
      theme: activeTheme,
    };
  }

  componentWillMount() {
    runOnCurrentArticle(({ url }) => {
      this.props.saveCurrentUrl({ currentUrl: url });
    });
  }

  getThematicStyles = () => ({
    app: {},
  })

  render() {
    if (!isLoggedIn(this.props.user)) {
      return (
        <div style={{ margin: '15px' }}>
          <p><i>{'Please, open "Options" window and log in.'}</i></p>
        </div>
      );
    }

    const inlineStyles = this.getThematicStyles();

    return (
      <MuiThemeProvider muiTheme={theme()}>
        <div style={inlineStyles.app}>
          <SaveControl
            article={this.props.article}
            rememberArticle={this.props.rememberArticle}
            runOnCurrentArticle={runOnCurrentArticle}
            updateArticle={this.props.updateArticle}
          />
          <DuplicationConfirmation
            article={this.props.article}
            rememberArticle={this.props.rememberArticle}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  article: getArticle(state, state.getIn(['view', 'currentUrl'])),
  user: getUser(state),
});

const mapDispatchToProps = {
  rememberArticle,
  updateArticle,
  saveCurrentUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
