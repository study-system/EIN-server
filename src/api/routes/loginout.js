import express from 'express';
import passport from 'passport';

const route = express.Router();

export default (router) => {
  router.use(route);

  route.get('/logout', async (req, res) => {
    req.logout();
    req.session.save(() => {
      res.json({ message: 'logout success' });
    });
  });

  route.post('/login', passport.authenticate('basic'), async (req, res) => {
    res.json({ message: 'login success' });
  });
};
