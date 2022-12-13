const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const cors = require('cors');


// Create Express Server
const app = express();

// Enable CORS
app.use(cors());

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:9200/kibana_sample_data_logs/_search/";

// Logging
app.use(morgan('dev'));

// Proxy endpoints
app.use('/api', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
      [`^/api`]: '',
  },
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
