const express = require('express');
const router = express.Router();
const { Blog } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { User } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const search = req.query.search;
  const where = search
    ? {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
        ],
      }
    : {};
  const blogs = await Blog.findAll({
    where,
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId === req.decodedToken.id) {
      await req.blog.destroy();
      res.status(204).end();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes += 1;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

module.exports = router;
