const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

// seed data for the tests
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 123,
  _creator: userTwoId
}];

const users = [{
  _id: userOneId,
  email: 'robi@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'kvaka998!').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'kvaka998!').toString()
  }]
}];


const populateTodos = (done) => {
  // se pokliče pred vsakim testom - izbrišem celo bazo todojev
  Todo.remove({}).then(() => {
    // nato naložim todoje, ki jih imam za seed data
    Todo.insertMany(todos);
  }).then(() => done());
};

// populateUsers moram narediti drugače kot Todo-je, ker insertMany ne kliče middleware-a
// zato uporabimo save
const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    // s Promise.all počakam, da se vsi promisi, ki so našteti kot atributi, zaključijo
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };