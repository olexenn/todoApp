import React from 'react';
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
    marginTop: theme.spacing(0.8),
  },
}));

export default function TodoItem({ todo, removeTodo, checkTodo }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper elevation={5} className={classes.paper}>
        <ListItem
          button
          onClick={() => checkTodo(todo._id)}
          className={classes.item}
        >
          {todo.completed ? (
            <ListItemText className={classes.completedItem}>
              {todo.text}
            </ListItemText>
          ) : (
            <ListItemText>{todo.text}</ListItemText>
          )}
        </ListItem>
        {todo.completed ? (
          <Button
            color='secondary'
            size='medium'
            className={classes.btn}
            onClick={() => removeTodo(todo._id)}
          >
            <DeleteIcon />
          </Button>
        ) : null}
      </Paper>
    </React.Fragment>
  );
}
