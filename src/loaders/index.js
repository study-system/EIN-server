import './mysqlLoader';
import expressLoader from './expressLoader';

export default (app) => {
  expressLoader(app);
};
