import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Send, Bot, Sparkles, RefreshCw, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialOutput = [
  { id: 1, type: 'system', text: '🤖 Shafi AI Assistant Terminal v3.0 initialized.' },
  { id: 2, type: 'system', text: 'Ask me anything about Shafi Alam (Pricing, Timelines, Custom Apps, Veronn Tourism, Axis Visa Services, Hiring, Contact)!' },
  { id: 3, type: 'ai', text: 'Hello! I am Shafi\'s personal AI Assistant. How can I help you today? Type a question below or click a quick action pill!' },
];

export default function DevTerminalDrawer({ isOpen, setIsOpen }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(initialOutput);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isThinking]);

  // Intelligent AI Intent Classification Engine
  const getAIResponse = (query) => {
    const q = query.toLowerCase().trim();

    // 1. Pricing & Cost Queries
    if (q.includes('cost') || q.includes('price') || q.includes('pricing') || q.includes('rate') || q.includes('fee') || q.includes('budget')) {
      return '💰 Project Pricing & Budget Estimates:\n • Custom Web Applications: Flexible pricing depending on scope & feature set.\n • Travel Engine / Visa Portal: Enterprise custom architecture.\n • REST API & Database Design: Competitive hourly or fixed milestone rates.\n ✉️ Contact Shafi directly at devbyshafi@gmail.com or +91 79957 81051 for a free project quote!';
    }

    // 2. Timeline & Turnaround Queries
    if (q.includes('timeline') || q.includes('time') || q.includes('how long') || q.includes('deadline') || q.includes('fast') || q.includes('urgent')) {
      return '⏱️ Development Timelines:\n • Landing Pages & Portfolios: 3 - 7 days\n • Full-Stack Web Apps & APIs: 2 - 3 weeks\n • Complex Enterprise Engines (Travel/Visa/SaaS): 3 - 6 weeks\n ⚡ Shafi specializes in fast, high-quality delivery with daily git progress updates!';
    }

    // 3. Hiring & Availability
    if (q.includes('hire') || q.includes('available') || q.includes('contract') || q.includes('freelance') || q.includes('job') || q.includes('work with')) {
      return '🟢 Shafi is currently AVAILABLE for Full-Time Full-Stack Engineering roles, contracting, and freelance software projects!\n • Experience: 3+ years commercial full-stack engineering\n • Email: devbyshafi@gmail.com\n • Phone / WhatsApp: +91 79957 81051';
    }

    // 4. Veronn Tourism Experience
    if (q.includes('veronn') || q.includes('tourism') || q.includes('flight') || q.includes('booking')) {
      return '✈️ Veronn Tourism (Full-Stack Developer):\n • Engine: Luxury travel booking platform, itinerary configurator, real-time trip cost calculation.\n • Integrations: Live flight search REST APIs and secure payment processing.\n • Result: 40% faster page load performance.\n 🔗 Website: https://veronntourism.com';
    }

    // 5. Axis Visa Services Experience
    if (q.includes('axis') || q.includes('visa') || q.includes('passport') || q.includes('document')) {
      return '🛂 Axis Visa Services (Full-Stack Engineer):\n • Engine: Global visa status tracking portal, step-by-step document verification checklist, appointment scheduling calendars.\n • Backend: Scalable Express.js & PostgreSQL schema.\n 🔗 Website: https://axisvisaservices.com';
    }

    // 6. Custom App Capabilities
    if (q.includes('custom') || q.includes('feature') || q.includes('build me') || q.includes('can you make') || q.includes('ecommerce') || q.includes('saas')) {
      return '🛠️ Custom Application Capabilities:\n 1. Travel & Tour Booking Engines\n 2. Visa & Document Tracking Portals\n 3. E-Commerce Storefronts & Shopping Carts\n 4. RESTful API Architecture & PostgreSQL/MongoDB Schemas\n 5. High-Speed Responsive Frontends (React + Tailwind CSS v4)';
    }

    // 7. Post-Launch Maintenance & Support
    if (q.includes('support') || q.includes('maintenance') || q.includes('bug') || q.includes('after') || q.includes('launch')) {
      return '🛡️ Post-Launch Support & Maintenance:\n Shafi provides 30 days of complimentary post-launch support, bug fixes, and server monitoring with every project. Extended monthly SLA maintenance contracts are also available!';
    }

    // 8. Work Process & Collaboration
    if (q.includes('process') || q.includes('workflow') || q.includes('how do we start') || q.includes('communication') || q.includes('updates')) {
      return '🤝 Work Process & Collaboration:\n 1. Requirement & Architecture Review\n 2. Milestone Planning & Wireframing\n 3. Daily Git Commits & Live Staging Demos\n 4. Automated Testing & Cloud Deployment (Vercel/Docker)\n 5. Final Handover & 30-Day Support';
    }

    // 9. Tech Stack & Security
    if (q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('node') || q.includes('database') || q.includes('security')) {
      return '⚡ Shafi\'s Core Tech Stack:\n • Frontend: React.js, Tailwind CSS v4, Framer Motion, HTML5/CSS3\n • Backend: Node.js, Express.js, REST & GraphQL APIs, JWT Auth\n • Databases: PostgreSQL (ACID SQL), MongoDB (JSON Docs)\n • Tools: Git & GitHub, Docker, Vite, Vercel, Linux Terminal';
    }

    // 10. Education
    if (q.includes('bca') || q.includes('education') || q.includes('degree') || q.includes('college')) {
      return '🎓 Education: Shafi is currently pursuing his Bachelor of Computer Applications (BCA), specializing in Web Architecture, Software Systems, and Algorithmic Design.';
    }

    // 11. Contact Info
    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('mail') || q.includes('reach')) {
      return '✉️ Direct Email: devbyshafi@gmail.com\n📞 Phone / WhatsApp: +91 79957 81051\n📍 Location: Hyderabad, India\n🐙 GitHub: https://github.com/Shafialam7';
    }

    // 12. Friendly Greetings
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('who are you')) {
      return '👋 Hello! I am Shafi Alam\'s AI Assistant. I can answer all client questions regarding Shafi\'s 3+ years experience, company platforms (Veronn Tourism & Axis Visa Services), project estimates, timelines, and contact details!';
    }

    if (q === 'clear') {
      return 'CLEAR_SIGNAL';
    }

    if (q === 'help') {
      return '💡 Available Client Topics:\n • "What are your project rates?"\n • "How long does a project take?"\n • "Tell me about Veronn Tourism"\n • "Tell me about Axis Visa Services"\n • "Are you available for hire?"\n • "Do you provide support after launch?"\n • "Get contact details"\n • "clear" - Clear output';
    }

    return `🤖 AI Assistant: Thanks for asking about "${query}"! Shafi Alam is a Full-Stack Engineer (3+ Yrs Exp) specializing in React, Node.js, and PostgreSQL. Contact him at devbyshafi@gmail.com or +91 79957 81051. Try asking: "pricing", "timelines", or "veronn tourism".`;
  };

  const handleSend = async (userQuery) => {
    const query = userQuery || input;
    if (!query.trim()) return;

    // Add User Query
    const userMsg = { id: Date.now(), type: 'user', text: `$ ${query}` };
    setHistory((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    if (query.trim().toLowerCase() === 'clear') {
      setHistory(initialOutput);
      setIsThinking(false);
      return;
    }

    try {
      let clientId = localStorage.getItem('chatbot_client_id');
      if (!clientId) {
        clientId = 'visitor_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('chatbot_client_id', clientId);
      }

      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, message: query }),
      });
      const data = await res.json();
      const responseText = data.reply || getAIResponse(query);
      const aiMsg = { id: Date.now() + 1, type: 'ai', text: responseText };
      setHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      const responseText = getAIResponse(query);
      const aiMsg = { id: Date.now() + 1, type: 'ai', text: responseText };
      setHistory((prev) => [...prev, aiMsg]);
    }
    setIsThinking(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-2xl flex items-center gap-2 font-mono text-xs font-bold cursor-pointer transition-all hover:scale-105 border border-purple-300/40"
        title="Open Shafi AI Assistant Terminal"
      >
        <Bot size={18} className="animate-bounce text-cyan-300" />
        <span className="hidden sm:inline">Shafi AI Bot</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 font-mono text-xs ${
        isMaximized
          ? 'inset-4 sm:inset-8'
          : 'bottom-6 right-6 w-full max-w-lg h-[460px] px-4 sm:px-0'
      }`}
    >
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-slate-300 flex flex-col bg-[#0f172a] text-slate-200">
        {/* Title Bar */}
        <div className="px-4 py-3 bg-[#0a0f1d] border-b border-slate-800 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
            <span className="text-slate-300 font-bold ml-2 flex items-center gap-1.5 text-xs">
              <Bot size={15} className="text-cyan-400" /> Shafi AI Assistant Terminal v3.0
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setHistory(initialOutput)}
              className="p-1 hover:text-white transition-colors"
              title="Reset AI Chat Output"
            >
              <RefreshCw size={13} />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white transition-colors hidden sm:block"
            >
              {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:text-rose-400 transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* AI Quick Suggestion Action Pills */}
        <div className="px-4 py-2 bg-[#0a0f1d]/70 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-slate-500 font-bold flex items-center gap-1 shrink-0">
            <Sparkles size={11} className="text-purple-400" /> Client Q&A:
          </span>
          {[
            'Are you available for hire?',
            'What are your project rates?',
            'How long does a project take?',
            'Veronn Tourism Project',
            'Axis Visa Portal',
            'Get Email & Phone',
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold border border-slate-700 shrink-0 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto code-scroll space-y-3 font-mono text-[11px] leading-relaxed bg-[#0a0f1d]">
          {history.map((item) => (
            <div key={item.id} className="text-left">
              {item.type === 'user' && (
                <div className="text-cyan-300 font-bold flex items-center gap-1">
                  <span>{item.text}</span>
                </div>
              )}

              {item.type === 'system' && (
                <div className="text-slate-500 font-medium">{item.text}</div>
              )}

              {item.type === 'ai' && (
                <div className="text-emerald-400 whitespace-pre-wrap font-medium flex items-start gap-2 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
                  <Bot size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <div className="flex-1">{item.text}</div>
                </div>
              )}
            </div>
          ))}

          {/* Thinking Animation */}
          {isThinking && (
            <div className="text-slate-400 font-medium flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800 text-[11px]">
              <Bot size={14} className="text-purple-400 animate-spin" />
              <span>AI Assistant processing query...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-3 bg-[#0a0f1d] border-t border-slate-800 flex items-center gap-2"
        >
          <span className="text-purple-400 font-bold">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything (e.g. 'project rates', 'timelines')..."
            className="flex-1 bg-transparent border-none text-slate-200 focus:outline-none font-mono text-xs placeholder:text-slate-600"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white cursor-pointer transition-all"
          >
            <Send size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}
