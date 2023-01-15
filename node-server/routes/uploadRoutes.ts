
import AWS from 'aws-sdk';
import crypto from 'crypto';
import express from 'express';
import { keys } from '../credentials/keys';
import { requireLogin } from '../middlewares';


export const uploadImgRoute = (app: express.Application) => {
    const s3 = new AWS.S3({
        accessKeyId: keys.accessKeyId,
        secretAccessKey: keys.secretAccessKey
    });

    app.get('/api/upload', requireLogin, (req, res) => {
        const key = `${req.user['id']}/${crypto.randomUUID()}.jpeg`;
        s3.getSignedUrl(
            'putObject',
            {
                Bucket: keys.S3BucketName,
                ContentType: 'image/jpeg',
                Key: key
            },
            (err, url) => res.send({ key, url })
        );
    });
};
