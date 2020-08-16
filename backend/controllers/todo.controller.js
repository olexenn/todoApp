const Todo = require('../models/todo.model');
const User = require('../models/auth.model');

async function checkUserById(login) {
  if (!login) {
    return { msg: 'no login', status: 400 };
  }

  const candidate = await User.findOne({ login: login });

  if (!candidate) return { msg: 'no user', status: 404 };
  return { status: 200, candidate };
}

exports.addTodo = async (req, res) => {
  if (!req.session) {
    res.status(403).json({ msg: 'Not Auth' });
    return;
  }
  const user = await checkUserById(req.query.login);
  const newTodo = new Todo({
    text: req.body.text,
    date: req.body.date,
    user: user.candidate._id,
  });

  newTodo
    .save()
    .then(res.status(201).json({ msg: 'Todo was added' }))
    .catch((err) => {
      console.log('Error: ', err);
    });
};

exports.getTodo = async (req, res) => {
  if (!req.session) {
    res.status(403).json({ msg: 'Not Auth' });
    return;
  }
  const user = await checkUserById(req.query.login);
  const todos = await Todo.find({ user: user.candidate._id });
  res.json({ todos: todos });
};

exports.completeTodo = async (req, res) => {
  if (!req.session) {
    res.status(403).json({ msg: 'Not Auth' });
    return;
  }
  const user = await checkUserById(req.query.login);
  const todo = await Todo.findOne(
    { date: req.body.date, user: user.candidate._id },
    (err) => {
      if (err) console.error('Error: ', err);
    }
  );

  todo.completed
    ? await Todo.updateOne(
        todo,
        { $set: { completed: false } },
        { new: true },
        (err) => {
          if (err) console.error('Error: ', err);
        }
      )
    : await Todo.updateOne(
        todo,
        { $set: { completed: true } },
        { new: true },
        (err) => {
          if (err) console.log('Error: ', err);
        }
      );

  res.json({ msg: 'Todo was completed' });
};

exports.removeTodo = async (req, res) => {
  if (!req.session) {
    res.status(403).json({ msg: 'Not Auth' });
    return;
  }
  const user = await checkUserById(req.query.login);
  Todo.findOneAndDelete({
    date: req.body.date,
    user: user.candidate._id,
  })
    .then(res.json({ msg: 'Todo has been removed' }))
    .catch((err) => console.log('Error: ', err));
};
