// server/db.js
const path = require('path');
const os = require('os');
const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
const { Redis } = require('@upstash/redis');

let sqlite3 = null;
try {
  sqlite3 = require('sqlite3').verbose();
} catch (e) {
  console.log('ℹ️ Running in Serverless mode without native sqlite3 binary');
}

// Dedicated persistent Cloud Store URL for Netlify & Production Deployment
const CLOUD_STORE_URL = 'https://api.restful-api.dev/objects/ff8081819f7e10ae019fa584827735e3';

// Detect Cloud DB provider environment variables if configured
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let supabase = null;
let redis = null;

if (supabaseUrl && supabaseKey) {
  console.log('⚡ Connected to Supabase Cloud Database');
  supabase = createSupabaseClient(supabaseUrl, supabaseKey);
} else if (upstashUrl && upstashToken) {
  console.log('⚡ Connected to Upstash Redis Cloud Database');
  redis = new Redis({ url: upstashUrl, token: upstashToken });
}

// Fallback Local SQLite DB setup if sqlite3 module is available
let db = null;
if (sqlite3) {
  const dbPath = path.join(os.tmpdir(), 'messages.db');
  db = new sqlite3.Database(dbPath, () => {});
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id TEXT NOT NULL,
        direction TEXT CHECK(direction IN ('query','reply')) NOT NULL,
        content TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )
    `);
  });
}

// Helper for Persistent Cloud Storage
async function getCloudStoreMessages() {
  try {
    const res = await fetch(CLOUD_STORE_URL);
    if (!res.ok) return [];
    const json = await res.json();
    return (json && json.data && Array.isArray(json.data.messages)) ? json.data.messages : [];
  } catch (err) {
    console.error('Error reading Cloud Store:', err);
    return [];
  }
}

async function saveCloudStoreMessages(messages) {
  try {
    await fetch(CLOUD_STORE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'shafi_portfolio_messages',
        data: { messages }
      })
    });
  } catch (err) {
    console.error('Error saving to Cloud Store:', err);
  }
}

// Helper for Upstash Redis message list
async function getUpstashMessages() {
  if (!redis) return [];
  const raw = await redis.get('portfolio_messages');
  if (!raw) return [];
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

async function saveUpstashMessages(msgs) {
  if (redis) {
    await redis.set('portfolio_messages', JSON.stringify(msgs));
  }
}

// Unified Database Interface
async function addMessage({ clientId, direction, content }) {
  const timestamp = Date.now();

  // 1. Supabase Cloud DB
  if (supabase) {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ client_id: clientId, direction, content, timestamp }])
      .select('id');
    if (error) throw error;
    return data && data[0] ? data[0].id : Date.now();
  }

  // 2. Upstash Redis Cloud DB
  if (redis) {
    const msgs = await getUpstashMessages();
    const newMsg = { id: Date.now(), client_id: clientId, direction, content, timestamp };
    msgs.push(newMsg);
    await saveUpstashMessages(msgs);
    return newMsg.id;
  }

  // 3. Persistent Cloud Store (Active for Netlify Functions)
  const msgs = await getCloudStoreMessages();
  const newMsg = { id: Date.now(), client_id: clientId, direction, content, timestamp };
  msgs.push(newMsg);
  await saveCloudStoreMessages(msgs);

  // Sync to local SQLite as local backup if available
  if (db) {
    db.run(
      `INSERT INTO messages (client_id, direction, content, timestamp) VALUES (?, ?, ?, ?)`,
      [clientId, direction, content, timestamp],
      () => {}
    );
  }

  return newMsg.id;
}

async function getMessagesByClient(clientId) {
  if (supabase) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('client_id', clientId)
      .order('timestamp', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  if (redis) {
    const msgs = await getUpstashMessages();
    return msgs
      .filter((m) => m.client_id === clientId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  // Always check Persistent Cloud Store
  const msgs = await getCloudStoreMessages();
  if (msgs && msgs.length > 0) {
    return msgs
      .filter((m) => m.client_id === clientId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  if (db) {
    return new Promise((resolve) => {
      db.all(`SELECT * FROM messages WHERE client_id = ? ORDER BY timestamp ASC`, [clientId], (err, rows) => {
        resolve(rows || []);
      });
    });
  }

  return [];
}

async function getAllClients() {
  if (supabase) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: false });
    if (error) throw error;

    const clientMap = {};
    (data || []).forEach((m) => {
      if (!clientMap[m.client_id]) {
        clientMap[m.client_id] = {
          client_id: m.client_id,
          last_timestamp: m.timestamp,
          last_message: m.content,
          unread_count: 0,
        };
      }
      if (m.direction === 'query') {
        clientMap[m.client_id].unread_count += 1;
      }
    });
    return Object.values(clientMap).sort((a, b) => b.last_timestamp - a.last_timestamp);
  }

  if (redis) {
    const msgs = await getUpstashMessages();
    const clientMap = {};
    msgs.sort((a, b) => b.timestamp - a.timestamp).forEach((m) => {
      if (!clientMap[m.client_id]) {
        clientMap[m.client_id] = {
          client_id: m.client_id,
          last_timestamp: m.timestamp,
          last_message: m.content,
          unread_count: 0,
        };
      }
      if (m.direction === 'query') {
        clientMap[m.client_id].unread_count += 1;
      }
    });
    return Object.values(clientMap).sort((a, b) => b.last_timestamp - a.last_timestamp);
  }

  // Fetch from Persistent Cloud Store
  const msgs = await getCloudStoreMessages();
  if (msgs && msgs.length > 0) {
    const clientMap = {};
    msgs.sort((a, b) => b.timestamp - a.timestamp).forEach((m) => {
      if (!clientMap[m.client_id]) {
        clientMap[m.client_id] = {
          client_id: m.client_id,
          last_timestamp: m.timestamp,
          last_message: m.content,
          unread_count: 0,
        };
      }
      if (m.direction === 'query') {
        clientMap[m.client_id].unread_count += 1;
      }
    });
    return Object.values(clientMap).sort((a, b) => b.last_timestamp - a.last_timestamp);
  }

  if (db) {
    return new Promise((resolve) => {
      db.all(
        `SELECT
           client_id,
           MAX(timestamp) AS last_timestamp,
           (SELECT content FROM messages m2
            WHERE m2.client_id = m1.client_id
            ORDER BY m2.timestamp DESC LIMIT 1) AS last_message,
           SUM(CASE WHEN direction = 'query' THEN 1 ELSE 0 END) AS unread_count
         FROM messages m1
         GROUP BY client_id
         ORDER BY last_timestamp DESC`,
        [],
        (err, rows) => {
          resolve(rows || []);
        }
      );
    });
  }

  return [];
}

async function deleteClient(clientId) {
  if (supabase) {
    const { error } = await supabase.from('messages').delete().eq('client_id', clientId);
    if (error) throw error;
    return true;
  }

  if (redis) {
    let msgs = await getUpstashMessages();
    msgs = msgs.filter((m) => m.client_id !== clientId);
    await saveUpstashMessages(msgs);
    return true;
  }

  let msgs = await getCloudStoreMessages();
  msgs = msgs.filter((m) => m.client_id !== clientId);
  await saveCloudStoreMessages(msgs);

  if (db) db.run(`DELETE FROM messages WHERE client_id = ?`, [clientId], () => {});
  return true;
}

async function deleteMessage(messageId) {
  if (supabase) {
    const { error } = await supabase.from('messages').delete().eq('id', messageId);
    if (error) throw error;
    return true;
  }

  if (redis) {
    let msgs = await getUpstashMessages();
    msgs = msgs.filter((m) => m.id != messageId);
    await saveUpstashMessages(msgs);
    return true;
  }

  let msgs = await getCloudStoreMessages();
  msgs = msgs.filter((m) => m.id != messageId);
  await saveCloudStoreMessages(msgs);

  if (db) db.run(`DELETE FROM messages WHERE id = ?`, [messageId], () => {});
  return true;
}

module.exports = {
  addMessage,
  getMessagesByClient,
  getAllClients,
  deleteClient,
  deleteMessage,
};
