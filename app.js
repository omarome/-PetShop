'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const catRouter = require('./routes/catRouter');
const userRouter = require('./routes/userRouter');
const authRoute= require('./routes/authRoute');
const passport = require('./utils/pass');
const app = express();
const port = process.env.HTTP_PORT || 3000;

app.use(cors());
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, port);
} else {
  require('./utils/localhost')(app, process.env.HTTPS_PORT|| 8000,port);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public_html'));  // Define public folder
app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

// routes
app.use('/auth', authRoute);
app.use('/cat',  catRouter);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRouter);
app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
