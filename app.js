
const express = require('express');
const app = express();
const route = require('./route');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);
const busboy = require('connect-busboy');
// req.body里面能读取到data
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(busboy());
// 连接redis的配置
const redisStore = new RedisStore({
  host: config.redisHost,
  port: config.redisPort,
});

const sessionOption = {
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: redisStore,
};

app.use(session(sessionOption));
app.use(cookieParser());
// 报错之后不重启
app.use(require('express-domain-middleware'));
// route
route(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
