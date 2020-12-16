import express from 'express';
import https from 'https';

import loader from './loaders';
import optionInitialize from './loaders/option';

const startServer = async () => {
  const app = express();
  const { SERVER_PORT } = process.env;
  const server = https.createServer(optionInitialize, app);
  await loader(app, server);

  server.listen(SERVER_PORT, () => {});
};

startServer();
