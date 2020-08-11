import React, { useState, useEffect } from 'react';
import {
  List,
  ListSubheader,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import PopUp from './PopUp';

const API = 'http://localhost:3001/api/v1/';

function TodoList() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [inError, setInError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(API);
      res
        .json()
        .then((res) => setTodo(res.todos))
        .catch((err) => setError(err));
    }

    fetchData();
  });

  const addTodo = (e) => {
    e.preventDefault();
    setShowAlert(true);
    if (input !== '') {
      fetch(API, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
      setInput('');
    } else {
      setInError('Input field cannot be blank');
    }
  };

  const removeTodo = (_id) => {
    fetch(API, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: _id }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const checkTodo = (_id) => {
    fetch(API, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: _id }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const handleChange = (e) => {
    e.persist();
    setInput(e.target.value);
  };

  const handleAlert = () => {
    setShowAlert(false);
  };

  return (
    <React.Fragment>
      {showAlert ? (
        <PopUp showAlert={showAlert} handleAlert={handleAlert} />
      ) : (
        <Typography variant='h6'>Best Todo App You've Ever Seen(no)</Typography>
      )}
      <AddTodo
        addTodo={addTodo}
        handleChange={handleChange}
        input={input}
        inError={inError}
      />

      {isLoading ? <LinearProgress /> : null}

      <List
        subheader={
          todo.length > 0 ? (
            <ListSubheader>Current Todos</ListSubheader>
          ) : (
            <ListSubheader>No Todos</ListSubheader>
          )
        }
      >
        {todo.map((todo) => {
          return (
            <TodoItem
              key={todo._id}
              todo={todo}
              removeTodo={removeTodo}
              checkTodo={checkTodo}
            />
          );
        })}
      </List>
    </React.Fragment>
  );
}

// class TodoList extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//       input: '',
//       error: '',
//       showAlert: false,
//       isLoading: false,
//       fError: null,
//     };
//     this.addTodo = this.addTodo.bind(this);
//     this.removeTodo = this.removeTodo.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleAlert = this.handleAlert.bind(this);
//     this.checkTodo = this.checkTodo.bind(this);
//   }

//   componentDidMount() {
//     this.setState({ isLoading: true });
//     fetch(API)
//       .then((response) => response.json())
//       .then((data) => this.setState({ data: data.data, isLoading: false }))
//       .catch((error) => {
//         this.setState({ error, isLoading: false });
//         console.error('Error: ', error);
//       });
//   }

//   componentWillUpdate() {
//     fetch(API)
//       .then((response) => response.json())
//       .then((data) => this.setState({ data: data.data }))
//       .catch((error) => {
//         this.setState({ error });
//         console.error('Error: ', error);
//       });
//   }

//   addTodo(e) {
//     e.preventDefault();
//     if (this.state.input !== '') {
//       fetch(API, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: this.state.input }),
//       })
//         .then((response) => response.json())
//         .then((response) => console.log(response))
//         .then(() => this.setState({ input: '' }));
//     } else {
//       this.setState({ error: 'Input Field cannot be blanked' });
//     }
//   }

//   removeTodo(_id) {
//     fetch(API, {
//       method: 'DELETE',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ _id: _id }),
//     })
//       .then((res) => res.json())
//       .then((res) => console.log(res));
//     this.setState({ input: '' });
//   }

//   async checkTodo(_id) {
//     console.log('sdfas');
//     await fetch(API, {
//       method: 'PUT',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ _id: _id }),
//     })
//       .then((res) => res.json())
//       .then((res) => console.log(res));

//     this.setState({ input: '' });
//   }

//   handleChange(e) {
//     e.persist();
//     this.setState((prev) => ({
//       ...prev,
//       ...{
//         [e.target.name]: e.target.value,
//       },
//     }));
//   }

//   handleAlert(e) {
//     this.setState({ showAlert: false });
//   }

//   render() {
//     const { data, isLoading } = this.state;
//     return (
//       <React.Fragment>
//         {this.state.showAlert ? (
//           <PopUp
//             showAlert={this.state.showAlert}
//             setShowAlert={this.handleAlert}
//           />
//         ) : (
//           <Typography variant='h6'>
//             Best Todo App You've Ever Seen(no)
//           </Typography>
//         )}
//         <AddTodo
//           addTodo={this.addTodo}
//           handleChange={this.handleChange}
//           input={this.state.input}
//           error={this.state.error}
//         />

//         {isLoading ? <LinearProgress /> : null}

//         <List
//           subheader={
//             this.state.data.length > 0 ? (
//               <ListSubheader>Current Todos</ListSubheader>
//             ) : (
//               <ListSubheader>No Todos</ListSubheader>
//             )
//           }
//         >
//           {data.map((todo) => {
//             return (
//               <TodoItem
//                 key={todo._id}
//                 todo={todo}
//                 removeTodo={this.removeTodo}
//                 checkTodo={this.checkTodo}
//               />
//             );
//           })}
//         </List>
//       </React.Fragment>
//     );
//   }
// }

export default TodoList;
