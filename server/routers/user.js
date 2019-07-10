const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = require('../controllers/userController');
const schemaController = require('../controllers/schemaController');
const googleController = require('../controllers/googleController');

const pool = require('../controllers/database');

// prefixed with /auth
router.post('/login', userController.login, schemaController.getAllSchema, userController.setJwt);

router.post('/create', userController.createUser, userController.addUserToDB, userController.setJwt);

router.post('/verify', userController.checkJwt, (req, res) => {
    return res.status(200).json({ isLoggedIn: true })
})

router.get('/googleInit', googleController.getCode)
router.post('/googleAuth', googleController.getToken) //getTOken => login stuff
// router.post('/googleInit',
// go to google controller.getCode
//


module.exports = router;
