const Joi = require('joi');

const list_alerts_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

const alerts_by_bin_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({
    bin_id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const update_alert_schema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('RESOLVED', 'PENDING').required()
  }).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

module.exports = {
  list_alerts_schema,
  alerts_by_bin_schema,
  update_alert_schema
};
