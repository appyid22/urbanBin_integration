const Joi = require('joi');

const create_driver_schema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    license_number: Joi.string().required(),
    vehicle_id: Joi.number().integer().positive().required()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

const update_driver_schema = Joi.object({
  body: Joi.object({
    name: Joi.string().optional(),
    phone: Joi.string().optional(),
    license_number: Joi.string().optional(),
    vehicle_id: Joi.number().integer().positive().optional()
  }).min(1).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const get_or_delete_driver_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const list_drivers_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  create_driver_schema,
  update_driver_schema,
  get_or_delete_driver_schema,
  list_drivers_schema
};
