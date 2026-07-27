const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const routes = require('../../server/routes');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Owner-Token'],
}));

app.use(express.json());

// Mount API routes for all Netlify Functions path variants
app.use('/.netlify/functions/api', routes);
app.use('/api', routes);
app.use('/', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: 'netlify-serverless' });
});

module.exports.handler = serverless(app);
