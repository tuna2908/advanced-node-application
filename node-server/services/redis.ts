import "reflect-metadata";
import { RedisClientType, createClient } from 'redis'
import { keys } from "../credentials/keys";

export class RedisService {
    private _redisClient: RedisClientType

    private static instance: RedisService;

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }

        return RedisService.instance;
    }

    async init(): Promise<void> {
        try {
            this._redisClient = await createClient({ url: keys.redisURL });
            this._redisClient.connect();
        } catch (error) {
            console.error(error);
        }
    }

    getRedisClient(): RedisClientType {
        return this._redisClient;
    }
}
