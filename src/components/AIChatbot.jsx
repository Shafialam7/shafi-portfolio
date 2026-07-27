import { useState, useEffect, useRef } from 'react';
import { Send, Bot, MessageSquare, Loader2, X, MessageCircle, RefreshCw } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

// Generate or retrieve a persistent client ID for this browser visitor
function getClientId() {
  let id = localStorage.getItem('chatbot_client_id');
  if (!id) {
    id = 'visitor_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('chatbot_client_id', id);
  }
  return id;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_chat_messages');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse chat history', e);
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const clientId = useRef(getClientId());
  const pollRef = useRef(null);

  const startNewSession = () => {
    const newId = 'visitor_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('chatbot_client_id', newId);
    clientId.current = newId;
    setMessages([]);
    localStorage.removeItem('ai_chat_messages');
  };

  // Persist messages whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('ai_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to store chat history', e);
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Poll for owner replies every 10 seconds when chat is open
  useEffect(() => {
    if (!isOpen) return;
    const checkReplies = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/history/${clientId.current}`);
        if (!res.ok) return;
        const data = await res.json();
        const serverMsgs = (data.messages || []).map((m) => ({
          role: m.direction === 'query' ? 'user' : 'bot',
          content: m.content,
          timestamp: m.timestamp,
        }));
        if (serverMsgs.length > 0) {
          setMessages(serverMsgs);
        }
      } catch {
        // Server might not be running yet – silently ignore
      }
    };
    checkReplies();
    pollRef.current = setInterval(checkReplies, 10000);
    return () => clearInterval(pollRef.current);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: clientId.current,
          message: userMsg.content,
        }),
      });
      const data = await res.json();
      const botContent = data.reply || 'Your message has been sent to Shafi. He will reply shortly! 📱';
      const botMsg = { role: 'bot', content: botContent };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errMsg = {
        role: 'bot',
        content: 'Sorry, could not reach the server. Please try again later.',
      };
      setMessages((prev) => [...prev, errMsg]);
    }
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('ai_chat_messages');
  };

  // Floating action button when closed
  if (!isOpen) {
    return (
      <button
        id="ai-chatbot-fab"
        onClick={() => setIsOpen(true)}
        className="ai-chatbot-fab"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <section id="ai-chatbot" className="ai-chatbot-container">
      <header className="ai-chatbot-header">
        <div className="ai-chatbot-header-left">
          <div className="ai-chatbot-avatar">
            <Bot size={16} />
          </div>
          <div>
            <h4 className="ai-chatbot-title">Chat with Shafi</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="ai-chatbot-status">● Online</span>
              <span style={{ fontSize: '10px', opacity: 0.6, fontFamily: 'monospace' }}>
                ({clientId.current})
              </span>
            </div>
          </div>
        </div>
        <div className="ai-chatbot-header-actions">
          <button onClick={startNewSession} className="ai-chatbot-header-btn" title="Start new visitor session">
            <RefreshCw size={13} />
          </button>
          <button onClick={clearChat} className="ai-chatbot-header-btn" title="Clear chat messages">
            <X size={14} />
          </button>
          <button onClick={() => setIsOpen(false)} className="ai-chatbot-header-btn" title="Close">
            <span style={{ fontSize: '14px', lineHeight: 1 }}>—</span>
          </button>
        </div>
      </header>

      <div className="ai-chatbot-messages">
        {messages.length === 0 && (
          <div className="ai-chatbot-welcome">
            <Bot size={32} className="ai-chatbot-welcome-icon" />
            <p className="ai-chatbot-welcome-title">Hi there! 👋</p>
            <p className="ai-chatbot-welcome-text">
              Send a message and Shafi will get back to you. Your messages go
              directly to his phone.
            </p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`ai-chatbot-bubble ${msg.role === 'user' ? 'ai-chatbot-bubble-user' : 'ai-chatbot-bubble-bot'}`}
          >
            {msg.role === 'bot' && (
              <div className="ai-chatbot-bubble-icon">
                <Bot size={14} />
              </div>
            )}
            <div className="ai-chatbot-bubble-content">
              <span>{msg.content}</span>
            </div>
            {msg.role === 'user' && (
              <div className="ai-chatbot-bubble-icon user">
                <MessageSquare size={14} />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="ai-chatbot-bubble ai-chatbot-bubble-bot">
            <div className="ai-chatbot-bubble-icon">
              <Bot size={14} />
            </div>
            <div className="ai-chatbot-bubble-content">
              <Loader2 className="animate-spin" size={14} />
              <span>Sending…</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="ai-chatbot-input-area"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          className="ai-chatbot-input"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="ai-chatbot-send-btn"
        >
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}
