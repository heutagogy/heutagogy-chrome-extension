import { connect } from 'react-redux';
import { PropTypes, Component } from 'react';
import DuplicateArticle from './DuplicateArticle';

const MODAL_COMPONENTS = {
  DUPLICATE_ARTICLE: DuplicateArticle,
};

class ModalRoot extends Component {
  static propTypes = {
    modalMeta: PropTypes.object,
    modalType: PropTypes.string,
  }

  render() {
    if (!this.props.modalType) {
      return null;
    }

    const SpecificModal = MODAL_COMPONENTS[this.props.modalType];

    return <SpecificModal {...this.props.modalMeta} />;
  }
}

const mapStateToProps = (state) => ({
  modalMeta: state.getIn(['modal', 'modalMeta']),
  modalType: state.getIn(['modal', 'modalType']),
});

export default connect(mapStateToProps)(ModalRoot);
