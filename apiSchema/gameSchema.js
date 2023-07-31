const Joi = require('@hapi/joi');
const game_type_id = Joi.number().required();
const game_type_name = Joi.string().required();
const game_name = Joi.string().required();
const game_cover = Joi.string().required();
const game_url = Joi.string().required();

module.exports.createGameTypeSchema = Joi.object().keys({
  game_type_id,
  game_type_name,
});

module.exports.createGameSchema = Joi.object().keys({
  game_name,
  game_type_id,
  game_cover,
  game_url,
});

module.exports.getAllGameSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});
