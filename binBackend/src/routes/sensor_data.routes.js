const express = require('express');

const { create_sensor_data_controller } = require('../controllers/sensor_data.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const { create_sensor_data_schema } = require('../validations/sensor_data.validation');

const router = express.Router();

router.post('/', auth_middleware, request_validation_middleware(create_sensor_data_schema), async_handler(create_sensor_data_controller));

module.exports = router;
