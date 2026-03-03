const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const promClient = require('prom-client');
const { register, dbQueryDuration } = require('./config/metrics');

const app = express();

// Create custom metrics
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const activeRequests = new promClient.Gauge({
  name: 'http_requests_active',
  help: 'Number of active HTTP requests'
});

// Register custom metrics
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDuration);
register.registerMetric(activeRequests);

// Middleware to track requests
app.use((req, res, next) => {
  if (req.path === '/metrics') return next();
  
  activeRequests.inc();
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestsTotal.inc({ method: req.method, route: route, status_code: res.statusCode });
    httpRequestDuration.observe({ method: req.method, route: route, status_code: res.statusCode }, duration);
    activeRequests.dec();
  });
  
  next();
});

app.use(cors());
app.use(express.json());

// Special endpoints
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use('/', authRoutes);
app.use('/emails', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`✅ Metrics: http://localhost:${PORT}/metrics`);
});

module.exports = { app, register };
