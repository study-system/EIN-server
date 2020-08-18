export default {
  isAdmin: (req, res, next) => {
    if (!!req.user && req.user.role === '관리자') {
      next();
    } else {
      res.status(401).end();
    }
  },
  isAuth: (req, res, next) => {
    if (!!req.user && req.user.role === '인증') {
      next();
    } else {
      res.status(401).end();
    }
  },
};
