import { clearHash } from '../services/cache';
import { NextFunction, Request, Response } from 'express';

export const cleanCache = async (req: Request, res: Response, next: NextFunction) => {
  await next();
  clearHash(req.user['id']);
};
