import { combineReducers, ReducersMapObject } from 'redux';
import user from './user';

const combinedReducer = combineReducers({ user } as ReducersMapObject);

export default combinedReducer;
