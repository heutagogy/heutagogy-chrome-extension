import Toggle from 'material-ui/Toggle';
import { PropTypes, Component } from 'react';
import { rememberCurrentArticle } from '../../../app/utils/utils';

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
    rememberCurrentArticle(state, this.props.rememberArticle);
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
