import { CALL_API } from 'redux-api-middleware';
import { API_URL } from './../constants/Api';

export const REMEMBER_ARTICLE_START = 'REMEMBER_ARTICLE_START';
export const REMEMBER_ARTICLE_SUCCESS = 'REMEMBER_ARTICLE_SUCCESS';
export const REMEMBER_ARTICLE_FAILURE = 'REMEMBER_ARTICLE_FAILURE';

const fetchRememberArticle = ({ article }) => ({
  [CALL_API]: {
    types: [
      { type: REMEMBER_ARTICLE_START, meta: { article } },
      { type: REMEMBER_ARTICLE_SUCCESS },
      { type: REMEMBER_ARTICLE_FAILURE },
    ],
    method: 'POST',
    body: JSON.stringify(article.toJS()),
    endpoint: `${API_URL}/bookmarks`,
  },
});

export const rememberArticle = ({ article }) => (dispatch) => dispatch(fetchRememberArticle({ article }));
