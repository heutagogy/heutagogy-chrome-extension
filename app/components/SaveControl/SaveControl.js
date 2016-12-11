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

  handleToggle = (e, state) => {
    if (!this.props.defaultState) {
      runOnCurrentArticle(({ url, title, icon }) => {
        this.props.rememberArticle({
          article: Immutable.fromJS({
            icon,
            state,
            timestamp: Date.now(),
            title,
            url,
          }),
          options: this.props.options,
        });
      });
    } else {
      // implement removal
    }
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
