const Joi = require('@hapi/joi');
const level_id = Joi.number().required();

module.exports.getLevelIDSchema = Joi.object().keys({
  level_id,
});
