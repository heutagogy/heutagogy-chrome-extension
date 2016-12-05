/* eslint-disable fp/no-let */
/* eslint-disable fp/no-mutation */

import { combineReducers } from 'redux-immutablejs';
import Immutable from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import dataView from './dataView';
import modal from './modal';
import view from './view';
import analytic from './../utils/analytic';
import { saveEntities } from './../utils/localStorageUtils';

import * as entityReducers from './entityReducers';

const applyEntitiesToState = (state, action) => {
  const entities = action.payload.get('entities');

  let result = state;

  entities.forEach((theEntities, entityType) => {
    theEntities.forEach((entity, entityId) => {
      result = result.mergeIn([entityType, entityId], entity);
    });
  });

  return result;
};

const isActionWithEntities = (action) => action.payload && action.payload.get && action.payload.get('entities');

const initialState = Immutable.fromJS({
  authUser: {},
});

const entities = (state = initialState, action) => {
  analytic.handleEvent(action);

  const nextState = isActionWithEntities(action)
    ? applyEntitiesToState(state, action)
    : state;

  const finalState = Object.keys(entityReducers).reduce((prev, key) => entityReducers[key](prev, action), nextState);

  saveEntities(finalState);

  return finalState;
};

export default combineReducers({
  entities,
  dataView,
  modal,
  view,
  form: formReducer,
});
