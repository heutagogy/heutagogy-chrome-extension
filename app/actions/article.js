import { CALL_API } from 'redux-api-middleware';
import { API_VERSION } from './../constants/Api';
import { loadEntities } from './entity';

export const REMEMBER_ARTICLE_START = 'REMEMBER_ARTICLE_START';
export const REMEMBER_ARTICLE_SUCCESS = 'REMEMBER_ARTICLE_SUCCESS';
export const REMEMBER_ARTICLE_FAILURE = 'REMEMBER_ARTICLE_FAILURE';

export const UPDATE_ARTICLE_START = 'UPDATE_ARTICLE_START';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';

const postRememberArticle = ({ article }) => ({
  [CALL_API]: {
    types: [
      { type: REMEMBER_ARTICLE_START, meta: { article } },
      { type: REMEMBER_ARTICLE_SUCCESS },
      { type: REMEMBER_ARTICLE_FAILURE },
    ],
    method: 'POST',
    body: JSON.stringify(article.toJS()),
    endpoint: `${API_VERSION}/bookmarks`,
  },
});

const postUpdateArticle = (articleId, articleFields) => ({
  [CALL_API]: {
    types: [
      { type: UPDATE_ARTICLE_START, meta: { articleId, articleFields } },
      { type: UPDATE_ARTICLE_SUCCESS },
      { type: UPDATE_ARTICLE_FAILURE },
    ],
    method: 'POST',
    body: JSON.stringify(articleFields),
    endpoint: `${API_VERSION}/bookmarks/${articleId}`,
  },
});

export const rememberArticle = ({ article }) => (dispatch) => {
  loadEntities()(dispatch);

  dispatch(postRememberArticle({ article }));
};

export const updateArticle = (articleId, articleFields) => (dispatch) => {
  dispatch(postUpdateArticle(articleId, articleFields));
};
