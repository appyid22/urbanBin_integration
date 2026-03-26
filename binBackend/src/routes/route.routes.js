const express = require('express');

const {
  list_routes_controller,
  get_route_by_id_controller,
  create_route_controller,
  delete_route_controller
} = require('../controllers/route.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const {
  create_route_schema,
  get_or_delete_route_schema,
  list_routes_schema
} = require('../validations/route.validation');

const router = express.Router();

router.get('/', auth_middleware, request_validation_middleware(list_routes_schema), async_handler(list_routes_controller));
router.get('/:id', auth_middleware, request_validation_middleware(get_or_delete_route_schema), async_handler(get_route_by_id_controller));
router.post('/', auth_middleware, request_validation_middleware(create_route_schema), async_handler(create_route_controller));
router.delete('/:id', auth_middleware, request_validation_middleware(get_or_delete_route_schema), async_handler(delete_route_controller));

module.exports = router;
