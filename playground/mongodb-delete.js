// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp')

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  // fineOneAndDelete
  // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').deleteMany({ name: 'Robi' }).then((result) => {
    console.log(result);
  })

  var obj = new ObjectID('5b4a29db857a582225d77d87');
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5b4a29db857a582225d77d87')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })

  // client.close();
});