import Immutable from 'immutable';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { PropTypes, Component } from 'react';
import { ZERO } from './../../../app/constants/Constants';
import Spinner from './../Spinner';


const inlineStyles = {
  container: {
    padding: '10px',
  },
  saveControl: {
    fontSize: 14,
    margin: '15px 0',
  },
  left: {
    float: 'left',
    display: 'inline',
  },
  right: {
    float: 'right',
    display: 'inline',
  },
};

class SaveControl extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func.isRequired,
    rememberArticleState: PropTypes.instanceOf(Immutable.Map),
    runOnCurrentArticle: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
    updateArticleState: PropTypes.instanceOf(Immutable.Map),
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.bind();

    this.state = {};
  }

  componentWillMount() {
    this.props.runOnCurrentArticle((article) => {
      this.setState({ currentArticle: new Immutable.Map(article) });
    });
  }

  bind() {
    this.handleCheck = this.handleCheck.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.rememberArticleInProgress = this.rememberArticleInProgress.bind(this);
    this.updateArticleInProgress = this.updateArticleInProgress.bind(this);
  }

  saveOnUnload(url) {
    const popups = chrome.extension.getViews({ type: 'popup' });

    if (popups && popups.length !== ZERO) {
      chrome.extension.getViews({ type: 'popup' })[0].onunload = () => { //eslint-disable-line
        const prevState = JSON.parse(localStorage.duplicationConfirmation || '{}');
        const newState = Object.assign({}, prevState, { [url]: true });

        localStorage.setItem('duplicationConfirmation', JSON.stringify(newState));
      };
    }
  }

  handleToggle = () => {
    if (this.props.article.get('id')) {
      // implement removal
    } else {
      this.props.rememberArticle({
        article: Immutable.fromJS({
          icon: this.state.currentArticle.get('icon'),
          timestamp: moment().format(),
          title: this.titleField.getValue(),
          url: this.state.currentArticle.get('url'),
        }),
      });
    }
  }

  handleCheck() {
    this.props.updateArticle(
      this.props.article.get('id'),
      { read: this.props.article.get('read') ? null : moment().format() }
    );
  }

  rememberArticleInProgress() {
    return this.props.rememberArticleState && this.props.rememberArticleState.get('isInProgress');
  }

  updateArticleInProgress() {
    return this.props.updateArticleState && this.props.updateArticleState.get('isInProgress');
  }

  spinner(text) {
    return (
      <div>
        <div style={inlineStyles.left}>
          {text}
        </div>
        <div style={inlineStyles.right}>
          <Spinner size={23} />
        </div>
      </div>
    );
  }

  render() {
    if (this.props.article.isEmpty() &&
        (!this.state.currentArticle || this.state.currentArticle.isEmpty())) {
      return null;
    }

    if (this.props.article.get('id')) {
      this.saveOnUnload(this.props.article.get('url'));
    }

    return (
      <div style={inlineStyles.container}>
        <TextField
          defaultValue={this.props.article.get('title') || this.state.currentArticle.get('title')}
          disabled={this.props.article.get('id')}
          floatingLabelText="title"
          id="article-title"
          ref={(ref) => this.titleField = ref} // eslint-disable-line
        /><br />
        <Toggle
          id="remember-article"
          label={this.rememberArticleInProgress() ? this.spinner('Remember article') : 'Remember article'}
          style={inlineStyles.saveControl}
          toggled={this.props.article.get('id')}
          onToggle={this.handleToggle}
        />
        { this.props.article.get('id')
         ? <Checkbox
           checked={this.props.article.get('read')}
           checkedIcon={<Visibility />}
           id="read-article"
           label={this.updateArticleInProgress() ? this.spinner('Read article') : 'Read article'}
           labelPosition="left"
           style={inlineStyles.saveControl}
           uncheckedIcon={<VisibilityOff />}
           onCheck={this.handleCheck}
         /> : null }
      </div>
    );
  }
}

export default SaveControl;
