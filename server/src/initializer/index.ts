import express from 'express';
import https from 'https';

import envInitializer from './env';
import expressInitializer from './express';
import socketInitializer from '../sockets/socket';
import redisInitializer from './redis';

export default async (expressApp: express.Application, server: https.Server): Promise<void> => {
  envInitializer();
  expressInitializer(expressApp);
  socketInitializer(server);
  await redisInitializer();
};
