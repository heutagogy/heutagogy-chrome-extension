import Immutable from 'immutable';
import {
  REMEMBER_ARTICLE_START, REMEMBER_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_START, UPDATE_ARTICLE_SUCCESS,
} from './../../actions/article';
import { saveEntities } from './../../utils/localStorageUtils';


export default (state, action) => {
  switch (action.type) {
    case UPDATE_ARTICLE_START: {
      const articleUrl = state.getIn(['article']).findKey((entity) => entity.get('id') === action.meta.articleId);

      return state.mergeIn(['article', articleUrl], new Immutable.Map(action.meta.articleFields));
    }
    case REMEMBER_ARTICLE_START: {
      return state.setIn(['article', action.meta.article.get('url')], action.meta.article);
    }
    case REMEMBER_ARTICLE_SUCCESS:
    case UPDATE_ARTICLE_SUCCESS: {
      const article = action.payload.getIn(['entities', 'article']);
      const newState = state.mergeIn(['article'], article);

      saveEntities(newState);

      return newState;
    }
    default: {
      return state;
    }
  }
};
