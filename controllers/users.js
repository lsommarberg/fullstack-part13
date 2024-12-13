const router = require('express').Router();

const { User } = require('../models');
const { Blog } = require('../models');
const { ReadingList } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  let read = {
    [Op.in]: [true, false],
  };

  const userId = req.params.id;
  if (req.query.read) {
    read = req.query.read === 'true';
  }
  const user = await User.findByPk(userId, {
    include: [
      {
        model: ReadingList,
        attributes: { exclude: ['userId', 'blogId'] },
        where: { read },
        include: {
          model: Blog,
          attributes: [
            'id',
            'author',
            'url',
            'title',
            'likes',
            'year',
            'createdAt',
            'updatedAt',
          ],
        },
      },
    ],
  });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.name = req.body.name || user.name;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
