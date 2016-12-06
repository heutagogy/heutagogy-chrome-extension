import Immutable from 'immutable';
import { PropTypes, Component } from 'react';

const inlineStyles = {
  duplicateArticle: {
    padding: 10,
  },
  buttonLeft: {
    margin: 10,
    float: 'left',
  },
  buttonRight: {
    margin: 10,
    float: 'right',
  },
};

class Confirmation extends Component {
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
        timestamp: Date.now(),
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

  render() {
    if (!this.props.article.get('state')) {
      return null;
    }

    return (
      <div style={inlineStyles.duplicateArticle}>
        <a href={this.props.article.get('url')}>{this.props.article.get('title')}</a>
        <p>{'Article already saved. Duplicate?'}</p>
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
          {'Nope'}
        </button>
      </div>
    );
  }
}

export default Confirmation;
