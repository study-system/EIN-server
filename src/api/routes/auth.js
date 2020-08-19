import express from 'express';
import authService from '../../services/authService';

const route = express.Router();

export default (router) => {
  router.use('/auth', route);

  route.get('/:authKey', async (req, res) => {
    const { authKey } = req.params;
    const success = await authService.authEmail(authKey);
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });
};
