import validator from 'validator';

export default {
  email: (req, res, next) => {
    const { email } = req.params;
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: 'email verification error' });
    } else {
      next();
    }
  },
};
