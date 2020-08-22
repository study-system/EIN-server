import cors from 'cors';
import expressLoader from './expressLoader';
import passportLoader from './passportLoader';
import sessionLoader from './sessionLoader';

export default (app) => {
  app.use(cors({
    origin: ['http://myks790.iptime.org:8083'],
    credentials: true,
  }));
  sessionLoader(app);
  passportLoader(app);
  expressLoader(app);
};
