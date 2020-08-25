import passport from 'passport';
import LocalStrategy from 'passport-local';
import userService from '../services/userService';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use('basic', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: true,
  },
  async (email, password, done) => {
    const user = await userService.verify(email, password);
    if (!user) {
      return done(null, false, { message: 'Incorrect password' });
    }
    if (!!user && user.email_check === 'no') {
      return done(null, false, { message: 'email not auth' });
    }
    if (!!user && user.authuser_id !== null && user.auth === 'no') {
      return done(null, false, { message: 'authUser not auth' });
    }

    return done(null, {
      id: user.id, email: user.email, role: user.role, auth: user.auth,
    });
  },
));

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
