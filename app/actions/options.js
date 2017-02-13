import { CALL_API } from 'redux-api-middleware';
import { API_VERSION } from './../constants/Api';
import { LOGIN_VIEW_STATE } from './../constants/ViewStates';
import schemaUtils from './../utils/schemaUtils';
import authUserSchema from './../schemas/authUser';

export const USER_LOGIN_STARTED = 'USER_LOGIN_STARTED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

const fetchUserLogin = ({ username, password }) => ({
  type: 'loginUserLoginAlias',
  username,
  password,
});

export const loginUserLoginAlias = ({ username, password }) => {
  const meta = { viewId: LOGIN_VIEW_STATE, username };

  return {
    [CALL_API]: {
      types: [
        { type: USER_LOGIN_STARTED, meta },
        schemaUtils.getSuccessActionTypeWithSchema({ type: USER_LOGIN_SUCCESS, schema: authUserSchema, meta }),
        { type: USER_LOGIN_FAILURE, meta },
      ],
      method: 'POST',
      body: JSON.stringify({ username, password }),
      endpoint: `${API_VERSION}/login`,
    },
  };
};

export const loginUser = fetchUserLogin;
