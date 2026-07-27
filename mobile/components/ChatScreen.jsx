// mobile/components/ChatScreen.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
import { sendReply, fetchHistory } from '../utils/api';

export default function ChatScreen({ clientId, route }) {
  const resolvedClientId = clientId || route?.params?.clientId;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load stored messages and remote history when clientId changes
  useEffect(() => {
    if (!resolvedClientId) {
      setMessages([]);
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const remote = await fetchHistory(resolvedClientId);
        const formatted = remote.map((m) => ({
          _id: `${m.id}`,
          text: m.content,
          createdAt: new Date(m.timestamp),
          user: {
            _id: m.direction === 'query' ? 2 : 1,
            name: m.direction === 'query' ? resolvedClientId : 'You',
          },
        }));
        // GiftedChat expects newest-first
        formatted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setMessages(formatted);
      } catch (err) {
        console.error('Error loading history:', err);
      }
      setLoading(false);
    })();
  }, [resolvedClientId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      if (!resolvedClientId) return;
      const message = newMessages[0];
      // Optimistically add to UI
      setMessages((prev) => GiftedChat.append(prev, newMessages));
      // Send reply to backend
      try {
        await sendReply(resolvedClientId, message.text);
      } catch (err) {
        console.error('Failed to send reply:', err);
      }
    },
    [resolvedClientId]
  );

  // Custom bubble styles
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#6c63ff',
          borderRadius: 16,
          borderBottomRightRadius: 4,
          paddingVertical: 2,
        },
        left: {
          backgroundColor: '#1a1a2e',
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          paddingVertical: 2,
        },
      }}
      textStyle={{
        right: { color: '#fff', fontSize: 15 },
        left: { color: '#e0e0e0', fontSize: 15 },
      }}
      timeTextStyle={{
        right: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
        left: { color: 'rgba(255,255,255,0.3)', fontSize: 11 },
      }}
    />
  );

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <View style={styles.sendButton}>
        <Text style={styles.sendText}>➤</Text>
      </View>
    </Send>
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={styles.inputPrimary}
    />
  );

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={styles.composer}
      placeholderTextColor="#666"
    />
  );

  if (!resolvedClientId) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📭</Text>
        <Text style={styles.emptyText}>No client selected</Text>
        <Text style={styles.emptySubtext}>
          Select a conversation from the list or wait for a new client query.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#6c63ff" />
        <Text style={styles.loadingText}>Loading messages…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{ _id: 1, name: 'You' }}
        placeholder="Type your reply…"
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        alwaysShowSend
        scrollToBottom
        scrollToBottomStyle={styles.scrollToBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a1a',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingText: {
    color: '#888',
    marginTop: 12,
    fontSize: 14,
  },
  inputToolbar: {
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: 'rgba(108, 99, 255, 0.2)',
    paddingVertical: 4,
  },
  inputPrimary: {
    alignItems: 'center',
  },
  composer: {
    color: '#fff',
    backgroundColor: '#0d0d20',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.15)',
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6c63ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontSize: 18,
  },
  scrollToBottom: {
    backgroundColor: '#6c63ff',
  },
});
