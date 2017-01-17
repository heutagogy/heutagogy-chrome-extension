import { CALL_API } from 'redux-api-middleware';
import { API_VERSION } from './../constants/Api';
import { loadEntities } from './entity';
import articleSchema from '../schemas/article';
import { getHttpHeaders } from '../utils/httpHeaders';

export const REMEMBER_ARTICLE_START = 'REMEMBER_ARTICLE_START';
export const REMEMBER_ARTICLE_SUCCESS = 'REMEMBER_ARTICLE_SUCCESS';
export const REMEMBER_ARTICLE_FAILURE = 'REMEMBER_ARTICLE_FAILURE';

export const READ_ARTICLE_START = 'READ_ARTICLE_START';
export const READ_ARTICLE_SUCCESS = 'READ_ARTICLE_SUCCESS';
export const READ_ARTICLE_FAILURE = 'READ_ARTICLE_FAILURE';

const postRememberArticle = ({ article, serverAddress, token }) => ({
  [CALL_API]: {
    types: [
      { type: REMEMBER_ARTICLE_START, meta: { article } },
      { type: REMEMBER_ARTICLE_SUCCESS },
      { type: REMEMBER_ARTICLE_FAILURE },
    ],
    headers: getHttpHeaders(token),
    method: 'POST',
    body: JSON.stringify(article.toJS()),
    endpoint: `${serverAddress}/${API_VERSION}/bookmarks`,
  },
});

const postReadArticle = ({ articleId, timestamp, token, serverAddress }) => ({
  [CALL_API]: {
    types: [
      { type: READ_ARTICLE_START, meta: { articleId, timestamp } },
      { type: READ_ARTICLE_SUCCESS },
      { type: READ_ARTICLE_FAILURE },
    ],
    headers: getHttpHeaders(token),
    method: 'POST',
    body: JSON.stringify({ read: timestamp }),
    endpoint: `${serverAddress}/${API_VERSION}/bookmarks/${articleId}`,
  },
});

export const rememberArticle = ({ article, serverAddress, token }) => (dispatch) => {
  loadEntities({
    href: 'bookmarks',
    schema: articleSchema,
    serverAddress,
    token,
  })(dispatch);

  dispatch(postRememberArticle({ article, serverAddress, token }));
};

export const readArticle = ({ articleId, timestamp, token, serverAddress }) => (dispatch) => {
  dispatch(postReadArticle({ articleId, timestamp, token, serverAddress }));
};
