/**
 * @module Router/route
 */

import express from 'express';
import { authRoute } from './authRoutes';
import { blogRoute } from './blogRoutes';

export class Routes {
    public static init(app: express.Application): void {
        authRoute(app);
        blogRoute(app);
    }
}
