/**
 * @module Router/route
 */

import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import { authRoute } from './authRoutes';
import { blogRoute } from './blogRoutes';
import { sysRoute } from './system';
import { keys } from '../credentials/keys';
import CookieSession from 'cookie-session';
import { uploadImgRoute } from './uploadRoutes';


export class Routes {
    public static init(app: express.Application): void {

        app.use(bodyParser.json());
        app.use(
            CookieSession({
                maxAge: 30 * 24 * 60 * 60 * 1000,
                keys: [keys.cookieKey]
            })
        );
        app.use(passport.initialize());
        app.use(passport.session());

        authRoute(app);
        blogRoute(app);
        uploadImgRoute(app);
        sysRoute(app);
    }
}
