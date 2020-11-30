import express from 'express';
import http from 'http';

import envLoader from './env';
import expressLoader from './express';
import socketLoader from '../sockets/socket';
import databaseLoader from './database';

export default async (expressApp: express.Application, server: http.Server): Promise<void> => {
  envLoader();
  expressLoader(expressApp);
  socketLoader(server);
  await databaseLoader();

  console.log('✌️ Express loaded');
};
