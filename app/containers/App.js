import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SaveControl from './../components/SaveControl';
import Modal from './../components/Modal';
import { rememberArticle } from './../actions/article';
import { saveCurrentUrl } from './../actions/view';
import { showModal } from './../actions/modal';
import { getArticle } from './../selectors/article';
import { runOnCurrentArticle } from './../utils/utils';

import themes from './../uiTheme/themes';

const activeTheme = themes.DARK_THEME;

const theme = () => getMuiTheme({});

class App extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func.isRequired,
    saveCurrentUrl: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
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
            rememberArticle={this.props.rememberArticle}
            showModal={this.props.showModal}
          />
        </MuiThemeProvider>
        <Modal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  article: getArticle(state, state.getIn(['view', 'currentUrl'])),
});

const mapDispatchToProps = {
  rememberArticle,
  saveCurrentUrl,
  showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
