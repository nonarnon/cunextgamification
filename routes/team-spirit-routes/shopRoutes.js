const express = require('express');
const router = express.Router();
const shopController = require('../../controller/team-spirit-controller/shopController');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');
const shopSchema = require('../../apiSchema/team-spirit-schema/shopSchema');

// creat product
router.post(
  '/create',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(shopSchema.createProductSchema),
  shopController.createProduct
);

// get all products
router.get(
  '/products',
  tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(shopSchema.getAllProductSchema),
  shopController.getAllProducts
);

// purchase product
router.put(
  '/purchase',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(shopSchema.purchaseProductSchema),
  shopController.purchaseProduct
);

module.exports = router;
