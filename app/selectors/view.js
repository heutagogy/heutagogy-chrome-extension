import Immutable from 'immutable';

export const getViewState = (state, viewId) => Immutable.fromJS(state).getIn(['dataView', viewId]) || new Immutable.Map();
