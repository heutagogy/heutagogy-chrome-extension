import { PropTypes, Component } from 'react';
import Immutable from 'immutable';
import Toggle from 'material-ui/Toggle';

const inlineStyles = {
  saveControl: {
    fontSize: 14,
    padding: 10,
  },
};

class SaveControl extends Component {
  static propTypes = {
    defaultState: PropTypes.bool,
    rememberArticle: PropTypes.func.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  handleToggle = (e, state) => {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    }, (tabs) => {
      const currentUrl = tabs[0].url;
      const currentTitle = tabs[0].title;
      const icon = tabs[0].favIconUrl;

      this.props.rememberArticle({
        article: Immutable.fromJS({
          title: currentTitle,
          url: currentUrl,
          timestamp: Date.now(),
          icon,
          state,
        }),
      });
    });
  }

  render() {
    const { l } = this.context.i18n;

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
