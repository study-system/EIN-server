import passport from 'passport';
import LocalStrategy from 'passport-local';
import userService from '../services/userService';

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: true,
  },
  (email, password, done) => {
    if (!userService.verify(email, password)) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, { email });
  },
));

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
