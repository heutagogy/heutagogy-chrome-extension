import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SaveControl from './../components/SaveControl';
import Confirmation from './../components/Confirmation';
import { rememberArticle } from './../actions/article';
import { saveCurrentUrl } from './../actions/view';
import { loadEntities } from './../actions/entity';
import { getArticle } from './../selectors/article';
import { runOnCurrentArticle } from './../utils/utils';

import themes from './../uiTheme/themes';

const activeTheme = themes.DARK_THEME;

const theme = () => getMuiTheme({});

class App extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(Immutable.Map),
    loadEntities: PropTypes.func.isRequired,
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
    runOnCurrentArticle(({ url }) => {
      this.props.saveCurrentUrl({ currentUrl: url });
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
            loadEntities={this.props.loadEntities}
            rememberArticle={this.props.rememberArticle}
          />
        </MuiThemeProvider>
        <Confirmation
          article={this.props.article}
          loadEntities={this.props.loadEntities}
          rememberArticle={this.props.rememberArticle}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  article: getArticle(state, state.getIn(['view', 'currentUrl'])),
});

const mapDispatchToProps = {
  loadEntities,
  rememberArticle,
  saveCurrentUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
