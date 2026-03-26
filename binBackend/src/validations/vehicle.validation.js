const Joi = require('joi');

const create_vehicle_schema = Joi.object({
  body: Joi.object({
    vehicle_type: Joi.string().required(),
    capacity: Joi.number().integer().positive().required(),
    is_ev: Joi.boolean().required(),
    status: Joi.string().required(),
    driver_id: Joi.number().integer().positive().optional()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

const update_vehicle_schema = Joi.object({
  body: Joi.object({
    vehicle_type: Joi.string().optional(),
    capacity: Joi.number().integer().positive().optional(),
    is_ev: Joi.boolean().optional(),
    status: Joi.string().optional(),
    driver_id: Joi.number().integer().positive().optional()
  }).min(1).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const get_vehicle_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const list_vehicle_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  create_vehicle_schema,
  update_vehicle_schema,
  get_vehicle_schema,
  list_vehicle_schema
};
