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

  route.put('/', async (req, res) => {
    const { active } = req.body;
    const data = await popupService.changeActive(active);
    res.json(data);
  });

  route.post('/', async (req, res) => {
    const { imageUrl } = req.body;
    const data = await popupService.changeImage(imageUrl);
    res.json(data);
  });
};
