import express from 'express';
import routes from '../api';
import config from '../config';

export default (app) => {
  app.use(express.json({ limit: '20mb' }));
  app.use(config.api.prefix, routes());
};
