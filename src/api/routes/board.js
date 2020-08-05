import express from 'express';

const route = express.Router();

export default (router) => {
  router.use('/users', route);

  route.get('/test', (req, res) => res.json({ user: 'test' }).status(200));
};
