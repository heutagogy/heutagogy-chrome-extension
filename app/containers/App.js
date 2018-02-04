import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoginForm from './../components/LoginForm';
import SaveControl from './../components/SaveControl';
import { rememberArticle, updateArticle, fetchArticleByUrl, removeArticle } from './../actions/article';
import { getArticle } from './../selectors/article';
import { getUser } from './../selectors/user';
import { getViewState } from './../selectors/view';
import { getCurrentUrl, getTab, getCurrentTab } from './../modules/tabsTracker';
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
    currentTab: PropTypes.instanceOf(Immutable.Map),
    fetchArticleByUrl: PropTypes.func,
    fetchArticleState: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func,
    rememberArticleState: PropTypes.instanceOf(Immutable.Map),
    removeArticle: PropTypes.func,
    removeArticleState: PropTypes.instanceOf(Immutable.Map),
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
    this.props.fetchArticleByUrl(this.props.currentTab.get('url'));
  }

  getThematicStyles = () => ({
    app: {},
  })

  render() {
    const content =
      isLoggedIn(this.props.user)
      ? (
        <SaveControl
          article={this.props.article}
          currentTab={this.props.currentTab}
          fetchArticleState={this.props.fetchArticleState}
          rememberArticle={this.props.rememberArticle}
          rememberArticleState={this.props.rememberArticleState}
          removeArticle={this.props.removeArticle}
          removeArticleState={this.props.removeArticleState}
          updateArticle={this.props.updateArticle}
          updateArticleState={this.props.updateArticleState}
        />
      ) : (
        <LoginForm />
      );

    const inlineStyles = this.getThematicStyles();

    return (
      <MuiThemeProvider muiTheme={theme()}>
        <div style={inlineStyles.app}>
          {content}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  state = Immutable.fromJS(state); // eslint-disable-line

  return ({
    currentTab: getTab(state, getCurrentTab(state)),
    article: getArticle(state, getCurrentUrl(state)),
    fetchArticleState: getViewState(state, FETCH_ARTICLE_VIEW_STATE),
    rememberArticleState: getViewState(state, REMEMBER_ARTICLE_VIEW_STATE),
    removeArticleState: getViewState(state, REMOVE_ARTICLE_VIEW_STATE),
    updateArticleState: getViewState(state, UPDATE_ARTICLE_VIEW_STATE),
    user: getUser(state),
  });
};

const mapDispatchToProps = {
  fetchArticleByUrl,
  rememberArticle,
  removeArticle,
  updateArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
