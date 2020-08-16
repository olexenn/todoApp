import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { useApi } from '../hooks/apiHook';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2, 0),
    maxWidth: '100%',
    alignItems: 'center',
  },
  input: {
    marginBottom: theme.spacing(3),
  },
}));

export default function Auth(e) {
  const API = 'http://localhost:3001/api/v1/login';
  const classes = useStyles();

  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(false);
  const { request } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login.trim() === '' || password.trim() === '') {
      setError('Input Fields Cannot Be Blank');
      return;
    }

    const response = await request(API, 'POST', {
      login,
      password,
    });
    console.log(response);
    if (response.errors) {
      setError('Wrong Login or Password');
      return;
    }

    dispatch(userLogin(response.user));

    localStorage.setItem('user', response.user);
    console.log(password);
    setPassword('');
    setLogin('');
    return setStatus(true);
  };

  if (status) {
    console.log(password);
    return <Redirect to='/' />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error.length > 0 ? (
          <div>
            <TextField
              className={classes.input}
              fullWidth
              error
              helplerText={error}
              onChange={({ target }) => {
                setLogin(target.value);
              }}
              variant='outlined'
              label='Login'
              name='login'
              type='text'
              autoFocus
            />
            <TextField
              className={classes.input}
              fullWidth
              error
              helperText={error}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              variant='outlined'
              label='Password'
              name='password'
              type='password'
            />
          </div>
        ) : (
          <div>
            <TextField
              className={classes.input}
              fullWidth
              onChange={({ target }) => {
                setLogin(target.value);
              }}
              variant='outlined'
              label='Login'
              name='login'
              type='text'
              autoFocus
            />
            <TextField
              className={classes.input}
              fullWidth
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              variant='outlined'
              label='Password'
              name='password'
              type='password'
            />
          </div>
        )}
        <Button variant='contained' type='submit'>
          Auth
        </Button>
      </form>
    </React.Fragment>
  );
}
