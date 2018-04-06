import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

const middlewares: any[] = [];
let composeFunction = compose;

if (process.env.NODE_ENV === `development`) {
  //   const { logger } = require(`redux-logger`);
  //   middlewares.push(logger);
  const { composeWithDevTools } = require('redux-devtools-extension');
  composeFunction = composeWithDevTools;
}

export default composeFunction(applyMiddleware(...middlewares))(createStore)(
  rootReducer,
);
