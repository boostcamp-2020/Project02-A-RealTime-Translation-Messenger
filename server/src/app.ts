import express from 'express';
import loader from './loaders';

const app = express();
loader(app);

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Express App Init in ${SERVER_PORT}!`);
});
