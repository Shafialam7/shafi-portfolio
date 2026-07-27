// server/notifications.js
// Simple helper to send push notifications via Expo (or fallback to Firebase if needed).
// This implementation uses Expo's push notification service.
// For production, you may want to batch requests and handle rate limits.

const fetch = require('node-fetch');

// Expo push endpoint
const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

/**
 * Send a push notification to the owner's device.
 * @param {string} expoPushToken Owner's Expo push token (e.g., ExponentPushToken[xxxxxxxxxxxxxx])
 * @param {string} title Notification title
 * @param {string} body Notification body/message
 */
async function sendPushToOwner(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: { type: 'owner_notification' },
  };
  return await sendPush(message);
}

/**
 * Send a push notification to a client device.
 * @param {string} expoPushToken Client's Expo push token
 * @param {string} title Notification title
 * @param {string} body Notification body/message
 */
async function sendPushToClient(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: { type: 'client_reply' },
  };
  return await sendPush(message);
}

async function sendPush(message) {
  try {
    const response = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = await response.json();
    if (data.errors) {
      console.error('Push notification errors:', data.errors);
    }
    return data;
  } catch (err) {
    console.error('Failed to send push notification:', err);
    throw err;
  }
}

module.exports = { sendPushToOwner, sendPushToClient };
