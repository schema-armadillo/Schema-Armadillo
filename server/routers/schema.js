const express = require('express');
const router = express.Router();
const schemaController = require('../controllers/schemaController');

router.post('/schema', schemaController.createSchema);

module.exports = router;
