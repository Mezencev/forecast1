const db = require('../models');
const passport = require('../config/passport');
const weathersController = require('../config/weathersController');


module.exports = (app) => {
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json('/members');
  });
  app.post('/api/signup', (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    }).then(() => {
      res.redirect(307, '/api/login');
    }).catch((err) => {
      res.json(err);
    });
  });
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  app.get('/members', weathersController.getWeather);
};
