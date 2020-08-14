import { combineReducers } from 'redux';
import { listReducer } from './listReducer';
import { alertReducer } from './alertReducer';

export const rootReducer = combineReducers({
  list: listReducer,
  alert: alertReducer,
});
