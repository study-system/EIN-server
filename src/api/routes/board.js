import express from 'express';
import boardService from '../../services/boardService';

const route = express.Router();

export default (router) => {
  router.use('/board', route);

  route.get('/major', async (req, res) => {
    const data = await boardService.listMajor();
    res.json(data);
  });

  route.get('/location', async (req, res) => {
    const data = await boardService.listLocation();
    res.json(data);
  });

  route.get('/', async (req, res) => {
    const {
      authFlag, location, major, target, pageSize, page,
    } = req.query;
    const data = await boardService.listBoard(authFlag, location, major, target, pageSize, page);
    res.json(data);
  });

  route.get('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const data = await boardService.getBoard(boardId);
    res.json(data);
  });
};
