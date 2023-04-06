const { MongoClient, ObjectId} = require('mongodb');

// const url = 'mongodb://127.0.0.1:27017';
// const url = 'mongodb+srv://webdev:c1OLNZe6ObFsROt7@webservice.ez0zvzj.mongodb.net/?retryWrites=true&w=majority'
const url = process.env.MONGO_URL
const dbName = 'Contacts';

let db;

function connect() {
  return MongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
      console.log('Connected to MongoDB');
      db = client.db(dbName);
    });
}

function get() {
  if (!db) {
    throw new Error('MongoDB is not connected');
  }
  return db;
}

module.exports = {
  connect,
  get,
  ObjectId
};
