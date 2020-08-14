import { handleActions } from 'redux-actions';
import { toggleAlert } from '../actions/alertActions';

export const alertReducer = handleActions(
  {
    [toggleAlert](state) {
      return !state;
    },
  },
  false
);
