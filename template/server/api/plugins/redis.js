import redis from 'redis';

const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: '6379'
});

export default client;
