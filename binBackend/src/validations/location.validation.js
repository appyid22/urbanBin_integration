const Joi = require('joi');

const create_location_schema = Joi.object({
  body: Joi.object({
    area_name: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

const update_location_schema = Joi.object({
  body: Joi.object({
    area_name: Joi.string().optional(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional()
  }).min(1).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const get_or_delete_location_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({
    id: Joi.number().integer().positive().required()
  }).required(),
  query: Joi.object({}).required()
});

const list_locations_schema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  create_location_schema,
  update_location_schema,
  get_or_delete_location_schema,
  list_locations_schema
};
