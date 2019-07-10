const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');
const userController = require('../controllers/userController');

router.get('/',
  githubController.getCode,
  githubController.postCode,
  githubController.getEmail,
  userController.addUserToDB,
  userController.setJwt,
  userController.redirectToRoot);

module.exports = router;
