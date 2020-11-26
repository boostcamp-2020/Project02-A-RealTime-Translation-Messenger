import express from 'express';
import cors from 'cors';
import router from '../routes';

const expressLoader = (app: express.Application) => {
  app.use(cors());
  app.use('/api/v1', router);
};

export default expressLoader;
