import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/apiHook';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/actions/userActions';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { request } = useApi();

  const handleLogOut = async () => {
    await request('http://localhost:3001/api/v1/logout/', 'POST');
    localStorage.removeItem('user');
    dispatch(userLogout());
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Todo
          </Typography>
          {localStorage.getItem('user') || user.length > 0 ? (
            <Button
              color='inherit'
              onClick={handleLogOut}
              component={Link}
              to='/login'
            >
              LogOut
            </Button>
          ) : (
            <>
              <Button
                color='inherit'
                onClick={handleLogOut}
                component={Link}
                to='/login'
              >
                LogIn
              </Button>
              <Button
                color='inherit'
                onClick={handleLogOut}
                component={Link}
                to='/register'
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
