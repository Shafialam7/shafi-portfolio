// mobile/utils/api.js
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3001';

/**
 * Sends the Expo push token of the owner device to the backend so it can be used for notifications.
 * @param {string} token Expo push token
 */
export async function setOwnerPushToken(token) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/owner-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('Failed to set owner token:', data);
    }
    return data;
  } catch (err) {
    console.error('Error setting owner token:', err);
  }
}

/**
 * Sends a reply from the owner to a specific client.
 * @param {string} clientId Identifier of the client (e.g., phone or email)
 * @param {string} reply Message content
 */
export async function sendReply(clientId, reply) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The secret token must match SERVER .env OWNER_TOKEN
        'X-Owner-Token': process.env.EXPO_PUBLIC_OWNER_TOKEN || '',
      },
      body: JSON.stringify({ clientId, reply }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('Failed to send reply:', data);
    }
    return data;
  } catch (err) {
    console.error('Error sending reply:', err);
  }
}

/**
 * Retrieves the full chat history for a given client.
 * @param {string} clientId
 */
export async function fetchHistory(clientId) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/history/${clientId}`, {
      method: 'GET',
      headers: {
        'X-Owner-Token': process.env.EXPO_PUBLIC_OWNER_TOKEN || '',
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('Failed to fetch history:', data);
    }
    return data.messages || [];
  } catch (err) {
    console.error('Error fetching history:', err);
    return [];
  }
}

/**
 * Retrieves all distinct clients with their last message info.
 * Used to populate the conversation list screen.
 */
export async function fetchAllClients() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/clients`, {
      method: 'GET',
      headers: {
        'X-Owner-Token': process.env.EXPO_PUBLIC_OWNER_TOKEN || '',
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('Failed to fetch clients:', data);
      return [];
    }
    return data.clients || [];
  } catch (err) {
    console.error('Error fetching clients:', err);
    return [];
  }
}

