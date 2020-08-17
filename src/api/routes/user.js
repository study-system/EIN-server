import express from 'express';

import userService from '../../services/userService';
import validateUtil from '../../utils/validateUtil';

const route = express.Router();

export default (router) => {
  router.use('/user', route);

  route.post('/', async (req, res) => {
    const {
      email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location,
    } = req.body;
    const data = await userService.signUp(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location);
    res.json(data);
  });

  route.get('/:email', validateUtil.email, async (req, res) => {
    const { email } = req.params;
    const data = await userService.get(email);
    res.json(data);
  });

  route.put('/:email', validateUtil.email, async (req, res) => {
    const { email } = req.params;
    const {
      password, nickname, phone, address, detailAddress,
    } = req.body;
    const data = await userService.update(email, password, nickname, phone, address, detailAddress);
    res.json(data);
  });
};
