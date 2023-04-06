require('dotenv').config()
const express = require('express');
const app = express();
var cors = require('cors')

const mongo = require('./model/mongo');
const route = require('./routes/users');

mongo.connect().then(() => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use('/', route);

  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
