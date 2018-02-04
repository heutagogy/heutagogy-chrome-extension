import { combineReducers } from 'redux-immutablejs';
import Immutable from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import dataView from './dataView';
import options from './options';
import { reducer as tabs } from './../modules/tabsTracker';

import * as entityReducers from './entityReducers';

const entities = (state = Immutable.fromJS({}), action) => Object.keys(entityReducers).reduce(
  (prev, key) => entityReducers[key](prev, action), state);

const reducers = combineReducers({
  entities,
  dataView,
  options,
  tabs,
  form: formReducer,
});

export default (state, action) => {
  return reducers(Immutable.fromJS(state), action).toJS();
};
