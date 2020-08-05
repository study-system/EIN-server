import express from 'express';
import board from './routes/board';

export default () => {
  const router = express.Router();
  board(router);

  return router;
};
