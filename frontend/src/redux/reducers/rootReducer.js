import { combineReducers } from 'redux';
import { listReducer } from './listReducer';
import { alertReducer } from './alertReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  list: listReducer,
  alert: alertReducer,
  user: userReducer,
});
