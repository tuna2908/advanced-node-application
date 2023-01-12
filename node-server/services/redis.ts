import "reflect-metadata";
import redis, { RedisClientType } from 'redis'
import { keys } from "../credentials/keys";

export class RedisService {
    _redisClient: RedisClientType

    private static instance: RedisService;

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }

        return RedisService.instance;
    }

    async init(): Promise<void> {
        try {
            this._redisClient = await redis.createClient({ url: keys.redisURL });
        } catch (error) {
            console.error(error);
        }
    }
}
