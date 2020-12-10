import express from 'express';
import envLoader from './env';
import expressLoader from './express';
import socketLoader from '../socket/socket';
import databaseLoader from './database';
import http from 'http';

export default async (expressApp: express.Application, server: http.Server): Promise<void> => {
  envLoader();
  expressLoader(expressApp);
  socketLoader(server);
  await databaseLoader();

  console.log('✌️ Express loaded');
};
