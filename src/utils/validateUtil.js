export default {
  isAdmin: (req, res, next) => {
    // if (!!req.user && req.user.role === '관리자') {
    //   next();
    // } else {
    //   res.status(401).end();
    // }
    next();
  },
  isAuth: (req, res, next) => {
    // if (!!req.user && req.user.role === '인증') {
    //   next();
    // } else {
    //   res.status(401).end();
    // }
  },
  isUser: (req, res, next) => {
    // if (!!req.user && (req.user.role === '인증' || req.user.role === '일반', req.user.role === '관리자')) {
    //   next();
    // } else {
    //   res.status(401).end();
    // }
    next();
  },
  checkId: (req, res, next) => {
    next();
  },

};
