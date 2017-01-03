const con = require('./controller');
const auth = con.auth;
const user = con.user;

module.exports = function(app) {

  // 未登录，进入登录界面
  app.get('/login', user.auth);

  // app.get('/api/login', user.api.login);
  // app.get('/api/reg',user.api.reg);

  // 登录成功之后进入到主页面
  app.get('*', auth.login, function (req, res, next) {
    res.render('index');
  });
}
