// server/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const os = require('os');

const isNetlify = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;
const dbPath = isNetlify ? path.join(os.tmpdir(), 'messages.db') : path.resolve(__dirname, 'messages.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open DB:', err);
  } else {
    console.log('✅ SQLite DB opened at', dbPath);
  }
});

// Initialize messages table
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

function addMessage({ clientId, direction, content }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (client_id, direction, content, timestamp) VALUES (?, ?, ?, ?)`,
      [clientId, direction, content, Date.now()],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getMessagesByClient(clientId) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM messages WHERE client_id = ? ORDER BY timestamp ASC`, [clientId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

/**
 * Get all distinct clients with their last message and unread count.
 */
function getAllClients() {
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
        else resolve(rows);
      }
    );
  });
}

function deleteClient(clientId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM messages WHERE client_id = ?`, [clientId], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

function deleteMessage(messageId) {
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
