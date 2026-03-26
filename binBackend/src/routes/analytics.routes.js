const express = require('express');

const { get_kpi_controller, get_trends_controller } = require('../controllers/analytics.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const { analytics_kpi_schema, analytics_trends_schema } = require('../validations/analytics.validation');

const router = express.Router();

router.get('/kpi', auth_middleware, request_validation_middleware(analytics_kpi_schema), async_handler(get_kpi_controller));
router.get('/trends', auth_middleware, request_validation_middleware(analytics_trends_schema), async_handler(get_trends_controller));

module.exports = router;
