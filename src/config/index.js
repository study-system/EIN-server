process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {

  port: process.env.PORT || 3000,
  api: {
    prefix: '/api',
  },
};
