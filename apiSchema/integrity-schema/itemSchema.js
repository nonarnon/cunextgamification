const Joi = require('@hapi/joi');
const item_id = Joi.number().required();

module.exports.getItemIDSchema = Joi.object().keys({
  item_id,
});
