

module.exports = {
  login(req, res, next){
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  logout(req, res, next){
    if (req.session && req.session.user) {
      res.redirect('/');
    } else {
      next();
    }
  },
  api: {
    login(req, res, next) {
      if (req.session && req.session.user) {
        next();
      } else {
        return res.json(util.res(-100, { msg: '请重新登录。' }));
      }
    },
    logout(req, res, next) {
      if (req.session && req.session.user) {
        return res.json(util.res(-100, { msg: '请重新登录。' }));
      } else {
        next();
      }
    }
  }
};
