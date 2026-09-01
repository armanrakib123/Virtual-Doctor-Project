const cacheService = require('../services/cache.service');

/**
 * Middleware to check if response is cached in Redis
 * @param {string} prefix - Optional prefix for the cache key
 * @param {number} ttl - Optional time-to-live if we want this middleware to automatically cache the response later (handled by patching res.send)
 */
const cacheMiddleware = (prefix = 'cache', ttl = 3600) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Construct a unique cache key based on URL and query params
    const key = `${prefix}:${req.originalUrl || req.url}`;

    try {
      const cachedResponse = await cacheService.get(key);

      if (cachedResponse) {
        console.log(`[Cache Hit] ${key}`);
        return res.status(200).json(cachedResponse);
      }

      console.log(`[Cache Miss] ${key}`);
      
      // Patch res.json to automatically cache the response before sending it
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        // Cache only successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cacheService.set(key, body, ttl);
        }
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error('Cache Middleware Error:', error);
      next();
    }
  };
};

module.exports = cacheMiddleware;
