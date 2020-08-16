import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/apiHook';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/actions/userActions';

export default function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { request } = useApi();

  const handleLogOut = async () => {
    await request('http://localhost:3001/api/v1/logout/', 'POST');
    localStorage.removeItem('user');
    dispatch(userLogout());
  };

  return (
    <ul>
      <li>
        <Link to='/' className='link'>
          Todo
        </Link>
      </li>
      {localStorage.getItem('user') || user.length > 0 ? (
        <li className='authLinks'>
          <Link to='/login' onClick={handleLogOut} className='link'>
            LogOut
          </Link>
        </li>
      ) : (
        <>
          <li className='authLinks'>
            <Link to='/login' className='link'>
              LogIn
            </Link>
          </li>
          <li className='authLinks'>
            <Link to='/register' className='link'>
              Register
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
