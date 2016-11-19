import Immutable from 'immutable';

export const getArticle = (state, url) => state.getIn(['entities', 'article', url]) || new Immutable.Map({});
