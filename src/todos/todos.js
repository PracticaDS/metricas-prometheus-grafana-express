import _ from 'lodash'
/* eslint-disable no-underscore-dangle */

let currentId = 0;
let todosInternal = {}
const todos = {
  getAll: () => _.cloneDeep(_.values(todosInternal)),
  add: ({ description, done = false }) => {
    currentId += 1;
    const newTodo = { description, id: currentId, done };
    todosInternal[newTodo.id] = newTodo;
    return _.clone(newTodo)
  },
  get: id => _.clone(todosInternal[_.toNumber(id)]),
  update: (id, body) => {
    const todo = todos.get(id);
    if (_.isBoolean(body.done)) todo.done = body.done;
    if (_.isString(body.description)) todo.description = body.description;
    todosInternal[id] = todo;
    return _.clone(todo)
  },
  clear: () => {
    todosInternal = {}
  }
}

export default todos
