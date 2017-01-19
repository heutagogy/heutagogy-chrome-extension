import { CALL_API } from 'redux-api-middleware';
import { API_VERSION } from './../constants/Api';

import schemaUtils from './../utils/schemaUtils';
import authUserSchema from './../schemas/authUser';

export const USER_LOGIN_STARTED = 'USER_LOGIN_STARTED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

const fetchUserLogin = ({ serverAddress, username, password }) => {
  const meta = { serverAddress, username, password };

  return {
    [CALL_API]: {
      types: [
        { type: USER_LOGIN_STARTED, meta },
        schemaUtils.getSuccessActionTypeWithSchema({ type: USER_LOGIN_SUCCESS, schema: authUserSchema, meta }),
        { type: USER_LOGIN_FAILURE, meta },
      ],
      method: 'POST',
      body: JSON.stringify({ username, password }),
      endpoint: `${serverAddress}/${API_VERSION}/login`,
    },
  };
};

export const loginUser = ({ serverAddress, username, password }) =>
  (dispatch) => dispatch(fetchUserLogin({ serverAddress, username, password }));
