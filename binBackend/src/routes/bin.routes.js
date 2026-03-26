const express = require('express');

const {
  list_bins_controller,
  get_bin_by_id_controller,
  create_bin_controller,
  update_bin_controller,
  delete_bin_controller
} = require('../controllers/bin.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const {
  create_bin_schema,
  update_bin_schema,
  get_or_delete_bin_schema,
  list_bins_schema
} = require('../validations/bin.validation');

const router = express.Router();

router.get('/', auth_middleware, request_validation_middleware(list_bins_schema), async_handler(list_bins_controller));
router.get('/:id', auth_middleware, request_validation_middleware(get_or_delete_bin_schema), async_handler(get_bin_by_id_controller));
router.post('/', auth_middleware, request_validation_middleware(create_bin_schema), async_handler(create_bin_controller));
router.put('/:id', auth_middleware, request_validation_middleware(update_bin_schema), async_handler(update_bin_controller));
router.delete('/:id', auth_middleware, request_validation_middleware(get_or_delete_bin_schema), async_handler(delete_bin_controller));

module.exports = router;
