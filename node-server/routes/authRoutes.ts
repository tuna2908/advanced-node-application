import passport from 'passport'
import express, { Request, Response } from 'express';

export const authRoute = (app: express.Application) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/blogs');
    }
  );

  app.get('/auth/logout', (req: Request, res: Response) => {
    req.logout(() => { });
    res.redirect('/');
  });

  app.get('/api/current_user', (req: Request, res: Response) => {
    console.log({ user: req.user })
    res.send(req.user);
  });
};
