import cors from 'cors';
import expressLoader from './expressLoader';
import passportLoader from './passportLoader';
import sessionLoader from './sessionLoader';

export default (app) => {
  app.use(cors());
  sessionLoader(app);
  passportLoader(app);
  expressLoader(app);
};
