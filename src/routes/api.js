import { Router } from 'express'
import _ from 'lodash'

import todos from '../todos/todos';

const router = Router()

function validate(condition, message) {
  return (req, res, next) => {
    if (!condition(req, res)) {
      res.status(400).json({ status: 'error', message })
    } else {
      next();
    }
  }
}

const validateTodoBody = validate(req => _.isString(req.body.description), 'La descripción es requerida como string');

function findTodo(id, res, ifFound) {
  const todo = todos.get(id);
  if (!todo) res.status(404).json({ status: 'not-found' })
  ifFound(todo)
}

router.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

router.get('/todos', (req, res) => {
  res.json(todos.getAll())
})

router.get('/todos/:id', (req, res) => {
  findTodo(req.params.id, res, todo => res.json(todo))
})

router.post('/todos', [
  validateTodoBody,
  (req, res) => res.json(todos.add(req.body))
])

router.put('/todos/:id', [
  validateTodoBody,
  (req, res) => findTodo(req.params.id, res, () => res.json(todos.update(req.params.id, req.body)))
])

export default router
