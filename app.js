'use strict';
const express = require('express'); // import express from 'express';
const app = express();
const cors = require('cors');
const passport = require('./utils/pass');
const bodyParser = require('body-parser');
const petRoute = require('./routes/petRoute');
const userRoute = require('./routes/userRoute');
const commentRoute= require('./routes/commentRoute');
const adeViewsRoute= require('./routes/adeViewsRoute');
const authRoute= require('./routes/authRoute');
const port = 3000;

//app.use(cors);
/*const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};*/
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(express.static('public_html'))
app.use(express.static('uploads'))

// 2
app.use('/auth', authRoute);
app.use('/view',adeViewsRoute);
app.use('/comment',commentRoute);
app.use('/pet', petRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

//passport.authenticate('jwt', {session: false}),

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
