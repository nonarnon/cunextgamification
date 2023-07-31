const Joi = require('@hapi/joi');
const username = Joi.string().required();
const password = Joi.string().required();
const email = Joi.string().email().required();
const status = Joi.string();

module.exports.createUserSchema = Joi.object().keys({
  username,
  password,
  email,
  status,
});

module.exports.getAllUserSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateUserSchema = Joi.object().keys({
  username,
  password,
  email,
  status,
});

module.exports.loginSchema = Joi.object().keys({
  username,
  password,
});
