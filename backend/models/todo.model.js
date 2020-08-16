const mongoose = require('mongoose');
const User = require('./auth.model');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  date: { type: Date, default: Date.now(), required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
});
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
