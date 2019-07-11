const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');



router.get('*', githubController.getAccessToken,githubController.accessAPI)

module.exports = router;