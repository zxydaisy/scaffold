// 根据环境变量定义配置文件

const config = {
  port: 4008,
  // redis的配置
  redisHost: '127.0.0.1',
  redisPort: 6379,

  // mongodb的配置
  dbUrl: 'mongodb://127.0.0.1/web',
  sessionSecret: '', // 需要修改
}

module.exports = config;
