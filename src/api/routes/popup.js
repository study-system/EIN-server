import express from 'express';
import popupService from '../../services/popupService';
import validateUtil from '../../utils/validateUtil';

const route = express.Router();

export default (router) => {
  router.use('/popup', validateUtil.isAdmin, route);

  route.get('/', async (req, res) => {
    const data = await popupService.get();
    res.json(data);
  });

  route.put('/', validateUtil.isAdmin, async (req, res) => {
    const { active } = req.body;
    const success = await popupService.changeActive(active);
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });

  route.post('/', validateUtil.isAdmin, async (req, res) => {
    const { image } = req.body;
    const success = await popupService.changeImage(image);
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });
};
