const Joi = require('joi');

const create_sensor_data_schema = Joi.object({
  body: Joi.object({
    bin_id: Joi.number().integer().positive().required(),
    fill_level: Joi.number().integer().min(0).required(),
    temperature: Joi.number().required(),
    gas_level: Joi.number().required(),
    status: Joi.string().required(),
    timestamp: Joi.date().iso().optional()
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required()
});

module.exports = {
  create_sensor_data_schema
};
