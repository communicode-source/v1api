import redis from 'redis';
import config from '../../config/database';

var client = redis.createClient(config.redis.port, config.redis.host);
try {

  client.on('connect', () => {
    console.info("Redis successfully connected.");
  });
  client.on('error', (e) => {
      console.log('Redis error', e);
      client.quit()
  });
}
catch(e) {
    console.log('redis failed');
}


export default client;
