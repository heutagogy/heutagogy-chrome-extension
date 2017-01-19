import Immutable from 'immutable';
import moment from 'moment';
import { PropTypes, Component } from 'react';

const inlineStyles = {
  duplicateArticle: {
    margin: '0 30px',
  },
  buttonLeft: {
    margin: '0 0 30px 0',
    float: 'left',
  },
  buttonRight: {
    margin: '0 0 30px 0',
    float: 'right',
  },
};

class DuplicationConfirmation extends Component {
  static propTypes = {
    article: PropTypes.object,
    rememberArticle: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  handleYes() {
    const icon = this.props.article.get('icon');
    const title = this.props.article.get('title');
    const url = this.props.article.get('url');

    this.props.rememberArticle({
      article: Immutable.fromJS({
        state: true,
        timestamp: moment().format(),
        title,
        url,
        icon,
      }),
    });
    window.close();
  }

  handleNo() {
    window.close();
  }

  isEnabled() {
    const article = this.props.article;
    const isSaved = article.get('state');

    const duplicationConfirmationState = JSON.parse(localStorage.duplicationConfirmation || '{}');

    return isSaved && duplicationConfirmationState[article.get('url')];
  }

  render() {
    if (!this.isEnabled()) {
      return null;
    }

    return (
      <div style={inlineStyles.duplicateArticle}>
        <p><i>{'Article is already saved. Do you want to duplicate it?'}</i></p>
        <button
          style={inlineStyles.buttonLeft}
          onClick={this.handleYes}
        >
          {'Yes'}
        </button>
        <button
          style={inlineStyles.buttonRight}
          onClick={this.handleNo}
        >
          {'No'}
        </button>
      </div>
    );
  }
}

export default DuplicationConfirmation;
