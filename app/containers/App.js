import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SaveControl from './../components/SaveControl';
import { rememberArticle, updateArticle, fetchArticleByUrl, removeArticle } from './../actions/article';
import { saveCurrentUrl } from './../actions/view';
import { getArticle } from './../selectors/article';
import { getUser } from './../selectors/user';
import { getViewState } from './../selectors/view';
import { runOnCurrentArticle } from './../utils/utils';
import { isLoggedIn } from './../utils/userUtils';
import {
  REMEMBER_ARTICLE_VIEW_STATE,
  UPDATE_ARTICLE_VIEW_STATE,
  FETCH_ARTICLE_VIEW_STATE,
  REMOVE_ARTICLE_VIEW_STATE,
} from './../constants/ViewStates';

import themes from './../uiTheme/themes';

const activeTheme = themes.DARK_THEME;

const theme = () => getMuiTheme({});

class App extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(Immutable.Map),
    fetchArticleByUrl: PropTypes.func,
    fetchArticleState: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func,
    rememberArticleState: PropTypes.instanceOf(Immutable.Map),
    removeArticle: PropTypes.func,
    removeArticleState: PropTypes.instanceOf(Immutable.Map),
    saveCurrentUrl: PropTypes.func,
    updateArticle: PropTypes.func,
    updateArticleState: PropTypes.instanceOf(Immutable.Map),
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
      chrome.runtime.openOptionsPage();

      return null;
    }

    const inlineStyles = this.getThematicStyles();

    return (
      <MuiThemeProvider muiTheme={theme()}>
        <div style={inlineStyles.app}>
          <SaveControl
            article={this.props.article}
            fetchArticleByUrl={this.props.fetchArticleByUrl}
            fetchArticleState={this.props.fetchArticleState}
            rememberArticle={this.props.rememberArticle}
            rememberArticleState={this.props.rememberArticleState}
            removeArticle={this.props.removeArticle}
            removeArticleState={this.props.removeArticleState}
            runOnCurrentArticle={runOnCurrentArticle}
            updateArticle={this.props.updateArticle}
            updateArticleState={this.props.updateArticleState}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  article: getArticle(state, state.getIn(['view', 'currentUrl'])),
  fetchArticleState: getViewState(state, FETCH_ARTICLE_VIEW_STATE),
  rememberArticleState: getViewState(state, REMEMBER_ARTICLE_VIEW_STATE),
  removeArticleState: getViewState(state, REMOVE_ARTICLE_VIEW_STATE),
  updateArticleState: getViewState(state, UPDATE_ARTICLE_VIEW_STATE),
  user: getUser(state),
});

const mapDispatchToProps = {
  fetchArticleByUrl,
  rememberArticle,
  removeArticle,
  saveCurrentUrl,
  updateArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
