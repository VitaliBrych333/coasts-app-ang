const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./user-router');
const cookieParser = require('cookie-parser');
const path = require('path');

mongoose.connect(
    'mongodb://admin:admin1989@ds235417.mlab.com:35417/coasts',
    { useNewUrlParser: true },
);

const app = express();

app.set('port', (process.env.PORT || 5500));

app.use(express.static(path.join(__dirname, '../src')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/purchases', usersRouter);
app.use((req, res) => {
    res.status(500).send('Smth went wrong');
});

app.listen(app.get('port'), () => {
    console.log('Node app is running at localhost:' + app.get('port'));
});