import express from 'express';
import loader from './loaders';
import http from 'http';

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
