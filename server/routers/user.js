const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const schemaController = require('../controllers/schemaController')


// prefixed with /auth
////////////////////////////////////////////////////////////////////////////////////
/////////////                       ROUTES HERE                        /////////////
////////////////////////////////////////////////////////////////////////////////////
router.post('/login', userController.login, schemaController.getAllSchema, userController.setJwt);

router.post('/create', userController.createUser, userController.addUserToDB, userController.setJwt);

router.post('/verify', userController.checkJwt, (req, res) => {
    return res.status(200).json({ isLoggedIn: true })
})

module.exports = router;
