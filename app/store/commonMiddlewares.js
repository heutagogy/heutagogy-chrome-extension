import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import requestMiddleware from './../middleware/requestMiddleware';
import rootReducer from '../reducers';

export const basicMiddleware = [
  rootReducer,
];

export const middlewaresToApply = [
  thunk,
  requestMiddleware,
  apiMiddleware,
];
