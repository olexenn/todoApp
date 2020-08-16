import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Paper, makeStyles } from '@material-ui/core';
import { addTodo } from '../redux/actions/listActions';
import { toggleAlert } from '../redux/actions/alertActions';
import { useApi } from '../hooks/apiHook';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2, 0),
    maxWidth: '100%',
    alignItems: 'center',
  },
  input: {
    marginRight: theme.spacing(1),
  },
  btn: {
    marginLeft: theme.spacing(1),
  },
}));

export default function AddTodo() {
  const API = 'http://localhost:3001/api/v1/?login=';

  const classes = useStyles();

  const isAlert = useSelector((state) => state.alert);

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { request } = useApi();

  const handleInput = ({ target }) => setInput(target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === '') {
      setError(true);
      return;
    }

    const newTodo = {
      text: input.trim(),
      date: new Date().toISOString(),
    };
    request(API + localStorage.getItem('user'), 'POST', newTodo);
    dispatch(addTodo(newTodo));

    if (!isAlert) dispatch(toggleAlert());

    setError(false);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Paper elevation={3}>
        {error ? (
          <TextField
            fullWidth
            variant='outlined'
            size='small'
            error
            helperText='Input field cannot be blank'
            onChange={handleInput}
            name='input'
            value={input}
            className={classes.input}
            placeholder='Enter Your Todo Here'
          />
        ) : (
          <TextField
            fullWidth
            variant='outlined'
            size='small'
            onChange={handleInput}
            name='input'
            value={input}
            className={classes.input}
            placeholder='Enter Your Todo Here'
          />
        )}
      </Paper>
    </form>
  );
}
