import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '', {
  maxRetriesPerRequest: 1,
  lazyConnect: true,
});

export default redis;