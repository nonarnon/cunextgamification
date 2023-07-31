const Joi = require('@hapi/joi');
const skip = Joi.string();
const limit = Joi.string();
const player_name = Joi.string().required();
const player_character = Joi.string().required();
const player_head = Joi.string().required();
const player_top = Joi.string().required();
const player_bottom = Joi.string().required();
const player_score = Joi.number();
const player_coin = Joi.number();
const player_star = Joi.number();

module.exports.registerSchema = Joi.object().keys({
  player_name,
  player_character,
  player_head,
  player_top,
  player_bottom,
});

module.exports.getAllPlayerSchema = Joi.object().keys({
  skip,
  limit,
});

module.exports.getRankSchema = Joi.object().keys({
  skip,
  limit,
});

module.exports.updatePlayerSchema = Joi.object().keys({
  player_name,
  player_character,
  player_head,
  player_top,
  player_bottom,
  player_score,
  player_coin,
  player_star,
});

module.exports.getPlayerNameSchema = Joi.object().keys({
  player_name,
});
