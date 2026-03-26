const express = require('express');

const {
  list_locations_controller,
  get_location_by_id_controller,
  create_location_controller,
  update_location_controller,
  delete_location_controller
} = require('../controllers/location.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const {
  create_location_schema,
  update_location_schema,
  get_or_delete_location_schema,
  list_locations_schema
} = require('../validations/location.validation');

const router = express.Router();

router.get('/', auth_middleware, request_validation_middleware(list_locations_schema), async_handler(list_locations_controller));
router.get('/:id', auth_middleware, request_validation_middleware(get_or_delete_location_schema), async_handler(get_location_by_id_controller));
router.post('/', auth_middleware, request_validation_middleware(create_location_schema), async_handler(create_location_controller));
router.put('/:id', auth_middleware, request_validation_middleware(update_location_schema), async_handler(update_location_controller));
router.delete('/:id', auth_middleware, request_validation_middleware(get_or_delete_location_schema), async_handler(delete_location_controller));

module.exports = router;
