const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// prefixed with /user
router.get('/login', (req, res, next) => {
  res.status(200).json({ message: 'OK' });
});

router.post('/create', userController.createUser, (req, res, next) => {
  res.status(200).json({ message: 'OK' });
});

module.exports = router;
