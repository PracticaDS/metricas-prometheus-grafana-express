import request from 'supertest'
import app from '../server'
import todos from '../todos/todos';

describe('API', () => {
  const description = 'preparar clase de pds';

  function expectTodo(res, inArray = false) {
    let expected = { description, id: expect.any(Number), done: false }
    if (inArray) expected = [expected]
    return expect(res.body).toEqual(expected);
  }

  beforeEach(() => {
    todos.clear()
  })

  it('requesting /api gives a status ok', (done) => {
    request(app)
      .get('/api/')
      .expect(200, { status: 'ok' }, done)
  })

  it('requesting /todos gives a list of todos', (done) => {
    todos.add({ description })
    request(app)
      .get('/api/todos')
      .expect(res => expectTodo(res, true))
      .expect(200, done)
  })

  it('creating /todos creates a todo', (done) => {
    request(app)
      .post('/api/todos')
      .send({ description })
      .expect(res => expectTodo(res))
      .expect(200, done)
  })
})
