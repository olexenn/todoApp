import React from 'react';
import { Container, makeStyles, CssBaseline } from '@material-ui/core';
import TodoList from './components/TodoList.jsx';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Container maxWidth='md'>
        <div className={classes.main}>
          <TodoList />
        </div>
      </Container>
    </div>
  );
}

export default App;
