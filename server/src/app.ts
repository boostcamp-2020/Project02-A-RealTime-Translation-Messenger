import express from 'express';
import https from 'https';

import initializer from './initializer';
import optionInitializer from './initializer/option';

const startServer = async () => {
  const app = express();
  const { SERVER_PORT } = process.env;
  const server = https.createServer(optionInitializer, app);
  await initializer(app, server);

  server.listen(SERVER_PORT, () => {});
};

startServer();
