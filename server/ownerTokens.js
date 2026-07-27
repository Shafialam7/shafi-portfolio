// server/ownerTokens.js
// Simple in‑memory store for the owner's Expo push token.
// In a production system you would persist this in the DB or a secret store.
let ownerPushToken = null;

function setOwnerPushToken(token) {
  ownerPushToken = token;
}

function getOwnerPushToken() {
  return ownerPushToken;
}

module.exports = { setOwnerPushToken, getOwnerPushToken };
