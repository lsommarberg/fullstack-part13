const express = require('express');
const router = express.Router();
const { Blog } = require('../models');

const { User } = require('../models');
const { ReadingList } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body;

  const blog = await Blog.findByPk(blogId);
  const user = await User.findByPk(userId);

  if (!blog || !user) {
    return res.status(404).json({ error: 'Blog or User not found' });
  }
  const readingListEntry = await ReadingList.create({
    userId: userId,
    blogId: blogId,
    read: false,
  });

  res.status(201).json(readingListEntry);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const { read } = req.body;
  const readingListEntry = await ReadingList.findByPk(req.params.id);

  if (!readingListEntry) {
    return res.status(404).json({ error: 'ReadingList not found' });
  }

  const user = await User.findByPk(req.decodedToken.id);
  if (!user || readingListEntry.userId !== user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  readingListEntry.read = read;
  await readingListEntry.save();
  res.json(readingListEntry);
});

module.exports = router;
