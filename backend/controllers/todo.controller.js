const Todo = require('../models/todo.model');

exports.addTodo = (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });

  newTodo
    .save()
    .then(res.status(201).json({ msg: 'Todo was added' }))
    .catch((err) => {
      console.log('Error: ', err);
    });
};

exports.getTodo = async (req, res) => {
  const todos = await Todo.find();
  res.json({ todos: todos });
};

exports.completeTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.body._id }, (err) => {
    if (err) console.error('Error: ', err);
  });

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

exports.removeTodo = (req, res) => {
  Todo.findOneAndDelete({ _id: req.body._id })
    .then(res.json({ msg: 'Todo has been removed' }))
    .catch((err) => console.log('Error: ', err));
};
