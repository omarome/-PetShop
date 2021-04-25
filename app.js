'use strict';
const express = require('express'); // import express from 'express';
const app = express();
const port = 3000;

// 1
app.use(express.static('public_html'))

// 2
app.get('/home', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});
app.use(express.static('public_html'));

app.get('/catinfo', (req, res) => {
  const cat = {
    name: 'Frank',
    age: 6,
    weight: 5,
  };
  res.json(cat);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
