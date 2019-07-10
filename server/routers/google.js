const express = require('express');
const router = express.Router();
const googleController = require('../controllers/googleController');
const userController = require('../controllers/userController')

// prefix with google
router.get('/googleInit', googleController.getCode)
router.get('/googleOAuth', googleController.getToken, googleController.getEmail, userController.addUserToDB,
userController.setJwt)

module.exports = router;