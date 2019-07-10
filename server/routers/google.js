const express = require('express');

const router = express.Router();
const googleController = require('../controllers/googleController');
const userController = require('../controllers/userController')

// prefix with google
console.log('routed to google file');
router.get('/googleInit', googleController.getCode)
router.post('/googleOAuth', googleController.getToken, googleController.getEmail)

module.exports = router;