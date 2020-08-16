import { handleActions } from 'redux-actions';
import { userLogin, userLogout } from '../actions/userActions';

export const initialState = '';

export const userReducer = handleActions(
  {
    [userLogin](state, { payload }) {
      return (state = payload);
    },
    [userLogout](state, { payload }) {
      return (state = '');
    },
  },
  initialState
);
