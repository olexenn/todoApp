import React from 'react';
import { useDispatch } from 'react-redux';
import { useApi } from '../hooks/apiHook';
import { deleteTodo, completeTodo } from '../redux/actions/listActions';
import {
  Button,
  Paper,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    '&:hover': { backgroundColor: '#FFCDD2' },
  },
  completedItem: {
    textDecoration: 'line-through',
    backgroundColor: '#FFCDD2',
  },
  btn: {
    height: '100%',
    marginTop: theme.spacing(2),
  },
}));

export default function TodoItem({ todo }) {
  const API = 'http://localhost:3001/api/v1/';

  const classes = useStyles();

  const dispatch = useDispatch();
  const { request } = useApi();

  return (
    <React.Fragment>
      <Paper elevation={5} className={classes.paper}>
        <ListItem
          button
          className={classes.item}
          onClick={() => {
            request(API, 'PUT', { _id: todo._id });
            dispatch(completeTodo(todo._id));
          }}
        >
          {todo.completed ? (
            <ListItemText
              className={classes.completedItem}
              primary={todo.text}
              secondary={todo.date}
            ></ListItemText>
          ) : (
            <ListItemText
              primary={todo.text}
              secondary={todo.date}
            ></ListItemText>
          )}
        </ListItem>
        {todo.completed ? (
          <Button
            onClick={() => {
              request(API, 'DELETE', { _id: todo._id });
              dispatch(deleteTodo(todo._id));
            }}
            color='secondary'
            size='large'
            className={classes.btn}
          >
            <DeleteIcon />
          </Button>
        ) : null}
      </Paper>
    </React.Fragment>
  );
}
