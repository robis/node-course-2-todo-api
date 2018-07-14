var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // s tem Mongoosu povemo, katero knjižnico za promise naj uporabi
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

var newTodo = new Todo({
  text: 'Write a book',
  completed: false,
  completedAt: 0
});

newTodo.save().then((doc) => {
  console.log('Save todo ' + JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save', e)
});

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var newUser = new User({
  email: 'robert.sraka@gmail.com'
});

newUser.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save', e);
});