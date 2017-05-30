import redis from 'redis';
import config from '../../config/database';

var client = redis.createClient(config.redis.port, config.redis.host);

client.on('connect', () => {
  console.info("Redis successfully connected.");
});

export default client;
