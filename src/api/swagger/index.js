import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  info: { // API informations (required)
    title: '교육정보 알리미',
    version: '1.0.0',
  },
  // host: 'myks790.iptime.org:8082',
  basePath: '/', // Base path (optional)
};

const options = {
  swaggerDefinition,
  apis: ['./src/api/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

export default (router) => {
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
