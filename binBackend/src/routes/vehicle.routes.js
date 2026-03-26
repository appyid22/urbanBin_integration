const express = require('express');

const {
  list_vehicles_controller,
  get_vehicle_by_id_controller,
  create_vehicle_controller,
  update_vehicle_controller
} = require('../controllers/vehicle.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const {
  create_vehicle_schema,
  update_vehicle_schema,
  get_vehicle_schema,
  list_vehicle_schema
} = require('../validations/vehicle.validation');

const router = express.Router();

router.get('/', auth_middleware, request_validation_middleware(list_vehicle_schema), async_handler(list_vehicles_controller));
router.get('/:id', auth_middleware, request_validation_middleware(get_vehicle_schema), async_handler(get_vehicle_by_id_controller));
router.post('/', auth_middleware, request_validation_middleware(create_vehicle_schema), async_handler(create_vehicle_controller));
router.put('/:id', auth_middleware, request_validation_middleware(update_vehicle_schema), async_handler(update_vehicle_controller));

module.exports = router;
