const router = require('express').Router();
const { User } = require('../db/models');

// matches GET requests to /api/users/
router.get('/', async (req, res, next) => {
  try {
    // get all users
    const users = await User.findAll({
      // we only need the userid and email
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    // passes error to the appropriate middleware
    next(err);
  }
});

/* --- Sample routes --- */

// // matches POST requests to /api/sample
// router.post('/', async (req, res, next) => {
//   try {
//     // perform action and send one response
//     res.send(null);
//   } catch (err) {
//     // passes error to the appropriate middleware
//     next(err);
//   }
// });

// // matches PUT requests to /api/sample/:sampleId
// router.put('/:sampleId', async (req, res, next) => {
//   try {
//     // perform action and send one response
//     res.send(null);
//   } catch (err) {
//     // passes error to the appropriate middleware
//     next(err);
//   }
// });

// // matches DELETE requests to /api/sample/:sampleId
// router.delete('/:sampleId', async (req, res, next) => {
//   try {
//     // perform action and send one response
//     res.send(null);
//   } catch (err) {
//     // passes error to the appropriate middleware
//     next(err);
//   }
// });

module.exports = router;
