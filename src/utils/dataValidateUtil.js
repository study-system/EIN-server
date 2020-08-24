import validator from 'validator';
import userService from '../services/userService';

export default {
  email: (req, res, next) => {
    const { email } = req.params;
    if (!validator.isEmail(email)) {
      res.status(400).json({ field: 'email', message: 'email verification error' });
    } else {
      next();
    }
  },
  password: async (req, res, next) => {
    const { password } = req.body;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const success = await userService.verify(req.user.email, password);
      if (!success) {
        res.status(400).json({ field: 'password', message: 'password verification error' });
      } else {
        next();
      }
    }
  },
};
