const Joi = require('@hapi/joi');
const skip = Joi.string();
const limit = Joi.string();
const product_id = Joi.string().required();
const product_name = Joi.string().required();
const product_amount = Joi.number().required();
const product_price = Joi.number().required();
const product_image = Joi.string().required();

module.exports.createProductSchema = Joi.object().keys({
  product_name,
  product_amount,
  product_price,
  product_image,
});

module.exports.getAllProductSchema = Joi.object().keys({
  skip,
  limit,
});

module.exports.purchaseProductSchema = Joi.object().keys({
  product_id,
});
