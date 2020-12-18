import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from '../routes';

const expressInitializer = (app: express.Application) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api', router);
};

export default expressInitializer;
