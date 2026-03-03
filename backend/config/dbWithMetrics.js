const pool = require('./db');
const { dbQueryDuration } = require('./metrics');

const originalQuery = pool.query;

pool.query = async function(text, params) {
  const start = Date.now();
  const operation = text.trim().split(' ')[0].toUpperCase();
  const table = text.match(/FROM|INTO|UPDATE\s+(\w+)/i)?.[1] || 'unknown';
  
  try {
    const result = await originalQuery.call(this, text, params);
    return result;
  } finally {
    const duration = (Date.now() - start) / 1000;
    try {
      dbQueryDuration.observe({ operation, table }, duration);
    } catch (e) {
      console.error('Error recording metric:', e.message);
    }
    
    if (duration > 1) {
      console.warn(`⚠️ Slow query: ${operation} on ${table} took ${duration}s`);
    }
  }
};

module.exports = pool;
