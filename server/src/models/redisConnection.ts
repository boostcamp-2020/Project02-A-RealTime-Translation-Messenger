import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const client = redis.createClient({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT as string),
  password: REDIS_PASSWORD,
});

export default client;
