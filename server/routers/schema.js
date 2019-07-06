const express = require('express');

const router = express.Router();
const schemaController = require('../controllers/schemaController');

// prefix with api
console.log('routed to schema file');
router.post('/schema', schemaController.createSchema, (req, res) => {
  res.status(200).send('Schema added to DB.');
});

module.exports = router;
