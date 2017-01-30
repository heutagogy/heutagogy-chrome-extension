import { REMEMBER_ARTICLE_SUCCESS, UPDATE_ARTICLE_SUCCESS } from './../../actions/article';
import { saveEntities } from './../../utils/localStorageUtils';


export default (state, action) => {
  switch (action.type) {
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
