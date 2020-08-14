import express from 'express';
import board from './routes/board';
import user from './routes/user';
import blacklist from './routes/blacklist';
import swagger from './swagger';

export default () => {
  const router = express.Router();
  swagger(router);
  board(router);
  user(router);
  blacklist(router);
  return router;
};
