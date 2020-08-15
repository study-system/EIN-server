import express from 'express';
import swagger from './swagger';
import board from './routes/board';
import user from './routes/user';
import blacklist from './routes/blacklist';
import popup from './routes/popup';
import loginout from './routes/loginout';

export default () => {
  const router = express.Router();
  swagger(router);
  board(router);
  user(router);
  blacklist(router);
  popup(router);
  loginout(router);
  return router;
};
