import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';

import { basicMiddleware, middlewaresToApply } from './commonMiddlewares';

import DevTools from '../containers/DevTools';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const store = createStore(
    ...basicMiddleware,
    preloadedState,
    compose(
      applyMiddleware(
        ...middlewaresToApply,
        sagaMiddleware,
        createLogger({
          stateTransformer: (state) => state.toJS(),
          // because toJS() is deep
          actionTransformer: (action) => Immutable.fromJS(action).toJS(),
        })),
      DevTools.instrument()
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
