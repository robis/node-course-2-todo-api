// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


// var user = {name: 'Robi', age: 50};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp')

  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b48f963857a582225d702fd')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })

  // db.collection('Todos').find({
  // }).count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  //  }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })

  db.collection('Users').find({
    name: 'Robi'
  }).count().then((count) => {
    console.log(`Users count: ${count}`);
   }, (err) => {
    console.log('Unable to fetch users', err);
  })

  // client.close();
});