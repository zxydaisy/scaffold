
const express = require('express');
const app = express();
const route = require('./route');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const busboy = require('connect-busboy');
const path = require('path');
const config = require('./config');

// 设置页面目录
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// req.body里面能读取到data
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(busboy());

// 静态资源的引用路径
app.use(express.static(path.join(__dirname, 'public')));

// 连接redis的配置
// const redisStore = new RedisStore({
//   host: config.redisHost,
//   port: config.redisPort,
// });

// const sessionOption = {
//   secret: config.sessionSecret,
//   resave: false,
//   saveUninitialized: false,
//   store: redisStore,
// };

// app.use(session(sessionOption));
// app.use(cookieParser());
// 报错之后不重启
app.use(require('express-domain-middleware'));

// 环境变量传入页面
app.use((req, res, next) => {
  // 静态资源的引入路径
  const o = {
    staticPath: process.env.CLOUD_ENV == 'public' ? `${config.staticUrl}/${config.random}` : '/build', // TODO 静态资源上传到cdn的地址和路径
  }

  const tmpVar = {
    env: process.env.ENV || '',
  }

  res.locals.G = o;
  res.locals.G.scriptVar = JSON.stringify(tmpVar);
  next();
});

// route
route(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
