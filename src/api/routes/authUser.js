import express from 'express';
import validateUtil from '../../utils/validateUtil';
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

  route.get('/authUser', validateUtil.isAdmin, async (req, res) => {
    const {
      email_check, push_agree, location_id, auth, pageSize, page,
    } = req.query;
    const data = await userService.listAuthUser(auth, email_check, push_agree, location_id, page, pageSize);
    res.json(data);
  });

  route.put('/authUser/:authuser_id', validateUtil.isAdmin, async (req, res) => {
    const {
      authuser_id,
    } = req.params;
    const {
      auth,
    } = req.body;
    const success = await userService.auth(authuser_id, auth);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
};
