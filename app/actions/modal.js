export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

const DUPLICATE_ARTICLE = 'DUPLICATE_ARTICLE';
const confirmation = ({ article }) => ({
  type: SHOW_MODAL,
  modalType: DUPLICATE_ARTICLE,
  modalMeta: { article },
});

export const showModal = ({ article }) => (dispatch) => dispatch(confirmation({ article }));

export const hideModal = () => (dispatch) => dispatch({
  type: HIDE_MODAL,
});
