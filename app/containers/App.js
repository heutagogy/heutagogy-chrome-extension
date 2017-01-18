import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SaveControl from './../components/SaveControl';
import DuplicationConfirmation from './../components/DuplicationConfirmation';
import { rememberArticle, readArticle } from './../actions/article';
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
    readArticle: PropTypes.func.isRequired,
    rememberArticle: PropTypes.func.isRequired,
    saveCurrentUrl: PropTypes.func.isRequired,
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
          <p><i>{'Please, open “Options” window and log in.'}</i></p>
        </div>
      );
    }

    const inlineStyles = this.getThematicStyles();

    return (
      <MuiThemeProvider muiTheme={theme()}>
        <div style={inlineStyles.app}>
          <SaveControl
            articleId={this.props.article.get('id')}
            defaultState={this.props.article.get('state')}
            readArticle={this.props.readArticle}
            readState={Boolean(this.props.article.get('read'))}
            rememberArticle={this.props.rememberArticle}
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
  readArticle,
  rememberArticle,
  saveCurrentUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
