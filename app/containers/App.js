import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SaveControl from './../components/SaveControl';
import { rememberArticle } from './../actions/article';
import { saveCurrentUrl } from './../actions/view';
import { getArticle } from './../selectors/article';

import themes from './../uiTheme/themes';

const activeTheme = themes.DARK_THEME;

const theme = () => getMuiTheme({});

class App extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func.isRequired,
    saveCurrentUrl: PropTypes.func.isRequired,
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
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    }, (tabs) => {
      const currentUrl = tabs[0].url;

      this.props.saveCurrentUrl({ currentUrl });
    });
  }

  getThematicStyles = () => ({
    app: {},
  })

  render() {
    const inlineStyles = this.getThematicStyles();

    return (
      <div style={inlineStyles.app}>
        <MuiThemeProvider muiTheme={theme()}>
          <SaveControl
            defaultState={this.props.article.get('state')}
            rememberArticle={this.props.rememberArticle}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  article: getArticle(state, state.getIn(['view', 'currentUrl'])),
});

export default connect(mapStateToProps, { rememberArticle, saveCurrentUrl })(App);
