const express = require('express');
const router = express.Router();
const itemController = require('../../controller/integrity-controller/itemController');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');
const itemSchema = require('../../apiSchema/integrity-schema/itemSchema');

// get all  items
router.get('/', tokenValidation.validateToken, itemController.getItems);

// collect items, update stars
router.put(
  '/collect',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(itemSchema.getItemIDSchema),
  itemController.collectItem
);

module.exports = router;
