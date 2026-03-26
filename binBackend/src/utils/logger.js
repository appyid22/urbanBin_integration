function write_log(level, message, metadata = {}) {
  const timestamp = new Date().toISOString();
  const log_payload = {
    timestamp,
    level,
    message,
    ...metadata
  };

  process.stdout.write(`${JSON.stringify(log_payload)}\n`);
}

const logger = {
  info: (message, metadata) => write_log('info', message, metadata),
  warn: (message, metadata) => write_log('warn', message, metadata),
  error: (message, metadata) => write_log('error', message, metadata)
};

const stream = {
  write: (message) => {
    write_log('http', message.trim());
  }
};

module.exports = {
  logger,
  stream
};
