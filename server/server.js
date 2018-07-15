var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
})

// GET /todos/1233535
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // validate id using isValid; if not send 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // findById
    // succes
      // if todo - send it back
      // if no todo - send back 404 with empty body
    // error
      // 400 - send
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send());
})

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  // validate id using isValid; if not send 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send());
})

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};