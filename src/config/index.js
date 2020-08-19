import db from './dbConfig';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  port: process.env.PORT || 8080,
  api: {
    prefix: '',
  },
  mysql: {
    host: db.mysql.host,
    port: db.mysql.port,
    user: db.mysql.user,
    password: db.mysql.password,
    database: db.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
  },
  redis: {
    host: db.redis.host,
    port: db.redis.port,
  },
  emailAuthHost: 'myks790.iptime.org:8082/auth/',
};
