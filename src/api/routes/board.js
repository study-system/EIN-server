import express from 'express';
import boardService from '../../services/boardService';
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
 * /board/major:
 *   get:
 *     summary: 대분류를 반환함
 *     tags: [board]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: 경영, 회계, 사무
 */
  route.get('/major', async (req, res) => {
    const data = await boardService.listMajor();
    res.json(data);
  });

  /**
 * @swagger
 * /board/location:
 *   get:
 *     summary: 시도 리스트 반환함
 *     tags: [board]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: 제주특별자치도
 */
  route.get('/major', async (req, res) => {
    const data = await boardService.listMajor();
    res.json(data);
  });
};
