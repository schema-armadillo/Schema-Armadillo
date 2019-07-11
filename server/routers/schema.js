const express = require('express');

const router = express.Router();
const schemaController = require('../controllers/schemaController');
const userController = require('../controllers/userController')

// prefix with api

// save a new schema to database
router.post('/schema', userController.checkJwt, schemaController.checkDuplicate, schemaController.createSchema);
router.delete('/schema', schemaController.deleteSchema);;
// returns all stored schema for a specific user
router.get('/schema', schemaController.getAllSchema);
router.get('/schema/:schema_name', schemaController.getSchema);

module.exports = router;

