import express from 'express';

import userService from '../../services/userService';

const route = express.Router();

export default (router) => {
  router.use('/', route);

  router.post('/authUser', async (req, res) => {
    const {
      email, password, nickname, address, detailAddress, phone, pushAgree, name, locationId, company, companyNumber, position, website,
    } = req.body;
    const success = await userService.signUpAuthUser(email, password, nickname, address, detailAddress, phone, pushAgree, name, locationId, company, companyNumber, position, website);
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });
};
