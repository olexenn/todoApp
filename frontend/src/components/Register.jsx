import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useApi } from '../hooks/apiHook';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';

export default function Auth(e) {
  const API = 'http://localhost:3001/api/v1/register';

  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(false);
  const { request } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setError('Passwords Do Not Match');
      return;
    }
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
      setError('User with this login already exists');
      return;
    }

    dispatch(userLogin(response.user));
    localStorage.setItem('user', response.user);
    setPassword('');
    setLogin('');
    return setStatus(true);
  };

  if (status) {
    return <Redirect to='/' />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        {error.length > 0 ? (
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
            <div className='group'>
              <input
                onChange={({ target }) => {
                  setConfirmPass(target.value);
                }}
                name='confirmPass'
                type='password'
                required
              />
              <span className='bar'></span>
              <label>Password</label>
            </div>
          </>
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
            <div className='group'>
              <input
                onChange={({ target }) => {
                  setConfirmPass(target.value);
                }}
                name='confirmPass'
                type='password'
                required
              />
              <span className='bar'></span>
              <label>Password</label>
            </div>
          </>
        )}
        <button className='btn' type='submit'>
          Auth
        </button>
      </form>
    </React.Fragment>
  );
}
