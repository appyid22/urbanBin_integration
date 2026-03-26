const Joi = require('joi');

const bin_payload_schema = Joi.object({
  location_id: Joi.number().integer().positive(),
  capacity: Joi.number().integer().positive(),
  current_fill: Joi.number().integer().min(0),
  last_updated: Joi.date().iso(),
  status: Joi.string().valid('FULL', 'NORMAL')
});

const create_bin_schema = Joi.object({
  body: Joi.object({
    location_id: Joi.number().integer().positive().required(),
    capacity: Joi.number().integer().positive().required(),
    current_fill: Joi.number().integer().min(0).required(),
    last_updated: Joi.date().iso().optional(),
    status: Joi.string().valid('FULL', 'NORMAL').optional()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

const update_bin_schema = Joi.object({
  body: bin_payload_schema.min(1).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const get_or_delete_bin_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const list_bins_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  create_bin_schema,
  update_bin_schema,
  get_or_delete_bin_schema,
  list_bins_schema
};
