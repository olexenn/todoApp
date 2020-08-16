import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container, makeStyles, CssBaseline } from '@material-ui/core';
import TodoList from './components/TodoList.jsx';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
}));

function App() {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth='md'>
        <div className={classes.main}>
          <NavBar />
          <Switch>
            <Route exact path='/'>
              {localStorage.getItem('user') || user.length > 0 ? (
                <TodoList />
              ) : (
                <Redirect to='/login' />
              )}
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
          </Switch>
        </div>
      </Container>
    </BrowserRouter>
  );
}

export default App;
