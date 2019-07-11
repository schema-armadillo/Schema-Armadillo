const express = require('express');
const router = express.Router();

const github = require('../controllers/githubController');





// first github oauth route
router.get('*', github.getAccessToken, github.accessAPI, github.verifyUser, github.addUserToDB, github.setJwt, (req, res) => {
    if(process.env.NODE_ENV === 'development')
    return res.redirect('http://localhost:8080/')
    res.redirect('/')
})


// after gihub.verifyUser if the user exists run the route below

// existing github oauth route
router.get('*', github.login, github.setJwt, (req,res) => {
    if(process.env.NODE_ENV === 'development')
    return res.redirect('http://localhost:8080/')
    res.redirect('/')
})

module.exports = router;