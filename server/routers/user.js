const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const pool = require('../controllers/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// prefixed with /user
router.post('/login',userController.login)


router.post('/create', userController.createUser)


module.exports = router;
