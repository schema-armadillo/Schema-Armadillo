const express = require('express');

const router = express.Router();
const schemaController = require('../controllers/schemaController');
const userController = require('../controllers/userController')

// prefix with api
router.post('/schema', userController.checkJwt, schemaController.createSchemaId, schemaController.createSchema, (req, res) => {
  let { schema_id } = res.locals;
  res.status(200).json({ schema_id });
});
router.delete('/schema', schemaController.deleteSchema);
router.put('/schema', schemaController.updateSchema);
// returns all stored schema for a specific user
router.post('/schema/all', schemaController.getAllSchema);

module.exports = router;

