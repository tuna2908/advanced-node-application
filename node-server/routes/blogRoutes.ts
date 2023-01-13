import mongoose from 'mongoose';
import '../services/cache';
import express, { Request, Response } from 'express';
import { cleanCache, requireLogin } from '../middlewares';

export const blogRoute = (app: express.Application) => {
  const Blog = mongoose.model('Blog');

  app.get('/api/blogs/:id', requireLogin, async (req: Request, res: Response) => {
    const _user = req.user['id'];
    const { id: _id } = req.params;

    const blog = await Blog.findOne({ _user, _id });
    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req: Request, res: Response) => {
    const _user = req.user['id'];

    const blogs = await Blog.find({ _user })['cache']({ key: _user });  //caching data using override method from mongoose

    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, cleanCache, async (req: Request, res: Response) => {
    const { title, content, imageUrl } = req.body;
    const _user = req.user['id'];

    const blog = new Blog({
      imageUrl,
      title,
      content,
      _user
    });

    try {
      await blog.save();
      res.status(200).send(blog);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
