const express = require('express');

const router = express.Router();
const schemaController = require('../controllers/schemaController');

// prefix with api
console.log('routed to schema file');
router.post('/schema', schemaController.createSchemaId, schemaController.createSchema, (req, res) => {
  res.status(200).send('Schema added to DB.');
});
router.delete('/schema', schemaController.deleteSchema);
router.put('/schema', schemaController.updateSchema);
// returns all stored schema for a specific user
router.post('/schema/all', schemaController.getAllSchema);

module.exports = router;
