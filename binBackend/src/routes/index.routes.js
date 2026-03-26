const express = require('express');
const { health_check_controller } = require('../controllers/health.controller');
const auth_routes = require('./auth.routes');
const bin_routes = require('./bin.routes');
const sensor_data_routes = require('./sensor_data.routes');
const alert_routes = require('./alert.routes');
const vehicle_routes = require('./vehicle.routes');
const driver_routes = require('./driver.routes');
const location_routes = require('./location.routes');
const route_routes = require('./route.routes');
const analytics_routes = require('./analytics.routes');
const complaint_routes = require('./complaint.routes');

const router = express.Router();

router.get('/health', health_check_controller);
router.use('/auth', auth_routes);
router.use('/bins', bin_routes);
router.use('/sensor-data', sensor_data_routes);
router.use('/alerts', alert_routes);
router.use('/vehicles', vehicle_routes);
router.use('/drivers', driver_routes);
router.use('/locations', location_routes);
router.use('/routes', route_routes);
router.use('/analytics', analytics_routes);
router.use('/complaints', complaint_routes);

module.exports = router;
