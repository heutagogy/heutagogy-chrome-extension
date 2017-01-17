import { REMEMBER_ARTICLE_START, READ_ARTICLE_START } from './../../actions/article';

const article = (state, action) => {
  switch (action.type) {
    case READ_ARTICLE_START: {
      const articleUrl = state.getIn(['article']).findKey((entity) => entity.get('id') === action.meta.articleId);

      return state.setIn(['article', articleUrl, 'read'], action.meta.timestamp);
    }
    case REMEMBER_ARTICLE_START: {
      return state.setIn(['article', action.meta.article.get('url')], action.meta.article);
    }
    default:
      return state;
  }
};

export default article;
