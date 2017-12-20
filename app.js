const express = require('express');
const bodyParse = require('body-parser');
const request = require('request');

const app = express();
const index = require('./routes/index');
const users = require('./routes/users');

app.use('/', index);
app.post('/', users);

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
