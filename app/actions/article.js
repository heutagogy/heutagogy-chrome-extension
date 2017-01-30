import { CALL_API } from 'redux-api-middleware';
import { arrayOf } from 'normalizr';
import { API_VERSION } from './../constants/Api';
import schemaUtils from './../utils/schemaUtils';
import articleSchema from '../schemas/article';
import { REMEMBER_ARTICLE_VIEW_STATE, UPDATE_ARTICLE_VIEW_STATE, FETCH_ARTICLE_VIEW_STATE } from './../constants/ViewStates';


export const REMEMBER_ARTICLE_START = 'REMEMBER_ARTICLE_START';
export const REMEMBER_ARTICLE_SUCCESS = 'REMEMBER_ARTICLE_SUCCESS';
export const REMEMBER_ARTICLE_FAILURE = 'REMEMBER_ARTICLE_FAILURE';

export const UPDATE_ARTICLE_START = 'UPDATE_ARTICLE_START';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';

const postRememberArticle = ({ article }) => {
  const meta = { viewId: REMEMBER_ARTICLE_VIEW_STATE, article };

  return {
    [CALL_API]: {
      types: [
        { type: REMEMBER_ARTICLE_START, meta },
        schemaUtils.getSuccessActionTypeWithSchema({
          type: REMEMBER_ARTICLE_SUCCESS,
          schema: articleSchema,
          meta,
        }),
        { type: REMEMBER_ARTICLE_FAILURE, meta },
      ],
      method: 'POST',
      body: JSON.stringify(article.toJS()),
      endpoint: `${API_VERSION}/bookmarks`,
    },
  };
};

const postUpdateArticle = (articleId, articleFields) => {
  const meta = { viewId: UPDATE_ARTICLE_VIEW_STATE, articleId, articleFields };

  return {
    [CALL_API]: {
      types: [
        { type: UPDATE_ARTICLE_START, meta },
        schemaUtils.getSuccessActionTypeWithSchema({
          type: UPDATE_ARTICLE_SUCCESS,
          schema: articleSchema,
          meta,
        }),
        { type: UPDATE_ARTICLE_FAILURE, meta },
      ],
      method: 'POST',
      body: JSON.stringify(articleFields),
      endpoint: `${API_VERSION}/bookmarks/${articleId}`,
    },
  };
};

export const rememberArticle = ({ article }) =>
  (dispatch) => dispatch(postRememberArticle({ article }));

export const updateArticle = (articleId, articleFields) => (dispatch) => {
  dispatch(postUpdateArticle(articleId, articleFields));
};


export const LOAD_ARTICLE_START = 'LOAD_ARTICLE_START';
export const LOAD_ARTICLE_SUCCESS = 'LOAD_ARTICLE_SUCCESS';
export const LOAD_ARTICLE_FAILURE = 'LOAD_ARTICLE_FAILURE';

const getArticleByUrl = (articleUrl) => {
  const meta = { viewId: FETCH_ARTICLE_VIEW_STATE };
  const encodedURI = encodeURIComponent(articleUrl);

  return {
    [CALL_API]: {
      types: [
        { type: LOAD_ARTICLE_START, meta },
        schemaUtils.getSuccessActionTypeWithSchema({
          type: LOAD_ARTICLE_SUCCESS,
          schema: arrayOf(articleSchema),
          meta,
        }),
        { type: LOAD_ARTICLE_FAILURE, meta },
      ],
      method: 'GET',
      endpoint: `${API_VERSION}/bookmarks?url=${encodedURI}`,
    },
  };
};

export const fetchArticleByUrl = (articleUrl) =>
  (dispatch) => dispatch(getArticleByUrl(articleUrl));
