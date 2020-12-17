import fs from 'fs';
import path from 'path';

const { SERVER_FULLCHAIN, SERVER_PRIVKEY, SERVER_CERT } = process.env;

const optionInitializer = {
  ca: fs.readFileSync(SERVER_FULLCHAIN!),
  key: fs.readFileSync(path.resolve(SERVER_PRIVKEY!), 'utf8').toString(),
  cert: fs.readFileSync(path.resolve(process.cwd(), SERVER_CERT!), 'utf8').toString(),
};

export default optionInitializer;
