import express from 'express';
/**
 * @swagger
 * tags:
 *   name: board
 *   summary: 게시판 관련
 */

const route = express.Router();

export default (router) => {
  router.use('/board', route);
  /**
 * @swagger
 * /board/testGet:
 *   get:
 *     summary: user:'test' 값을 json으로 반환함
 *     tags: [board]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *               example: test
 */
  route.get('/testGet', (req, res) => res.json({ user: 'test' }).status(200));
};
