import { CALL_API } from 'redux-api-middleware';
import { API_VERSION } from './../constants/Api';
import schemaUtils from './../utils/schemaUtils';
import { getHttpHeaders } from '../utils/httpHeaders';

export const LOAD_ENTITIES_START = 'LOAD_ENTITIES_START';
export const LOAD_ENTITIES_SUCCESS = 'LOAD_ENTITIES_SUCCESS';
export const LOAD_ENTITIES_FAILURE = 'LOAD_ENTITIES_FAILURE';

const fetchEntities = ({ href, schema, options }) => {
  const meta = {};

  return {
    [CALL_API]: {
      types: [
        { type: LOAD_ENTITIES_START, meta },
        schemaUtils.getSuccessActionTypeWithSchema({
          type: LOAD_ENTITIES_SUCCESS,
          schema,
          meta,
        }),
        { type: LOAD_ENTITIES_FAILURE, meta },
      ],
      headers: getHttpHeaders({
        username: options.get('username'),
        password: options.get('password'),
      }),
      method: 'GET',
      endpoint: `${options.get('serverAddress')}/${API_VERSION}/${href}`,
    },
  };
};

export const loadEntities = ({ href, schema, options }) =>
  (dispatch) => dispatch(fetchEntities({ href, schema, options }));
