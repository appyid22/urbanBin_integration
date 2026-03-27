const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');

const prisma = new PrismaClient({
  log: ['warn', 'error']
});

async function connect_db() {
  try {
    await prisma.$connect();
    console.log("✅ DB CONNECTED SUCCESSFULLY");
    logger.info('Database connected successfully');
  } catch (err) {
    console.error("❌ DB CONNECTION FAILED:", err);
  }
}

async function disconnect_db() {
  await prisma.$disconnect();
}

module.exports = {
  prisma,
  connect_db,
  disconnect_db
};
