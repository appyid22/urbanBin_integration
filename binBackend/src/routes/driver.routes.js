const express = require('express');

const {
  list_drivers_controller,
  get_driver_by_id_controller,
  create_driver_controller,
  update_driver_controller,
  delete_driver_controller
} = require('../controllers/driver.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const {
  create_driver_schema,
  update_driver_schema,
  get_or_delete_driver_schema,
  list_drivers_schema
} = require('../validations/driver.validation');

const router = express.Router();

router.get('/', auth_middleware, request_validation_middleware(list_drivers_schema), async_handler(list_drivers_controller));
router.get('/:id', auth_middleware, request_validation_middleware(get_or_delete_driver_schema), async_handler(get_driver_by_id_controller));
router.post('/', auth_middleware, request_validation_middleware(create_driver_schema), async_handler(create_driver_controller));
router.put('/:id', auth_middleware, request_validation_middleware(update_driver_schema), async_handler(update_driver_controller));
router.delete('/:id', auth_middleware, request_validation_middleware(get_or_delete_driver_schema), async_handler(delete_driver_controller));

module.exports = router;
