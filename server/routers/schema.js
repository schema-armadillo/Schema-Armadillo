const express = require('express');
const router = express.Router();
const schemaController = require('../controllers/schemaController');

router.post('/schema', schemaController.createSchema);
router.delete('/schema', schemaController.deleteSchema);
router.put('/schema', schemaController.updateSchema);

module.exports = router;
