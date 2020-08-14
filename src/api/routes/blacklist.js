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
    const data = await blacklistService.report(reporter, reportedUser, content);
    res.json(data);
  });

  route.put('/:blacklistId', async (req, res) => {
    const { blacklistId } = req.params;
    const { status } = req.body;
    const data = await blacklistService.changeStatus(blacklistId, status);
    res.json(data);
  });
};
