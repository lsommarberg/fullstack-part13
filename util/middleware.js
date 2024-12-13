const { ValidationError } = require('sequelize');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Session } = require('../models');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    try {
      const decodedToken = jwt.verify(token, SECRET);
      const session = await Session.findOne({ where: { token } });

      if (!session) {
        return res.status(401).json({ error: 'token invalid or expired' });
      }
      req.token = token;
      req.decodedToken = decodedToken;
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err instanceof ValidationError) {
    const errorMessages = err.errors.map((e) => e.message);
    return res.status(400).json({ errors: errorMessages });
  }

  res.status(500).json({ error: 'An internal server error occurred' });
};

module.exports = { errorHandler, tokenExtractor };
