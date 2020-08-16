const User = require('../models/auth.model');
const Todo = require('../models/todo.model');
const bcrypt = require('bcrypt');

function hashPassword(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) console.error(err);
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

const register = async (req, res) => {
  if (req.session.key) {
    res.json({ msg: 'You have active session' });
    return;
  }

  const user = await User.findOne({ login: req.body.login }, (err) => {
    if (err) console.error(err);
  });

  if (user) {
    res.status(402).json({ errors: 'user with this name already exists' });
    return;
  }

  const newUser = new User({
    login: req.body.login,
    password: req.body.password,
  });

  hashPassword(newUser, (err, user) => {
    if (err) res.json({ msg: err });
    else res.status(201).json({ user: user.login, msg: 'User was created' });
  });
};

const login = async (req, res) => {
  if (req.session.key) {
    res.json({ msg: 'You have active session' });
    return;
  }

  const user = await User.findOne({ login: req.body.login }, (err) => {
    if (err) console.error(err);
  });

  if (!user) {
    res.status(402).json({ errors: 'Wrong login' });
    return;
  }

  await bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
    if (err) {
      console.error(err);
      return;
    } else if (!isMatch) {
      res.status(402).json({ errors: 'Wrong password' });
      return;
    }
    req.session.key = req.body.login;
    res.json({ msg: 'Logged in', user: user.login });
  });
};

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
  });
  res.json({ msg: 'Success' });
};

module.exports = { register, login, logout };
