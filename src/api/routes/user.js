import express from 'express';

import userService from '../../services/userService';
import dataValidateUtil from '../../utils/dataValidateUtil';
import roleValidateUtil from '../../utils/validateUtil';

const route = express.Router();

export default (router) => {
  router.use('/user', route);

  route.post('/', async (req, res) => {
    const {
      email, password, nickname, address, detail_address, phone, push_agree, name, location_id,
    } = req.body;
    const success = await userService.signUp(email, password, nickname, address, detail_address, phone, push_agree, name, location_id);
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });

  route.get('/:email', roleValidateUtil.isUser, dataValidateUtil.email, async (req, res) => {
    const { email } = req.params;
    const data = await userService.get(email);
    res.json(data);
  });

  route.put('/:email', roleValidateUtil.isUser, dataValidateUtil.email, dataValidateUtil.password, async (req, res) => {
    const { email } = req.params;
    const {
      password, newPassword, nickname, phone, address, addressDetail, pushAgree, location_id,
    } = req.body;
    const pw = newPassword || password;
    const success = await userService.update(email, pw, nickname, phone, location_id, address, addressDetail, pushAgree);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
};
