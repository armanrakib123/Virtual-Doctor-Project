// const Redis = require('ioredis');

// // Setup Redis Client
// const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
// const redis = new Redis(redisUrl, {
//   maxRetriesPerRequest: 3,
//   retryStrategy(times) {
//     const delay = Math.min(times * 50, 2000);
//     return delay;
//   }
// });

// redis.on('connect', () => {
//   console.log('✅ Redis connected successfully');
// });

// redis.on('error', (err) => {
//   console.error('❌ Redis connection error:', err);
// });

// class CacheService {
//   /**
//    * Get a value from the cache
//    * @param {string} key 
//    * @returns {Promise<any>}
//    */
//   async get(key) {
//     try {
//       const data = await redis.get(key);
//       if (data) {
//         return JSON.parse(data);
//       }
//       return null;
//     } catch (error) {
//       console.error(`Cache Get Error for key ${key}:`, error);
//       return null;
//     }
//   }

//   /**
//    * Set a value in the cache
//    * @param {string} key 
//    * @param {any} value 
//    * @param {number} ttl - Time to live in seconds (default 3600 = 1 hour)
//    */
//   async set(key, value, ttl = 3600) {
//     try {
//       await redis.set(key, JSON.stringify(value), 'EX', ttl);
//     } catch (error) {
//       console.error(`Cache Set Error for key ${key}:`, error);
//     }
//   }

//   /**
//    * Delete a value from the cache
//    * @param {string} key 
//    */
//   async del(key) {
//     try {
//       await redis.del(key);
//     } catch (error) {
//       console.error(`Cache Del Error for key ${key}:`, error);
//     }
//   }

//   /**
//    * Delete keys matching a pattern
//    * @param {string} pattern 
//    */
//   async delPattern(pattern) {
//     try {
//       const keys = await redis.keys(pattern);
//       if (keys.length > 0) {
//         await redis.del(...keys);
//       }
//     } catch (error) {
//       console.error(`Cache DelPattern Error for pattern ${pattern}:`, error);
//     }
//   }
// }

// module.exports = new CacheService();
// module.exports.redisClient = redis;




























const Redis = require('ioredis');

// Redis URL
const redisUrl =
  process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// ============================================
// NORMAL REDIS CLIENT
// শুধুমাত্র Cache-এর জন্য
// ============================================

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,

  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});


// ============================================
// BULLMQ REDIS CLIENT
// শুধুমাত্র BullMQ Queue এবং Worker-এর জন্য
// ============================================

const bullMQRedis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,

  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});


// ============================================
// NORMAL REDIS EVENTS
// ============================================

redis.on('connect', () => {
  console.log('Cache Redis connected successfully');
});

redis.on('ready', () => {
  console.log('Cache Redis is ready');
});

redis.on('error', (err) => {
  console.error('Cache Redis connection error:', err.message);
});


// ============================================
// BULLMQ REDIS EVENTS
// ============================================

bullMQRedis.on('connect', () => {
  console.log('BullMQ Redis connected successfully');
});

bullMQRedis.on('ready', () => {
  console.log('BullMQ Redis is ready');
});

bullMQRedis.on('error', (err) => {
  console.error('BullMQ Redis connection error:', err.message);
});


// ============================================
// CACHE SERVICE
// ============================================

class CacheService {

  async get(key) {
    try {
      const data = await redis.get(key);

      if (data) {
        return JSON.parse(data);
      }

      return null;

    } catch (error) {
      console.error(
        `Cache Get Error for key ${key}:`,
        error.message
      );

      return null;
    }
  }


  async set(key, value, ttl = 3600) {
    try {
      await redis.set(
        key,
        JSON.stringify(value),
        'EX',
        ttl
      );

    } catch (error) {
      console.error(
        `Cache Set Error for key ${key}:`,
        error.message
      );
    }
  }


  async del(key) {
    try {
      await redis.del(key);

    } catch (error) {
      console.error(
        `Cache Del Error for key ${key}:`,
        error.message
      );
    }
  }


  async delPattern(pattern) {
    try {
      const keys = await redis.keys(pattern);

      if (keys.length > 0) {
        await redis.del(...keys);
      }

    } catch (error) {
      console.error(
        `Cache DelPattern Error for pattern ${pattern}:`,
        error.message
      );
    }
  }
}


// ============================================
// EXPORT
// ============================================

const cacheService = new CacheService();

module.exports = cacheService;

module.exports.redisClient = redis;

module.exports.bullMQRedis = bullMQRedis;