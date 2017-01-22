import { arrayOf } from 'normalizr';
import { CALL_API } from 'redux-api-middleware';
import { API_VERSION } from './../constants/Api';
import schemaUtils from './../utils/schemaUtils';
import articleSchema from '../schemas/article';

export const LOAD_ENTITIES_START = 'LOAD_ENTITIES_START';
export const LOAD_ENTITIES_SUCCESS = 'LOAD_ENTITIES_SUCCESS';
export const LOAD_ENTITIES_FAILURE = 'LOAD_ENTITIES_FAILURE';

const fetchEntities = () => ({
  [CALL_API]: {
    types: [
      { type: LOAD_ENTITIES_START },
      schemaUtils.getSuccessActionTypeWithSchema({
        type: LOAD_ENTITIES_SUCCESS,
        schema: arrayOf(articleSchema),
      }),
      { type: LOAD_ENTITIES_FAILURE },
    ],
    method: 'GET',
    endpoint: `${API_VERSION}/bookmarks`,
  },
});

export const loadEntities = () =>
  (dispatch) => dispatch(fetchEntities());
