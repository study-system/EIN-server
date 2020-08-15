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
      auth, location, major, target, pageSize, page,
    } = req.query;
    const data = await boardService.listBoard(auth, location, major, target, pageSize, page);
    res.json(data);
  });

  route.post('/', async (req, res) => {
    const {
      userId, title, startDate, endDate, content, locationId, majorId, targetId,
    } = req.body;
    const data = await boardService.createBoard(
      userId, title, startDate, endDate, content, locationId, majorId, targetId,
    );
    res.json(data);
  });

  route.put('/:boardId', async (req, res) => {
    const {
      boardId, title, startDate, endDate, content, locationId, majorId, targetId,
    } = req.body;
    const data = await boardService.editBoard(
      boardId, title, startDate, endDate, content, locationId, majorId, targetId,
    );
    res.json(data);
  });

  route.get('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const data = await boardService.getBoard(boardId);
    res.json(data);
  });

  route.delete('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const data = await boardService.deleteBoard(boardId);
    res.json(data);
  });

  route.get('/:boardId/comment', async (req, res) => {
    const { boardId } = req.params;
    const data = await boardService.listComment(boardId);
    res.json(data);
  });

  route.post('/:boardId/comment', async (req, res) => {
    const { boardId } = req.params;
    const { userEmail, comment } = req.body;
    const data = await boardService.createComment(boardId, userEmail, comment);
    res.json(data);
  });

  route.put('/:boardId/comment/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    const data = await boardService.createComment(commentId, comment);
    res.json(data);
  });

  route.delete('/:boardId/comment/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const data = await boardService.deleteComment(commentId);
    res.json(data);
  });
};
