const express = require('express');
const router = express.Router();

const github = require('../controllers/githubController');
const user = require('../controllers/userController');
const schema = require('../controllers/schemaController')





// first github oauth route
router.get('*', github.getAccessToken, github.accessAPI, github.verifyUser, user.addUserToDB, github.setJwt, (req, res) => res.redirect('http://localhost:8080/'))


// after gihub.verifyUser if the user exists run the route below

// existing github oauth route
router.get('*', github.login, schema.getAllSchema, github.setJwt, (req,res) => res.redirect('http://localhost:8080/'))

module.exports = router;