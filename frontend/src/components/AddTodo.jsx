import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/actions/listActions';
import { toggleAlert } from '../redux/actions/alertActions';
import { useApi } from '../hooks/apiHook';

export default function AddTodo() {
  const API = 'http://localhost:3001/api/v1/?login=';

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
    <form onSubmit={handleSubmit}>
      {error ? (
        <div className='group'>
          <input onChange={handleInput} name='input' value={input} required />
          <label>Enter Your Todo Here</label>
          <span className='bar'></span>
        </div>
      ) : (
        <div className='group'>
          <input onChange={handleInput} name='input' value={input} required />
          <label>Enter Your Todo Here</label>
          <span className='bar'></span>
        </div>
      )}
    </form>
  );
}
