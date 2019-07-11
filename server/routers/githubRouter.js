const express = require('express');
const router = express.Router();

const github = require('../controllers/githubController');
const user = require('../controllers/userController');
const schema = require('../controllers/schemaController')





// first github oauth route
router.get('*', github.getAccessToken,github.accessAPI, github.verifyUser, user.addUserToDB, (req, res) => res.send(`normal case ${res.locals.username}`))


// existing github oauth route
router.get('*', github.login, schema.getAllSchema, user.setJwt)
//  , (req,res) => res.send('login successful'))

module.exports = router;