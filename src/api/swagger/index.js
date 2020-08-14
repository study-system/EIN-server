import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDoc = YAML.load('./src/api/swagger//ein-server.yml');

export default (router) => {
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
