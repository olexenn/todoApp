import React from 'react';
import { useDispatch } from 'react-redux';
import { useApi } from '../hooks/apiHook';
import { deleteTodo, completeTodo } from '../redux/actions/listActions';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TodoItem({ todo }) {
  const API = 'http://localhost:3001/api/v1/?login=';

  const dispatch = useDispatch();
  const { request } = useApi();
  console.log(todo);

  return (
    <React.Fragment>
      <div className='paper'>
        <li
          className='todo'
          onClick={() => {
            request(API + localStorage.getItem('user'), 'PUT', {
              date: todo.date,
            });
            dispatch(completeTodo(todo.date));
          }}
        >
          {todo.completed ? (
            <p className='completed todo-text'>{todo.text}</p>
          ) : (
            <p className='todo-text'>{todo.text}</p>
          )}
        </li>
        {todo.completed ? (
          <button
            className='delete-btn'
            onClick={() => {
              request(API + localStorage.getItem('user'), 'DELETE', {
                date: todo.date,
              });
              dispatch(deleteTodo(todo.date));
            }}
          >
            <DeleteIcon />
          </button>
        ) : null}
      </div>
    </React.Fragment>
  );
}
