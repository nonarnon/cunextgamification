const Joi = require('@hapi/joi');
const constants = require('../constants');
const { response } = require('express');

const validateObjectSchema = (data, schema) => {
  const { error } = schema.validate(data, { convert: false });
  if (error) {
    const errorDetails = error.details.map((value) => ({
      error: value.message,
      path: value.path,
    }));
    console.log('error Details: ', errorDetails);
    return errorDetails;
  }
  return null;
};

module.exports.validationBody = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.body, schema);
    if (error) {
      response.body = error;
      response.message = constants.requestValidationMessage.BAD_REQUEST;
      return res.status(response.status).send(response);
    }
    return next();
  };
};

module.exports.validateQueryParams = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.query, schema);
    if (error) {
      response.body = error;
      response.message = constants.requestValidationMessage.BAD_REQUEST;
      return res.status(response.status).send(response);
    }
    return next();
  };
};
