import { CALL_API } from 'redux-api-middleware';
import { API_VERSION } from './../constants/Api';
import { loadEntities } from './entity';
import articleSchema from '../schemas/article';
import { getHttpHeaders } from '../utils/httpHeaders';

export const REMEMBER_ARTICLE_START = 'REMEMBER_ARTICLE_START';
export const REMEMBER_ARTICLE_SUCCESS = 'REMEMBER_ARTICLE_SUCCESS';
export const REMEMBER_ARTICLE_FAILURE = 'REMEMBER_ARTICLE_FAILURE';

const postRememberArticle = ({ article, options }) => ({
  [CALL_API]: {
    types: [
      { type: REMEMBER_ARTICLE_START, meta: { article } },
      { type: REMEMBER_ARTICLE_SUCCESS },
      { type: REMEMBER_ARTICLE_FAILURE },
    ],
    headers: getHttpHeaders({
      username: options.get('username'),
      password: options.get('password'),
    }),
    method: 'POST',
    body: JSON.stringify(article.toJS()),
    endpoint: `${options.get('serverAddress')}/${API_VERSION}/bookmarks`,
  },
});

export const rememberArticle = ({ article, options }) => (dispatch) => {
  loadEntities({
    href: 'bookmarks',
    schema: articleSchema,
    options,
  })(dispatch);

  dispatch(postRememberArticle({ article, options }));
};
