import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { keys as CIKeys } from './ci';

export const keys = process.env.NODE_ENV === 'ci' ?
    CIKeys
    :
    {
        googleClientID: process.env.GOOGLE_CLIENT_ID as string,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        mongoURI: process.env.MONGO_URI as string,
        cookieKey: process.env.COOKIE_KEY as string,
        redisURL: process.env.REDIS_URL as string,
        accessKeyId: process.env.ACCESS_KEY_ID as string,
        secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
        nodeENV: process.env.NODE_ENV as string
    }

console.log({ keys })