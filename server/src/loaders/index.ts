import express from 'express';
import envLoader from './env';
import expressLoader from './express';

export default (expressApp: express.Application): void => {
  envLoader();
  expressLoader({ app: expressApp });

  console.log('✌️ Express loaded');
};
