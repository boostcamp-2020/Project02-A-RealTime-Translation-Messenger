import express from 'express';
import https from 'https';

import envLoader from './env';
import expressLoader from './express';
import socketLoader from '../sockets/socket';
import redisLoader from './redis';

export default async (expressApp: express.Application, server: https.Server): Promise<void> => {
  envLoader();
  expressLoader(expressApp);
  socketLoader(server);
  await redisLoader();
};
