import { createStore, applyMiddleware } from 'redux';
import { dummyReducer } from './reducer/index.js';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

export const store = createStore(
  dummyReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);
