const express = require('express');

const router = express.Router();
const schemaController = require('../controllers/schemaController');

// prefix with api
router.post('/schema', schemaController.createSchema, (req, res) => {
  res.status(200).send('Schema added to DB.');
});

module.exports = router;
