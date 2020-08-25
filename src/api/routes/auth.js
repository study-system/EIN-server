import express from 'express';
import authService from '../../services/authService';

const route = express.Router();

export default (router) => {
  router.use('/auth', route);

  route.get('/testEmail', (req, res) => {
    authService.getStandbyEmailAuth((e, result) => {
      res.status(200).json(result);
    });
  });

  route.get('/:authKey', async (req, res) => {
    const { authKey } = req.params;
    const success = await authService.authEmail(authKey);
    if (success) {
      res.status(201).send('<h1>인증 되었습니다.</h1>');
    } else {
      res.status(400).send('<h1>인증에 실패했습니다.</h1>');
    }
  });
};
