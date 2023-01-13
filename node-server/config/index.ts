import express from 'express';
import { performance } from 'perf_hooks';
import { Routes } from '../routes';
import PasspostService from '../services/passport';
import { RedisService } from '../services/redis';

import { DBConfig } from './db.conf';

export class Config {
    public static async init(app: express.Application): Promise<express.Application> {
        try {
            let s = performance.now();
            let e = performance.now();

            s = performance.now();
            const _redisService = RedisService.getInstance();
            await _redisService.init();
            e = performance.now();
            console.info(`redis init ${e - s}`);


            s = performance.now();
            await DBConfig.init();
            e = performance.now();
            console.info(`DB init ${e - s}`);

            s = performance.now();
            const _ggPassportService = PasspostService.getInstance();
            _ggPassportService.init();
            e = performance.now();
            console.info(`GG init ${e - s}`);

            s = performance.now();
            Routes.init(app);
            e = performance.now();
            console.info(`router init ${e - s}`);

            return app;
        } catch (error) {
            console.error({ error });
        }
    }
}
