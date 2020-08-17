import React, { useEffect, useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { useApi } from '../hooks/apiHook';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../redux/actions/listActions';
import { userLogin } from '../redux/actions/userActions';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import PopUp from './PopUp';

function TodoList() {
  const API = 'http://localhost:3001/api/v1/?login=';
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  const isAlert = useSelector((state) => state.alert);

  const localUser = localStorage.getItem('user');

  const { request } = useApi();

  useEffect(
    useCallback(() => {
      const fetchData = async () => {
        const response = await request(API + localUser);
        dispatch(getTodos(response.todos));
        dispatch(userLogin(localUser));
      };

      fetchData();
    }, [dispatch, localUser, request]),
    []
  );

  return (
    <React.Fragment>
      {isAlert ? (
        <PopUp />
      ) : (
        <Typography variant='h6'>Best Todo App You've Ever Seen(no)</Typography>
      )}

      <AddTodo />

      <ul>
        {list.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </ul>
    </React.Fragment>
  );
}

export default TodoList;
