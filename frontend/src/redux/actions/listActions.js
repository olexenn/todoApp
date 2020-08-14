import { createAction } from 'redux-actions';

export const getTodos = createAction('GET_TODOS');
export const addTodo = createAction('ADD_TODO');
export const deleteTodo = createAction('REMOVE_TODO');
export const completeTodo = createAction('COMPLETE_TODO');
