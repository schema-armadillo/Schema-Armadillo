const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');
const schemaController = require('../controllers/schemaController')
const pool = require('../controllers/database');

// prefixed with /auth
router.post('/login', userController.login, schemaController.getAllSchema, userController.setJwt);

router.post('/create', userController.createUser, userController.addUserToDB, userController.setJwt);

router.post('/verify', userController.checkJwt, (req, res) => {
    return res.status(200).json({ isLoggedIn: true })
})

router.post('/googleAuth', (req, res) => res.status(200).send("GOOGLE AUTH PAGE"))

module.exports = router;
