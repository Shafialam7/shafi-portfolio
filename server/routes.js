// server/routes.js (updated to include owner token endpoint)
require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('./db');
const { sendPushToOwner, sendPushToClient } = require('./notifications');
const { setOwnerPushToken, getOwnerPushToken } = require('./ownerTokens');

// Middleware to check owner token for protected routes
function checkOwner(req, res, next) {
  const token = req.headers['x-owner-token'];
  const expectedToken = process.env.OWNER_TOKEN || 'super-secret-owner-token';
  if (!token || token !== expectedToken) {
    return res.status(403).json({ error: 'Invalid owner token' });
  }
  next();
}

const { generateAIResponse } = require('./aiAssistant');

/**
 * POST /api/query
 * Body: { clientId, message, clientPushToken }
 * Stores the client query, generates & stores AI reply, and notifies the owner.
 */
router.post('/query', async (req, res) => {
  const { clientId, message, clientPushToken } = req.body;
  if (!clientId || !message) {
    return res.status(400).json({ error: 'clientId and message required' });
  }
  try {
    // 1. Save visitor query into database
    await db.addMessage({ clientId, direction: 'query', content: message });

    // 2. Generate smart AI response & save to database
    const aiReply = generateAIResponse(message);
    await db.addMessage({ clientId, direction: 'reply', content: aiReply });

    // Notify owner if push token stored
    const ownerToken = getOwnerPushToken();
    if (ownerToken) {
      await sendPushToOwner(ownerToken, `New query from ${clientId}`, message);
    }
    if (clientPushToken) {
      clientTokens[clientId] = clientPushToken;
    }
    res.json({ success: true, reply: aiReply });
  } catch (err) {
    console.error('Error handling query:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/** In‑memory map of clientId -> push token */
const clientTokens = {};

/**
 * POST /api/reply
 * Headers: X-Owner-Token (secret)
 * Body: { clientId, reply }
 * Stores the reply and forwards it to the original client.
 */
router.post('/reply', checkOwner, async (req, res) => {
  const { clientId, reply } = req.body;
  if (!clientId || !reply) {
    return res.status(400).json({ error: 'clientId and reply required' });
  }
  try {
    await db.addMessage({ clientId, direction: 'reply', content: reply });
    const pushToken = clientTokens[clientId];
    if (pushToken) {
      await sendPushToClient(pushToken, 'Reply from Shafi', reply);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error handling reply:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /api/history/:clientId
 * Endpoint to retrieve full conversation history for a client.
 */
router.get('/history/:clientId', async (req, res) => {
  const { clientId } = req.params;
  try {
    const msgs = await db.getMessagesByClient(clientId);
    res.json({ messages: msgs });
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /api/owner-token
 * Body: { token }
 * Stores the owner's Expo push token (no auth – only called from the mobile app after registration).
 */
router.post('/owner-token', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'token required' });
  }
  setOwnerPushToken(token);
  res.json({ success: true });
});

/**
 * GET /api/clients
 * Owner‑only endpoint to retrieve all distinct clients with last message info.
 */
router.get('/clients', checkOwner, async (req, res) => {
  try {
    const clients = await db.getAllClients();
    res.json({ clients });
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * DELETE /api/clients/:clientId
 * Owner‑only endpoint to delete a client and all their message history.
 */
router.delete('/clients/:clientId', checkOwner, async (req, res) => {
  const { clientId } = req.params;
  try {
    const deletedCount = await db.deleteClient(clientId);
    res.json({ success: true, deletedCount });
  } catch (err) {
    console.error('Error deleting client:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * DELETE /api/messages/:messageId
 * Owner‑only endpoint to delete a single message by ID.
 */
router.delete('/messages/:messageId', checkOwner, async (req, res) => {
  const { messageId } = req.params;
  try {
    const deletedCount = await db.deleteMessage(messageId);
    res.json({ success: true, deletedCount });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
