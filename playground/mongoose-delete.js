const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '5b4b1514857a582225d7a3fd'}).then((todo) => {
//   console.log(todo);
// })

// Todo.findByIdAndRemove('5b4b1514857a582225d7a3fd').then((todo) => {
//   console.log(todo);
// })


// var id = '5b4a7fd5e0cb5a697318d7d0';

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Todo not found');
//   }
//   console.log('Todo by Id', JSON.stringify(todo, undefined, 2));
// }).catch((e) => console.log(e));

