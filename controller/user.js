
const util = require('../middlewares/util');

module.exports = {
  api: {
    login(req, res) {
      const name = req.body.name && req.body.name.trim();
      const pwd = req.body.pwd && req.body.pwd.trim();

      if (!name) {
        return res.json(util.res(-1, { msg: '用户名不能为空!' }));
      }

      if (!pwd) {
        return res.json(util.res(-1, { msg: '密码不能为空!' }));
      }

      const o = {
        name: name,
        password: pwd,
      };

      // 查询登录信息，如果存在，那么登录成功

    },
    reg(req, res) {
      const o = {
        inviteCode: _.random(1, 1000),
        username: req.body.name.trim(),
        password: req.body.pwd.trim(),
        profile: { email: req.body.email.trim(), cellphone: req.body.cellphone.trim() },
      };

      // 登录信息插入数据库
      res.json(util.res(err, d));
    }
  }
};
