import express from 'express';
import board from './routes/board';
import swagger from './routes/swagger';

export default () => {
  const router = express.Router();
  swagger(router);
  board(router);
  return router;
};
