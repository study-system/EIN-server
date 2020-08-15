import session from 'express-session';
import redis from 'redis';

import RedisStoreModule from 'connect-redis';
import config from '../config';

const RedisStore = RedisStoreModule(session);
const redisClient = redis.createClient(config.redis);
export default (app) => {
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'SAME_SECRET',
    saveUninitialized: true,
    resave: false,
  }));
};
