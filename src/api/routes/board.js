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

  route.get('/target', async (req, res) => {
    const data = await boardService.listTarget();
    res.json(data);
  });

  route.get('/', async (req, res) => {
    const {
      auth, location_id, major_id, target_id, pageSize, page,
    } = req.query;
    const data = await boardService.listBoard(auth, location_id, major_id, target_id, pageSize, page);
    res.json(data);
  });

  route.post('/', async (req, res) => {
    const {
      user_id, title, start_date, end_date, content, location_id, major_id, target_id, auth,
    } = req.body;
    const success = await boardService.createBoard(
      user_id, title, start_date, end_date, content, location_id, major_id, target_id, auth,
    );
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });

  route.put('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const {
      title, start_date, end_date, content, location_id, major_id, target_id,
    } = req.body;
    const success = await boardService.editBoard(
      boardId, title, start_date, end_date, content, location_id, major_id, target_id,
    );
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });

  route.get('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const data = await boardService.getBoard(boardId);
    if (data.length === 0) {
      return res.status(404).end();
    }
    res.json(data[0]);
  });

  route.delete('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const success = await boardService.deleteBoard(boardId);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });

  route.get('/:boardId/comment', async (req, res) => {
    const { boardId } = req.params;
    const data = await boardService.listComment(boardId);
    res.json(data);
  });

  route.post('/:boardId/comment', async (req, res) => {
    const { boardId } = req.params;
    const { userEmail, comment } = req.body;
    const success = await boardService.createComment(boardId, userEmail, comment);
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });

  route.put('/:boardId/comment/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const data = await boardService.putComment(commentId, content);
    res.json(data);
  });

  route.delete('/:boardId/comment/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const data = await boardService.deleteComment(commentId);
    res.json(data);
  });
};
