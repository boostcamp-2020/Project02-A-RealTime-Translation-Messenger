import express from 'express';
import http from 'http';

import loader from './loaders';

const startServer = async () => {
  const app = express();
  const server = http.createServer(app);
  await loader(app, server);

  const { SERVER_PORT } = process.env;
  server.listen(SERVER_PORT, () => {
    console.log(`Express App Init in ${SERVER_PORT}!`);
  });
};

startServer();
