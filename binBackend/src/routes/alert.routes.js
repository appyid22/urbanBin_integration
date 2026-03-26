const express = require('express');

const {
  list_alerts_controller,
  get_alerts_by_bin_id_controller,
  update_alert_status_controller
} = require('../controllers/alert.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const {
  list_alerts_schema,
  alerts_by_bin_schema,
  update_alert_schema
} = require('../validations/alert.validation');

const router = express.Router();

router.get('/', auth_middleware, request_validation_middleware(list_alerts_schema), async_handler(list_alerts_controller));
router.get('/:bin_id', auth_middleware, request_validation_middleware(alerts_by_bin_schema), async_handler(get_alerts_by_bin_id_controller));
router.patch('/:id', auth_middleware, request_validation_middleware(update_alert_schema), async_handler(update_alert_status_controller));

module.exports = router;
