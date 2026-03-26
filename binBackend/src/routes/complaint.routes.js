const express = require('express');

const { create_complaint_controller } = require('../controllers/complaint.controller');
const { auth_middleware } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');
const { request_validation_middleware } = require('../middlewares/request_validation.middleware');
const { async_handler } = require('../utils/async_handler');
const { create_complaint_schema } = require('../validations/complaint.validation');

const router = express.Router();

router.post('/', auth_middleware, upload.single('image'), request_validation_middleware(create_complaint_schema), async_handler(create_complaint_controller));

module.exports = router;
