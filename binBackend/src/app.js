const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { env } = require('./config/env');
const { stream } = require('./utils/logger');
const index_routes = require('./routes/index.routes');
const { not_found_middleware } = require('./middlewares/not_found.middleware');
const { error_handler_middleware } = require('./middlewares/error_handler.middleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

if (env.node_env !== 'test') {
  app.use(morgan('combined', { stream }));
}

app.use('/api/v1', index_routes);

app.use(not_found_middleware);
app.use(error_handler_middleware);

module.exports = app;
