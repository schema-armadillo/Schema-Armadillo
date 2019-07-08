const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');
const pool = require('../controllers/database');

// prefixed with /auth
router.post('/login', userController.login, userController.setJwt);

router.post('/create', userController.createUser, userController.addUserToDB, userController.setJwt);

router.post('/verify', userController.checkJwt)

module.exports = router;
