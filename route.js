const con = require('./controller');
const auth = con.user;
const user = con.user;

module.exports = function(app) {
  app.get('/api/login', user.api.login);
  app.get('/api/reg',user.api.reg);

  app.get('*', auth.login, function (req, res, next) {
    res.render('index');
  });
}
