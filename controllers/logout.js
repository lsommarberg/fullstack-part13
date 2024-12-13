const router = require('express').Router();

const Session = require('../models/session');
const { tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, async (request, response) => {
  const token = request.token;
  await Session.destroy({
    where: {
      token: token,
    },
  });
  response.status(204).end();
});

module.exports = router;
