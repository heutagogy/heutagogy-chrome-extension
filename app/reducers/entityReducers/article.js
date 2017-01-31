/* eslint-disable fp/no-let */
/* eslint-disable fp/no-mutation */
import {
  REMEMBER_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_SUCCESS,
  LOAD_ARTICLE_SUCCESS,
  REMOVE_ARTICLE_SUCCESS,
} from './../../actions/article';


export default (state, action) => {
  switch (action.type) {
    case REMEMBER_ARTICLE_SUCCESS:
    case UPDATE_ARTICLE_SUCCESS: {
      const article = action.payload.getIn(['entities', 'article']);
      const newState = state.mergeIn(['article'], article);

      return newState;
    }
    case LOAD_ARTICLE_SUCCESS: {
      const entities = action.payload.get('entities');

      let result = state;

      entities.forEach((theEntities, entityType) => {
        theEntities.forEach((entity, entityId) => {
          result = result.mergeIn([entityType, entityId], entity);
        });
      });

      return result;
    }
    case REMOVE_ARTICLE_SUCCESS: {
      const article = state.getIn(['article']).find((el) => el.get('id') === action.meta.articleId);

      return state.deleteIn(['article', article.get('url')]);
    }
    default: {
      return state;
    }
  }
};
