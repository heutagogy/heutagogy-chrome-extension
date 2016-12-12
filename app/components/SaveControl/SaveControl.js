import Immutable from 'immutable';
import Toggle from 'material-ui/Toggle';
import { PropTypes, Component } from 'react';
import { runOnCurrentArticle } from '../../../app/utils/utils';

const inlineStyles = {
  saveControl: {
    fontSize: 14,
    padding: 10,
  },
};

class SaveControl extends Component {
  static propTypes = {
    defaultState: PropTypes.bool,
    options: PropTypes.instanceOf(Immutable.Map),
    rememberArticle: PropTypes.func.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    runOnCurrentArticle(({ url, title, icon }) => {
      this.setState({ url, title, icon });
    });
  }

  saveOnUnload(url) {
    chrome.extension.getViews({ type: 'popup' })[0].onunload = () => { //eslint-disable-line
      const prevState = JSON.parse(localStorage.confirmation || '{}');
      const newState = Object.assign({}, prevState, { [url]: true });

      localStorage.setItem('confirmation', JSON.stringify(newState));
    };
  }

  handleToggle = (e, state) => {
    if (!this.props.defaultState) {
      this.props.rememberArticle({
        article: Immutable.fromJS({
          icon: this.state.icon,
          state,
          timestamp: Date.now(),
          title: this.state.title,
          url: this.state.url,
        }),
        options: this.props.options,
      });
    } else {
      // implement removal
    }
  }

  render() {
    const { l } = this.context.i18n;

    if (this.props.defaultState) {
      this.saveOnUnload(this.state.url);
    }

    return (
      <div style={inlineStyles.saveControl}>
        <Toggle
          label={l('Remember article')}
          toggled={this.props.defaultState}
          onToggle={this.handleToggle}
        />
      </div>
    );
  }
}

export default SaveControl;
