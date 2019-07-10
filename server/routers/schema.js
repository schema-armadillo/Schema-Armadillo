const express = require('express');

const router = express.Router();
const schemaController = require('../controllers/schemaController');
const userController = require('../controllers/userController')

// prefix with api

// save a new schema to database
router.post('/schema', userController.checkJwt, schemaController.createSchemaId, schemaController.createSchema, (req, res) => {
  let { schema_id } = res.locals;
  res.status(200).json({ schema_id });
});
router.delete('/schema', schemaController.deleteSchema);
router.put('/schema', schemaController.updateSchema);
// returns all stored schema for a specific user
router.get('/schema', schemaController.getAllSchema);
router.get('/schema/:schema_id', schemaController.getSchema);

module.exports = router;

