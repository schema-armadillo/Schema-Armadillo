const express = require('express');

const router = express.Router();
const schemaController = require('../controllers/schemaController');

// prefix with api
console.log('routed to schema file');
router.post('/schema', schemaController.createSchema, (req, res) => {
  res.status(200).json({ result: 'Schema added to DB.' });
});
router.delete('/schema', schemaController.deleteSchema);
router.put('/schema', schemaController.updateSchema);

module.exports = router;
