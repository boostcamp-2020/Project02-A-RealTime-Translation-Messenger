import express from 'express';
import envLoader from './env';
import expressLoader from './express';
import socketLoader from '../socket/socket';
import http from 'http';

export default (expressApp: express.Application, server: http.Server): void => {
  envLoader();
  expressLoader(expressApp);
  socketLoader(server);

  console.log('✌️ Express loaded');
};
