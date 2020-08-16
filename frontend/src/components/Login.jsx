import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useApi } from '../hooks/apiHook';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';

export default function Auth(e) {
  const API = 'http://localhost:3001/api/v1/login';

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
      <form onSubmit={handleSubmit}>
        {error.length > 0 ? (
          <div className='group'>
            <input
              onChange={({ target }) => {
                setLogin(target.value);
              }}
              label='Login'
              name='login'
              type='text'
            />
            <span className='bar'></span>

            <input
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              label='Password'
              name='password'
              type='password'
            />
            <span className='bar'></span>
          </div>
        ) : (
          <>
            <div className='group'>
              <input
                onChange={({ target }) => {
                  setLogin(target.value);
                }}
                name='login'
                type='text'
                required
              />
              <span className='bar'></span>
              <label>Login</label>
            </div>
            <div className='group'>
              <input
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
                name='password'
                type='password'
                required
              />
              <span className='bar'></span>
              <label>Password</label>
            </div>
          </>
        )}
        <button type='submit' className='btn'>
          Auth
        </button>
      </form>
    </React.Fragment>
  );
}
