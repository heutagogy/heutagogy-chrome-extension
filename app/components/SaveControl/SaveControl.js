import Immutable from 'immutable';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { PropTypes, Component } from 'react';
import { runOnCurrentArticle } from '../../../app/utils/utils';
import { ZERO } from '../../../app/constants/Constants';

const inlineStyles = {
  saveControl: {
    fontSize: 14,
    padding: 10,
  },
};

class SaveControl extends Component {
  static propTypes = {
    articleId: PropTypes.number,
    defaultState: PropTypes.bool,
    readArticle: PropTypes.func.isRequired,
    readState: PropTypes.bool,
    rememberArticle: PropTypes.func.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.handleCheck = this.handleCheck.bind(this);

    this.state = {};
  }

  componentWillMount() {
    runOnCurrentArticle(({ url, title, icon }) => {
      this.setState({ url, title, icon });
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
    if (!this.props.defaultState) {
      this.props.rememberArticle({
        article: Immutable.fromJS({
          icon: this.state.icon,
          state,
          timestamp: moment().format(),
          title: this.state.title,
          url: this.state.url,
        }),
      });
    } else {
      // implement removal
    }
  }

  handleCheck(e, isInputChecked) {
    this.props.readArticle({
      articleId: this.props.articleId,
      timestamp: isInputChecked === false ? moment().format() : null,
    });
  }

  render() {
    const { l } = this.context.i18n;

    if (this.props.defaultState) {
      this.saveOnUnload(this.state.url);
    }

    return (
      <div style={inlineStyles.saveControl}>
        <Toggle
          id={'remember-article'}
          label={l('Remember article')}
          toggled={this.props.defaultState}
          onToggle={this.handleToggle}
        />
        { this.props.articleId
         ? <Checkbox
           checked={this.props.readState}
           checkedIcon={<Visibility />}
           id={'read-article'}
           label={l('Read article')}
           labelPosition="left"
           uncheckedIcon={<VisibilityOff />}
           onCheck={this.handleCheck}
         /> : null }
      </div>
    );
  }
}

export default SaveControl;
