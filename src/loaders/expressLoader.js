import routes from '../api';
import config from '../config';

export default (app) => {
  app.use(config.api.prefix, routes());
};
