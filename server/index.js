// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

// Enable CORS so the web portfolio chatbot can call the API
app.use(cors({
  origin: '*', // In production, restrict to your domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'X-Owner-Token'],
}));

app.use(express.json());
app.use('/api', routes);

// Serve Admin Dashboard web app
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`💻 Admin Dashboard available at http://localhost:${PORT}/admin`);
  console.log(`📱 Mobile app can connect at http://<YOUR_IP>:${PORT}`);
});
