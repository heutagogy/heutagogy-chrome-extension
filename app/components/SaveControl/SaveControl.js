import Immutable from 'immutable';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { PropTypes, Component } from 'react';
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
  bigSpinner: {
    margin: '80px 0',
  },
};

class SaveControl extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(Immutable.Map),
    fetchArticleByUrl: PropTypes.func,
    fetchArticleState: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func,
    rememberArticleState: PropTypes.instanceOf(Immutable.Map),
    removeArticle: PropTypes.func,
    removeArticleState: PropTypes.instanceOf(Immutable.Map),
    runOnCurrentArticle: PropTypes.func,
    updateArticle: PropTypes.func,
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
      this.props.fetchArticleByUrl(article.url);
    });
  }

  getReadLabel() {
    const text = this.props.article.get('read') ? 'Unread article' : 'Read article';

    if (this.inProgress(this.props.updateArticleState)) {
      return this.spinnerWithText(text);
    }

    return text;
  }

  getRememberLabel() {
    const text = this.props.article.get('id') ? 'Delete article' : 'Save article';

    if (this.inProgress(this.props.rememberArticleState) || this.inProgress(this.props.removeArticleState)) {
      return this.spinnerWithText(text);
    }

    return text;
  }

  bind() {
    this.handleCheck = this.handleCheck.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => {
    if (this.props.article.get('id')) {
      this.props.removeArticle(this.props.article.get('id'));
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

  inProgress(prop) {
    return prop && prop.get('isInProgress');
  }

  spinnerWithText(text) {
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

  spinner() {
    return (
      <div style={inlineStyles.bigSpinner}>
        <Spinner size={100} />
      </div>
    );
  }

  render() {
    if (this.props.article.isEmpty() &&
        (!this.state.currentArticle || this.state.currentArticle.isEmpty())) {
      return null;
    }

    if (this.inProgress(this.props.fetchArticleState)) {
      return this.spinner();
    }

    return (
      <div style={inlineStyles.container}>
        <TextField
          defaultValue={this.props.article.get('title') || this.state.currentArticle.get('title')}
          disabled={this.props.article.get('id')}
          floatingLabelText="Article title"
          id="article-title"
          ref={(ref) => this.titleField = ref} // eslint-disable-line
        /><br />
        <Toggle
          id="remember-article"
          label={this.getRememberLabel()}
          style={inlineStyles.saveControl}
          toggled={this.props.article.get('id')}
          onToggle={this.handleToggle}
        />
        { this.props.article.get('id')
         ? <Checkbox
           checked={this.props.article.get('read')}
           checkedIcon={<Visibility />}
           id="read-article"
           label={this.getReadLabel()}
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
