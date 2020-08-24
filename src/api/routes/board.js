import express from 'express';
import boardService from '../../services/boardService';
import validateUtil from '../../utils/validateUtil';

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

  route.post('/', validateUtil.boardAuth,
    async (req, res) => {
      const {
        title, start_date, end_date, content, location_id, major_id, target_id, auth,
      } = req.body;
      const userId = req.user.id;
      const success = await boardService.createBoard(
        userId, title, start_date, end_date, content, location_id, major_id, target_id, auth,
      );
      if (success) {
        res.status(201).end();
      } else {
        res.status(400).end();
      }
    });

  route.put('/:boardId', validateUtil.isUser, async (req, res) => {
    const { boardId } = req.params;
    const {
      title, start_date, end_date, content, location_id, major_id, target_id, imageurl,
    } = req.body;
    const success = await boardService.editBoard(
      boardId, title, start_date, end_date, content, location_id, major_id, target_id, imageurl,
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

  route.delete('/:boardId', validateUtil.isUser, async (req, res) => {
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

  route.post('/:boardId/comment', validateUtil.isUser, async (req, res) => {
    const { boardId } = req.params;
    const { user_id, content } = req.body;
    const success = await boardService.createComment(boardId, user_id, content);
    if (success) {
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });

  route.put('/:boardId/comment/:commentId', validateUtil.isUser, async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const success = await boardService.putComment(commentId, content);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });

  route.delete('/:boardId/comment/:commentId', validateUtil.isUser, async (req, res) => {
    const { commentId } = req.params;
    const success = await boardService.deleteComment(commentId);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
};
