require('./passportConfig.js');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const coastsRouter = require('./coasts-router');
const incomesRouter = require('./incomes-router');
const authRouter = require('./auth-router');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
mongoose.connect(
    'mongodb://admin:admin1989@ds235417.mlab.com:35417/coasts',
    { useNewUrlParser: true, useFindAndModify: false},
);

const app = express();

app.set('port', (process.env.PORT || 5500));

app.use(express.static(path.join(__dirname, '../src')));


app.use(express.session({
  secret: 'a4f8071f-c873-4447-8ee2',
  cookie: { maxAge: 2628000000 },
  store: new (require('express-sessions'))({
      storage: 'mongodb',
      instance: mongoose, // optional
      host: 'localhost', // optional
      port: 5500, // optional
      db: 'test', // optional
      collection: 'sessions', // optional
      expire: 86400 // optional
  })
}));
app.use(cookieParser());

app.use(bodyParser.json());

app.use(cors());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/purchases', coastsRouter);
app.use('/incomes', incomesRouter);
app.use('/authenticate', authRouter);

app.use((req, res) => {
    res.status(500).send('Smth went wrong');
});

app.listen(app.get('port'), () => {
    console.log('Node app is running at localhost:' + app.get('port'));
});
