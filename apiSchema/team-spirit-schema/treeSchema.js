const Joi = require('@hapi/joi');
const tree_id = Joi.string().required();

module.exports.getTreeIDSchema = Joi.object().keys({
  tree_id,
});
