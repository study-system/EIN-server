import db from './dbConfig';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {

  port: process.env.PORT || 8080,
  api: {
    prefix: '',
  },
  mysqlSetting: {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,
    waitForConnections: true,
    connectionLimit: 10,
  },
};
