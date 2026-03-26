const Joi = require('joi');

const login_schema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

const signup_schema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'operator').optional()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  login_schema,
  signup_schema
};
