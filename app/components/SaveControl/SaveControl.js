import Immutable from 'immutable';
import Toggle from 'material-ui/Toggle';
import { PropTypes, Component } from 'react';
import { runOnCurrentArticle } from '../../../app/utils/utils';
import articleSchema from '../../schemas/article';

const inlineStyles = {
  saveControl: {
    fontSize: 14,
    padding: 10,
  },
};

class SaveControl extends Component {
  static propTypes = {
    defaultState: PropTypes.bool,
    loadEntities: PropTypes.func.isRequired,
    rememberArticle: PropTypes.func.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  handleToggle = (e, state) => {
    if (!this.props.defaultState) {
      this.props.loadEntities({
        href: '/bookmarks',
        schema: articleSchema,
      });

      runOnCurrentArticle(({ url, title, icon }) => {
        this.props.rememberArticle({
          article: Immutable.fromJS({
            icon,
            state,
            timestamp: Date.now(),
            title,
            url,
          }),
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
