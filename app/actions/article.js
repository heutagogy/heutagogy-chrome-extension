import { CALL_API } from 'redux-api-middleware';
import { API_VERSION } from './../constants/Api';
import { loadEntities } from './entity';

export const REMEMBER_ARTICLE_START = 'REMEMBER_ARTICLE_START';
export const REMEMBER_ARTICLE_SUCCESS = 'REMEMBER_ARTICLE_SUCCESS';
export const REMEMBER_ARTICLE_FAILURE = 'REMEMBER_ARTICLE_FAILURE';

export const READ_ARTICLE_START = 'READ_ARTICLE_START';
export const READ_ARTICLE_SUCCESS = 'READ_ARTICLE_SUCCESS';
export const READ_ARTICLE_FAILURE = 'READ_ARTICLE_FAILURE';

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

const postReadArticle = ({ articleId, timestamp }) => ({
  [CALL_API]: {
    types: [
      { type: READ_ARTICLE_START, meta: { articleId, timestamp } },
      { type: READ_ARTICLE_SUCCESS },
      { type: READ_ARTICLE_FAILURE },
    ],
    method: 'POST',
    body: JSON.stringify({ read: timestamp }),
    endpoint: `${API_VERSION}/bookmarks/${articleId}`,
  },
});

export const rememberArticle = ({ article }) => (dispatch) => {
  loadEntities()(dispatch);

  dispatch(postRememberArticle({ article }));
};

export const readArticle = ({ articleId, timestamp }) => (dispatch) => {
  dispatch(postReadArticle({ articleId, timestamp }));
};
