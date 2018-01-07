require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(require('./routes'));

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
