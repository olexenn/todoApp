import React, { useEffect, useCallback } from 'react';
import { List, ListSubheader, Typography } from '@material-ui/core';
import { useApi } from '../hooks/apiHook';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../redux/actions/listActions';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import PopUp from './PopUp';

function TodoList() {
  const API = 'http://localhost:3001/api/v1/';

  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  const isAlert = useSelector((state) => state.alert);

  const { request } = useApi();

  useEffect(
    useCallback(() => {
      const fetchData = async () => {
        const response = await request(API);
        dispatch(getTodos(response.todos));
      };
      fetchData();
    }, [dispatch, request]),
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

      <List
        subheader={
          list.length > 0 ? (
            <ListSubheader>Current Todos</ListSubheader>
          ) : (
            <ListSubheader>No Todos</ListSubheader>
          )
        }
      >
        {list.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </List>
    </React.Fragment>
  );
}

export default TodoList;