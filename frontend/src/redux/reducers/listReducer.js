import { handleActions } from 'redux-actions';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  getTodos,
} from '../actions/listActions';

export const initialState = [];

export const listReducer = handleActions(
  {
    [getTodos](state, { payload }) {
      return [...payload];
    },
    [addTodo](state, { payload }) {
      return [...state, { ...payload }];
    },
    [completeTodo](state, { payload }) {
      return state.map((todo) =>
        todo._id === payload ? { ...todo, completed: !todo.completed } : todo
      );
    },
    [deleteTodo](state, { payload }) {
      return state.filter((todo) => todo._id !== payload);
    },
  },
  initialState
);
