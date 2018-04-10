import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';

import rootReducer from './root';

const middlewares: any[] = [];
let composeFunction = compose;

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
  const { composeWithDevTools } = require('redux-devtools-extension');
  composeFunction = composeWithDevTools;
}

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const store = composeFunction(applyMiddleware(...middlewares))(createStore)(
  rootReducer,
);

sagaMiddleware.run(rootSaga);
export default store;
