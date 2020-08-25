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

  route.get('/:authKey', (req, res) => {
    const { authKey } = req.params;
    authService.authEmail(authKey, (success) => {
      if (success) {
        res.status(201).send('<h1>인증 되었습니다.</h1>');
      } else {
        res.status(400).send('<h1>이미 인증되었거나 인증에 실패했습니다.</h1>');
      }
    });
  });
};
