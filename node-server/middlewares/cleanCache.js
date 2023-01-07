import { clearHash } from '../services/cache';

export const cleanCache = async (req, res, next) => {
  await next();
  clearHash(req.user.id);
};
