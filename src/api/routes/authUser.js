import express from 'express';

import userService from '../../services/userService';

const route = express.Router();

export default (router) => {
  router.use('/', route);

  router.post('/authUser', async (req, res) => {
    console.log('authauth');
    const {
      email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location, company, companyNumber, position, website,
    } = req.body;
    const data = await userService.signUpAuthUser(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location, company, companyNumber, position, website);
    res.json(data);
  });
};
