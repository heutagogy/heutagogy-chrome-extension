import Immutable from 'immutable';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { PropTypes, Component } from 'react';
import { ZERO } from '../../../app/constants/Constants';

const inlineStyles = {
  container: {
    padding: '10px',
  },
  saveControl: {
    fontSize: 14,
    margin: '15px 0',
  },
};

class SaveControl extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func.isRequired,
    runOnCurrentArticle: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.handleCheck = this.handleCheck.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {};
  }

  componentWillMount() {
    this.props.runOnCurrentArticle((article) => {
      this.setState({ currentArticle: new Immutable.Map(article) });
    });
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

  handleToggle = (e, state) => {
    if (!this.props.article.get('state')) {
      this.props.rememberArticle({
        article: Immutable.fromJS({
          icon: this.state.currentArticle.get('icon'),
          state,
          timestamp: moment().format(),
          title: this.titleField.getValue(),
          url: this.urlField.getValue(),
        }),
      });
    } else {
      // implement removal
    }
  }

  handleCheck(e, isInputChecked) {
    this.props.updateArticle(
      this.props.article.get('id'),
      { read: isInputChecked ? moment().format() : null }
    );
  }

  render() {
    const { l } = this.context.i18n;

    if (this.props.article.isEmpty() &&
        (this.state.currentArticle && this.state.currentArticle.isEmpty())) {
      return null;
    }

    if (this.props.article.get('state')) {
      this.saveOnUnload(this.props.article.get('url'));
    }

    return (
      <div style={inlineStyles.container}>
        <TextField
          defaultValue={this.props.article.get('url') || this.state.currentArticle.get('url')}
          disabled={this.props.article.get('state')}
          floatingLabelText="url"
          id={'article-url'}
          ref={(ref) => this.urlField = ref} // eslint-disable-line
        /><br />
        <TextField
          defaultValue={this.props.article.get('title') || this.state.currentArticle.get('title')}
          disabled={this.props.article.get('state')}
          floatingLabelText="title"
          id={'article-title'}
          ref={(ref) => this.titleField = ref} // eslint-disable-line
        /><br />
        <Toggle
          id={'remember-article'}
          label={l('Remember article')}
          style={inlineStyles.saveControl}
          toggled={this.props.article.get('state')}
          onToggle={this.handleToggle}
        />
        { this.props.article.get('id')
         ? <Checkbox
           checked={this.props.article.get('read')}
           checkedIcon={<Visibility />}
           id={'read-article'}
           label={l('Read article')}
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
