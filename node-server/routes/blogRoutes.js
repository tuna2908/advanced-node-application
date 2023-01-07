import mongoose from 'mongoose';
import { requireLogin } from '../middlewares/requireLogin';
import { cleanCache } from '../middlewares/cleanCache';
import '../services/cache';

export const blogRoute = app => {
  const Blog = mongoose.model('Blog');

  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    console.log({ _user: req.user.id })
    const blogs = await Blog.find({ _user: req.user.id }).cache({ key: req.user.id });  //caching data using override method from mongoose

    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, cleanCache, async (req, res) => {
    const { title, content, imageUrl } = req.body;

    const blog = new Blog({
      imageUrl,
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
