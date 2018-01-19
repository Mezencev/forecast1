require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');

const passport = require('./config/passport');

const PORT = process.env.PORT || 8030;

const db = require('./models');

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(logger('dev'));


require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

