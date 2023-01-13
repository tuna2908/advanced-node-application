import express, { Request, Response } from 'express';

export const sysRoute = (app: express.Application) => {
    app.get('/ping', (req: Request, res: Response) => {
        res.status(200).send("PONG")
    });
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send("HELLO WORLD")
    });
};
