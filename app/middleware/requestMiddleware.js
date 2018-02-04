/* eslint-disable fp/no-mutation */
import Immutable from 'immutable';

import { CALL_API } from 'redux-api-middleware';
import { getUser } from './../selectors/user';
import { getOptions } from './../selectors/options';

const requestMiddleware = () => (store) => (next) => (action) => {
  if (action[CALL_API]) {
    const headers = action[CALL_API].headers = action[CALL_API].headers || {}; // eslint-disable-line
    const method = action[CALL_API].method;
    const state = Immutable.fromJS(store.getState());
    const user = getUser(state);
    const serverAddress = getOptions(state).get('serverAddress');

    if (method === 'GET' || method === 'POST' || method === 'PUT' || method === 'DELETE') {
      headers['Content-Type'] = 'application/json';

      action[CALL_API].endpoint = `${serverAddress.replace(/\/$/, '')}/${action[CALL_API].endpoint}`; // eslint-disable-line

      if (!user.isEmpty()) {
        headers.Authorization = headers.Authorization || `JWT ${user.get('access_token')}`;
      }

      return next(action);
    }
  }

  return next(action);
};

export default requestMiddleware();
