import express from 'express';
import envLoader from './env';
import expressLoader from './express';
import socketLoader from '../socket/socket';

export default (expressApp: express.Application): void => {
  envLoader();
  expressLoader(expressApp);
  socketLoader(expressApp);

  console.log('✌️ Express loaded');
};
