// mobile/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const MESSAGES_KEY_PREFIX = 'messages_'; // per client
const LATEST_CLIENT_KEY = 'latest_client';

/**
 * Store an incoming client message locally.
 * @param {string} clientId
 * @param {string} text
 */
export async function storeIncomingMessage(clientId, text) {
  if (!clientId) return;
  const key = MESSAGES_KEY_PREFIX + clientId;
  const existing = await AsyncStorage.getItem(key);
  const msgs = existing ? JSON.parse(existing) : [];
  msgs.push({
    _id: Date.now().toString(),
    text,
    createdAt: new Date(),
    user: { _id: 2, name: 'Client' },
  });
  await AsyncStorage.setItem(key, JSON.stringify(msgs));
  // Update latest client reference
  await AsyncStorage.setItem(LATEST_CLIENT_KEY, clientId);
}

/** Retrieve all stored messages for a client */
export async function getMessages(clientId) {
  if (!clientId) return [];
  const key = MESSAGES_KEY_PREFIX + clientId;
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

/** Clear stored messages for a client */
export async function clearMessagesForClient(clientId) {
  if (!clientId) return;
  const key = MESSAGES_KEY_PREFIX + clientId;
  await AsyncStorage.removeItem(key);
}

/** Get the most recent client id that sent a query */
export async function getLatestClientId() {
  return await AsyncStorage.getItem(LATEST_CLIENT_KEY);
}
