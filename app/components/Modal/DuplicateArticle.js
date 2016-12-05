import Immutable from 'immutable';
import { connect } from 'react-redux';
import { PropTypes, Component } from 'react';
import { rememberArticle } from '../../actions/article';
import { hideModal } from '../../actions/modal';

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

class DuplicateArticle extends Component {
  static propTypes = {
    article: PropTypes.object,
    hideModal: PropTypes.func.isRequired,
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
    this.props.hideModal();
    window.close();
  }

  handleNo() {
    this.props.hideModal();
    window.close();
  }

  render() {

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

const mapStateToProps = (state) => ({
  article: state.getIn(['modal', 'modalMeta', 'article']),
});

const mapDispatchToProps = {
  rememberArticle,
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateArticle);
