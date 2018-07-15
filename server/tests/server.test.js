const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
var { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => { // tole je asinhrono, zato moraš počakati na "done"
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    // make sure you get a 404 back
    // var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    // /todos/123
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // query database using findById toNotExist
        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      })
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    // grab id of first item
    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the new text';
    request(app)
      // update text, set completed true
      .patch(`/todos/${hexId}`)
      .send({
        text: text,
        completed: true
      })
      // 200
      .expect(200)
      // text is changed, completed is true, completedAt is a number .toBeA
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // query database using findById toNotExist
        Todo.findById(hexId).then((todo) => {
          expect(todo.completed).toBe(true);
          expect(typeof todo.completedAt).toBe('number');
          expect(todo.text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should clear completedAt when todo is not completed', (done) => {
    // grab id of second todo item
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text!!';

    request(app)
      // update text, set completed to false
      .patch(`/todos/${hexId}`)
      .send({
        text: text,
        completed: false
      })
      // 200
      .expect(200)
      // text is changed, competed false, completedAt is null, .toNotExist
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      // s tem set-om nastavim header get klica
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      // s tem set-om nastavim header get klica
      .expect(401)
      .expect((res) => {
        // expect(res.body._id).toBeFalsy();
        // če primerjam objekte, ne morem uporabiti toBe ampak toEqual
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'test@example.com';
    var password = '123abc!';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        // notacijo ['x-auth'] potrebujemo zato, ker dot notacija ne more imeli "-" v imenu
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        User.findOne({ email }).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'testexample.com',
        password: '30947'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: '123abc!'
      })
      .expect(400)
      .end(done);
  })
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        // notacijo ['x-auth'] potrebujemo zato, ker dot notacija ne more imeli "-" v imenu
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(users[1].email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          expect(user).toBeTruthy();
          expect(user.tokens).not.toEqual([]);
          // What toObject() does is it returns just the object as you would expect it, 
          // without all the mongoose-specific properties (stuff like _id, __v etc)
          expect(user.toObject().tokens[0]).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '!'
      })
      .expect(400)
      .expect((res) => {
        // notacijo ['x-auth'] potrebujemo zato, ker dot notacija ne more imeli "-" v imenu
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    // DELETE /users/me/token
    request(app)
      .delete('/users/me/token')
      // set x-auth equal to token
      .set('x-auth', users[0].tokens[0].token)
      // 200
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // find user, verify that tokens array has length of zero
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});