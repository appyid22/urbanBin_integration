const Joi = require('joi');

const create_route_schema = Joi.object({
  body: Joi.object({
    vehicle_id: Joi.number().integer().positive().required(),
    driver_id: Joi.number().integer().positive().required(),
    total_distance: Joi.number().positive().required(),
    created_at: Joi.date().iso().optional()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

const get_or_delete_route_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const list_routes_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  create_route_schema,
  get_or_delete_route_schema,
  list_routes_schema
};
