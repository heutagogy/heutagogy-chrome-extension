import { REMEMBER_ARTICLE_START } from './../../actions/article';

const article = (state, action) => {
  switch (action.type) {
    case REMEMBER_ARTICLE_START: {
      return state.setIn(['article', action.meta.article.get('url')], action.meta.article);
    }
    default:
      return state;
  }
};

export default article;
