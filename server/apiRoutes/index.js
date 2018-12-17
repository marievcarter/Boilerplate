const router = require('express').Router();

// all sample-related routes here
router.use('/sample', require('./sample.js'));

// 404 handle all other requests
router.use((req, res, next) => {
  const err = new Error('Not Found.');
  err.status = 404;
  next(err);
});

module.exports = router;
