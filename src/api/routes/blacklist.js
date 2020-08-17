import express from 'express';
import blacklistService from '../../services/blacklistService';

const route = express.Router();

export default (router) => {
  router.use('/blacklist', route);

  route.get('/', async (req, res) => {
    const { status, page, pageSize } = req.query;
    const data = await blacklistService.listblacklist(status, page, pageSize);
    res.json(data);
  });

  route.post('/', async (req, res) => {
    const { reporter, reportedUser, content } = req.body;
    const success = await blacklistService.report(reporter, reportedUser, content);
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });

  route.put('/:blacklistId', async (req, res) => {
    const { blacklistId } = req.params;
    const { status } = req.body;
    const success = await blacklistService.changeStatus(blacklistId, status);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
};
