import express from 'express';
import userService from '../../services/userService';
/**
 * @swagger
 * tags:
 *   name: user
 *   summary: 회원 관련
 */

const route = express.Router();

export default (router) => {
  router.use('/user', route);
  /**
 * @swagger
 * /user/{email}:
 *   get:
 *     summary: 유저 정보를 반환함
 *     tags: [user]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *         example: myks790@gmail.com
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: email
 *               example: myks790@gmail.com
 *             nickname:
 *               type: string
 *               example: 닉네임
 *             name:
 *               type: string
 *               example: 강모씨
 *             phone:
 *               type: string
 *               example: 01012345678
 *             address:
 *               type: string
 *               example: 제주도 특별자치도 제주시 진남로 99길 10
 *             addressDetail:
 *               type: string
 *               example: 101호
 *             pushAgree:
 *               type: boolean
 *               example: true
 *   put:
 *     summary: 유저 정보 수정함
 *     tags: [user]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *         example: myks790@gmail.com
 *       - in: body
 *         name: user
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               example: 비밀번호
 *             nickname:
 *               type: string
 *               example: 닉네임
 *             phone:
 *               type: string
 *               example: 01012345678
 *             address:
 *               type: string
 *               example: 제주도 특별자치도 제주시 진남로 99길 10
 *             addressDetail:
 *               type: string
 *               example: 101호
 *             pushAgree:
 *               type: boolean
 *               example: true
 *     responses:
 *       200:
 *         description: OK
 */
  route.get('/:email', async (req, res) => {
    const { email } = req.params;
    const data = await userService.get(email);
    res.json(data);
  });

  route.put('/:email', async (req, res) => {
    const { email } = req.params;
    const {
      password, nickname, phone, address, detailAddress,
    } = req.body;
    const data = await userService.update(email, password, nickname, phone, address, detailAddress);
    res.json(data);
  });
};
