import express from 'express';
import passport from 'passport';

const route = express.Router();

export default (router) => {
  router.use(route);

  route.get('/logout', async (req, res) => {
    req.logout();
  });

  route.post('/login', passport.authenticate('local'), async (req, res) => {
    res.json({ message: 'login success' });
  });
};
