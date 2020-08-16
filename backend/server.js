const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const config = require('./config/db');
const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(cookieParser());
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

app.use(
  session({
    secret: 'olexa',
    resave: false,
    key: 'login',
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      autoRemove: 'interval',
      autoRemoveInterval: 5,
    }),
  })
);

app.use('/api/v1/', routes);

app.listen(3001, () => {
  console.log('App was started on port 3001');
});
