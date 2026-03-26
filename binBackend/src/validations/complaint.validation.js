const Joi = require('joi');

const create_complaint_schema = Joi.object({
  body: Joi.object({
    bin_id: Joi.alternatives().try(Joi.number().integer().positive(), Joi.string().pattern(/^\d+$/)).required(),
    description: Joi.string().min(3).required(),
    reported_by: Joi.string().optional()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  create_complaint_schema
};
