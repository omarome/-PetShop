'use strict';
const express = require('express'); // import express from 'express';
const app = express();
//const cors = require('cors');
const port = 3000;
const petRouter = require('./routes/petRoute');
const userRoute = require('./routes/userRoute');
const commentRoute= require('./routes/commentRoute');
const adeViewsRoute= require('./routes/adeViewsRoute');


app.use(express.json());
//app.use(cors);
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(express.static('public_html'))
app.use(express.static('uploads'))

// 2
app.use('/view',adeViewsRoute);
app.use('/comment',commentRoute);
app.use('/pet', petRouter);
app.use('/user', userRoute);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
