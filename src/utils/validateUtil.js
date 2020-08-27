import boardService from '../services/boardService';

const validateUtil = {
  isAdmin: (req, res, next) => {
    if (!!req.user && req.user.role === '관리자') {
      next();
    } else {
      res.status(401).end();
    }
  },

  isAuth: (req, res, next) => {
    if (!!req.user && (req.user.role === '인증' || req.user.role === '관리자')) {
      next();
    } else {
      res.status(401).end();
    }
  },

  isUser: (req, res, next) => {
    if (!!req.user && (req.user.role === '인증' || req.user.role === '일반' || req.user.role === '관리자')) {
      next();
    } else {
      res.status(401).end();
    }
  },

  boardAuth: (req, res, next) => {
    const {
      auth,
    } = req.body;
    if (!req.user) {
      res.status(401).end();
    } else if (auth === 'yes' && req.user.auth === 'yes') {
      validateUtil.isAuth(req, res, next);
    } else {
      validateUtil.isUser(req, res, next);
    }
  },

  checkId: (req, res, next) => {
    next();
  },

  isOwnComment: async (req, res, next) => {
    const userId = req.user.id;
    const { commentId } = req.params;
    const success = await boardService.verifyOwnComment(commentId, userId);
    if (success) {
      next();
    } else {
      res.status(401).end();
    }
  },

  isOwnBoard: async (req, res, next) => {
    const userId = req.user.id;
    const { boardId } = req.params;
    if (req.user.role === '관리자') {
      next();
    } else {
      const success = await boardService.verifyOwnBoard(boardId, userId);
      if (success) {
        next();
      } else {
        res.status(401).end();
      }
    }
  },
};

export default validateUtil;
