import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { alias } from 'react-chrome-redux';
import requestMiddleware from './../middleware/requestMiddleware';
import rootReducer from '../reducers';
import { aliases } from '../actions';

export const basicMiddleware = [
  rootReducer,
];

export const middlewaresToApply = [
  thunk,
  alias(aliases),
  requestMiddleware,
  apiMiddleware,
];
