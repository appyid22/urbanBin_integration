const Joi = require('joi');

const analytics_kpi_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

const analytics_trends_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  analytics_kpi_schema,
  analytics_trends_schema
};
