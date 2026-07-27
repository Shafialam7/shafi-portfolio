// server/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const os = require('os');
const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
const { Redis } = require('@upstash/redis');

// Dedicated persistent Cloud Store ID for Shafi Portfolio Netlify Deployment
const CLOUD_STORE_URL = 'https://api.restful-api.dev/objects/ff8081819f7e10ae019fa584827735e3';

// Detect optional Cloud DB provider environment variables
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

// Fallback Local SQLite DB setup
const isNetlify = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;
const dbPath = isNetlify ? path.join(os.tmpdir(), 'messages.db') : path.resolve(__dirname, 'messages.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (!err) console.log('✅ SQLite DB initialized at', dbPath);
});

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

// Helper for Zero-Config Persistent Cloud Storage
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

  // 3. Automated Netlify Serverless Cloud Storage
  if (isNetlify) {
    const msgs = await getCloudStoreMessages();
    const newMsg = { id: Date.now(), client_id: clientId, direction, content, timestamp };
    msgs.push(newMsg);
    await saveCloudStoreMessages(msgs);
    return newMsg.id;
  }

  // 4. Local SQLite (Sync with Cloud Store as backup)
  const newId = await new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (client_id, direction, content, timestamp) VALUES (?, ?, ?, ?)`,
      [clientId, direction, content, timestamp],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });

  // Sync to Cloud Store in background
  getCloudStoreMessages().then((msgs) => {
    msgs.push({ id: newId, client_id: clientId, direction, content, timestamp });
    saveCloudStoreMessages(msgs);
  }).catch(() => {});

  return newId;
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

  if (isNetlify) {
    const msgs = await getCloudStoreMessages();
    return msgs
      .filter((m) => m.client_id === clientId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM messages WHERE client_id = ? ORDER BY timestamp ASC`, [clientId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
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

  if (isNetlify) {
    const msgs = await getCloudStoreMessages();
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

  return new Promise((resolve, reject) => {
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
        if (err) reject(err);
        else resolve(rows || []);
      }
    );
  });
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

  if (isNetlify) {
    let msgs = await getCloudStoreMessages();
    msgs = msgs.filter((m) => m.client_id !== clientId);
    await saveCloudStoreMessages(msgs);
    return true;
  }

  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM messages WHERE client_id = ?`, [clientId], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
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

  if (isNetlify) {
    let msgs = await getCloudStoreMessages();
    msgs = msgs.filter((m) => m.id != messageId);
    await saveCloudStoreMessages(msgs);
    return true;
  }

  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM messages WHERE id = ?`, [messageId], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

module.exports = {
  addMessage,
  getMessagesByClient,
  getAllClients,
  deleteClient,
  deleteMessage,
};
