import expressLoader from './expressLoader';
import passportLoader from './passportLoader';
import sessionLoader from './sessionLoader';

export default (app) => {
  sessionLoader(app);
  passportLoader(app);
  expressLoader(app);
};
