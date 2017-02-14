import { combineReducers } from 'redux-immutablejs';
import Immutable from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import dataView from './dataView';
import view from './view';
import options from './options';
import tabs from './tabs';

import * as entityReducers from './entityReducers';

const entities = (state = Immutable.fromJS({}), action) => Object.keys(entityReducers).reduce(
  (prev, key) => entityReducers[key](prev, action), state);

export default combineReducers({
  entities,
  dataView,
  options,
  tabs,
  view,
  form: formReducer,
});
