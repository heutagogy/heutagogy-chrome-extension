import Immutable from 'immutable';

export const getViewState = (state, viewId) => state.getIn(['dataView', viewId]) || new Immutable.Map();
