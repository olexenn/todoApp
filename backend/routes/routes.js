const router = require('express').Router();
const todoController = require('../controllers/todo.controller');

router.get('/', todoController.getTodo);
router.post('/', todoController.addTodo);
router.put('/', todoController.completeTodo);
router.delete('/', todoController.removeTodo);

module.exports = router;
