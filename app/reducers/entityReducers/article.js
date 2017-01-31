import {
  REMEMBER_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_SUCCESS,
  LOAD_ARTICLE_SUCCESS,
  REMOVE_ARTICLE_SUCCESS,
} from './../../actions/article';


export default (state, action) => {
  switch (action.type) {
    case LOAD_ARTICLE_SUCCESS: {
      const articles = action.payload.getIn(['entities', 'article']);

      if (!articles) {
        return state;
      }

      return state.setIn(['article', action.meta.articleUrl], articles.first());
    }
    case REMEMBER_ARTICLE_SUCCESS: {
      const article = action.payload.getIn(['entities', 'article']).first();

      return state.setIn(['article', action.meta.articleUrl], article);
    }
    case UPDATE_ARTICLE_SUCCESS: {
      const article = action.payload.getIn(['entities', 'article']).first();
      const articleUrl = state.getIn(['article']).findKey((el) => el.get('id') === action.meta.articleId);

      return state.setIn(['article', articleUrl], article);
    }
    case REMOVE_ARTICLE_SUCCESS: {
      const articleUrl = state.getIn(['article']).findKey((el) => el.get('id') === action.meta.articleId);

      return state.deleteIn(['article', articleUrl]);
    }
    default: {
      return state;
    }
  }
};
