import React from 'react';
import { TextField, Paper, makeStyles } from '@material-ui/core';

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

export default function AddTodo({ addTodo, handleChange, input, inError }) {
  const classes = useStyles();

  const isError = () => {
    if (inError !== '') return true;
  };

  return (
    <form onSubmit={(e) => addTodo(e)} className={classes.form}>
      <Paper elevation={3}>
        {isError() ? (
          <TextField
            fullWidth
            variant='outlined'
            size='small'
            error
            helperText='Input field cannot be blank'
            onChange={() => handleChange()}
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
            onChange={(e) => handleChange(e)}
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
