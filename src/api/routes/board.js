import express from 'express';
import boardService from '../../services/boardService';
/**
 * @swagger
 * tags:
 *   name: board
 *   description: 게시판 관련
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
 *                 example: 서울특별시
 */
  route.get('/location', async (req, res) => {
    const data = await boardService.listLocation();
    res.json(data);
  });

  /**
 * @swagger
 * /board:
 *   get:
 *     summary: 게시글 리스트를 반환함
 *     tags: [board]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: query
 *         required: true
 *         type: boolean
 *         description: 인증 게시판, 자유 게시판 선택 플래그
 *         example: yes
 *       - name: pageSize
 *         in: query
 *         required: true
 *         type: integer
 *         example: 10
 *       - name: page
 *         in: query
 *         required: true
 *         type: integer
 *         example: 1
 *       - name: location
 *         in: query
 *         type: string
 *         example: 제주특별자치도
 *       - name: major
 *         in: query
 *         type: string
 *         description: "major code(001: '경영,회계,사무', 002: '취업,창업', 003: '금융,보험', ...)"
 *         example: "001"
 *       - name: target
 *         in: query
 *         type: string
 *         description: "target code(001: 성인, 002: 유아, 003: 청소년)"
 *         example: "001"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: 여름 코딩 캠프
 *               writer:
 *                 type: string
 *                 example: 강상훈
 */
  route.get('', async (req, res) => {
    const {
      authFlag, location, major, target, pageSize, page,
    } = req.query;
    console.log(authFlag, location, major, target, pageSize, page);
    const data = await boardService.listBoard(authFlag, location, major, target, pageSize, page);
    res.json(data);
  });
  /**
 * @swagger
 * /board/{boardId}:
 *   get:
 *     summary: 게시글을 반환함
 *     tags: [board]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             title:
 *               type: string
 *               example: 여름 코딩 캠프
 *             content:
 *               type: string
 *               example: "여름 14박 15일 코딩코딩코딩코딩딩딩딩 문의 : ~~~~"
 *             writer:
 *               type: string
 *               example: 강상훈
 *             location:
 *               type: string
 *               example: 제주특별자치도
 *             startDate:
 *               type: string
 *               example: 2020-07-01T09:12:28Z
 *             endDate:
 *               type: string
 *               example: 2020-08-31T07:12:28Z
 */
  route.get('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const data = await boardService.getBoard(boardId);
    res.json(data);
  });
};
