// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp')

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b4a28b7857a582225d77cd9')
  // }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   })

    db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5b4a2a0c857a582225d77d97')
    }, {
        $set: {
          name: 'Robi'
        },
        $inc: { age: 2 }
      }, {
        returnOriginal: false
      }).then((result) => {
        console.log(result);
      })

  // client.close();
});