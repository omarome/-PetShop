'use strict';
const express = require('express'); // import express from 'express';
const app = express();
const port = 3000;
const petRouter = require('./routes/petRoute');
const userRoute = require('./routes/userRoute');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(express.static('public_html'))
app.use(express.static('uploads'))

// 2

app.get('/', (req, res) => {
  console.log('get pet');
  res.send('Hello World!');
});

app.use('/pet', petRouter);
app.use('/user', userRoute);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
