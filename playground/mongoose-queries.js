const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b4a7fd5e0cb5a697318d7d0';

// uporabim standardno mongodb knjižnico, da z njo preverim, ali je id veljaven (ni nujno, da obstaja v bazi)
if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

// če elemtna ni, potem dobiš prazno polje oziroma null - ne zgodi se exeption

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', JSON.stringify(todos, undefined, 2));
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', JSON.stringify(todo, undefined, 2));
// });

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Todo not found');
  }
  console.log('Todo by Id', JSON.stringify(todo, undefined, 2));
}).catch((e) => console.log(e));

// Za domačo nalogo naredim še za userja

var userId = '5b4a56c53ea1615b34965426';

// uporabim standardno mongodb knjižnico, da z njo preverim, ali je id veljaven (ni nujno, da obstaja v bazi)
if (!ObjectID.isValid(userId)) {
  return console.log('User ID not valid');
}
User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User by Id', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));