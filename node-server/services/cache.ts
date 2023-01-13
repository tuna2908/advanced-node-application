import mongoose from 'mongoose';;
import { RedisService } from './redis';

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype['cache'] = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options['key'] || '');

  return this;
};

mongoose.Query.prototype.exec = async function () {
  const redisClient = RedisService.getInstance().getRedisClient();

  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  // See if we have a value for 'key' in redis
  const cacheValue = await redisClient.hGet(this.hashKey, key);

  // If we do, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    console.log("LOAD FROM CACHEE", { key }); 
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  redisClient.hSet(this.hashKey, key, JSON.stringify(result));

  return result;
};

export const clearHash = (hashKey) => {
  const redisClient = RedisService.getInstance().getRedisClient();
  redisClient.del(JSON.stringify(hashKey));
}
