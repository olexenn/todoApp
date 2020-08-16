import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import TodoList from './components/TodoList.jsx';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import './styles/App.scss';

function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <div className='container'>
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
    </BrowserRouter>
  );
}

export default App;
