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
        return state.deleteIn(['article', action.meta.articleUrl]);
      }

      return state.setIn(['article', action.meta.articleUrl], articles.first());
    }
    case REMEMBER_ARTICLE_SUCCESS: {
      const article = action.payload.getIn(['entities', 'article']).first();

      return state.setIn(['article', action.meta.articleUrl], article);
    }
    case UPDATE_ARTICLE_SUCCESS: {
      const article = action.payload.getIn(['entities', 'article']).first();

      return state.update('article', (articles) =>
                          articles.map((v) =>
                                       (v.get('id') === action.meta.articleId ? article : v)));
    }
    case REMOVE_ARTICLE_SUCCESS: {
      return state.update('article', (articles) =>
                          articles.filter((v) => v.get('id') !== action.meta.articleId));
    }
    default: {
      return state;
    }
  }
};
