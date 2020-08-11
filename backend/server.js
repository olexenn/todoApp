const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/db');
const routes = require('./routes/routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('Successfully connected to mongoDB'))
  .catch((err) => {
    console.error('Error: ', err);
  });

app.use('/api/v1/', routes);

app.listen(3001, () => {
  console.log('App was started on port 3001');
});
