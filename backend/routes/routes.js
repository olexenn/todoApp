const router = require('express').Router();
const todoController = require('../controllers/todo.controller');
const authController = require('../controllers/auth.controller');

router.get('/', todoController.getTodo);
router.post('/', todoController.addTodo);
router.put('/', todoController.completeTodo);
router.delete('/', todoController.removeTodo);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
