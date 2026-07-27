import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Server, Cpu, Copy, Check } from 'lucide-react';

const endpoints = [
  {
    id: 'profile',
    method: 'GET',
    path: '/api/v1/shafi/profile',
    description: 'Fetch primary developer identity, commercial experience, and education metadata.',
    response: {
      status: 200,
      message: 'OK',
      data: {
        name: 'Shafi Alam',
        title: 'Full-Stack Software Engineer',
        experience: '3+ Years Commercial Development',
        education: 'Bachelor of Computer Applications (BCA) - Pursuing',
        location: 'Hyderabad, India',
        status: 'Available for Hire & Contract Roles',
      },
    },
  },
  {
    id: 'companies',
    method: 'GET',
    path: '/api/v1/shafi/company-work',
    description: 'Fetch production platforms engineered during employment at Veronn Tourism & Axis Visa Services.',
    response: {
      status: 200,
      message: 'OK',
      companies: [
        {
          name: 'Veronn Tourism',
          role: 'Full-Stack Software Engineer',
          systemsBuilt: ['Luxury Travel Booking Engine', 'Flight API Integration', 'Itinerary Builder'],
        },
        {
          name: 'Axis Visa Services',
          role: 'Full-Stack Software Engineer',
          systemsBuilt: ['Global Visa Tracker Portal', 'Document Verification Checklist', 'Appointment Scheduler'],
        },
      ],
    },
  },
  {
    id: 'skills',
    method: 'GET',
    path: '/api/v1/shafi/skills',
    description: 'Retrieve frontend, backend, database, and ecosystem technical competencies.',
    response: {
      status: 200,
      message: 'OK',
      techStack: {
        frontend: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS v4', 'Framer Motion'],
        backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs'],
        tools: ['Git & GitHub', 'Vite', 'Docker', 'Vercel'],
      },
    },
  },
  {
    id: 'ping',
    method: 'POST',
    path: '/api/v1/shafi/ping',
    description: 'Simulate health check ping request to developer microservice.',
    response: {
      status: 200,
      message: 'PONG',
      telemetry: {
        uptime: '99.98%',
        latency: '14ms',
        region: 'ap-south-1 (Mumbai)',
        timestamp: new Date().toISOString(),
      },
    },
  },
];

export default function DevApiSandbox() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [loading, setLoading] = useState(false);
  const [activeResponse, setActiveResponse] = useState(endpoints[0].response);
  const [latency, setLatency] = useState('14ms');
  const [copied, setCopied] = useState(false);

  const handleSend = (ep) => {
    setSelectedEndpoint(ep);
    setLoading(true);
    const simLatency = `${Math.floor(Math.random() * 12 + 10)}ms`;

    setTimeout(() => {
      setLatency(simLatency);
      setActiveResponse(ep.response);
      setLoading(false);
    }, 400);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(activeResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-sandbox" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 font-bold block mb-2">
          Interactive Developer Utility
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space text-gradient-apple-eco">
          Live REST API Tester Sandbox
        </h2>
        <p className="text-stone-600 text-sm max-w-xl mx-auto mt-2 font-medium">
          Select an API route below and click <strong className="text-emerald-600 font-bold">Execute Request</strong> to test live JSON response payloads in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Endpoint Selector List */}
        <div className="lg:col-span-5 space-y-3 text-left">
          <div className="text-xs font-mono uppercase font-bold text-stone-400 tracking-wider mb-2">
            Available Endpoints
          </div>

          {endpoints.map((ep) => {
            const isSelected = ep.id === selectedEndpoint.id;
            return (
              <button
                key={ep.id}
                onClick={() => handleSend(ep)}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-md border-stone-800'
                    : 'glass-panel border-black/5 text-stone-700 hover:border-black/20'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1.5 font-mono">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {ep.method}
                  </span>
                  <span className={`text-xs font-bold ${isSelected ? 'text-stone-300' : 'text-stone-800'}`}>
                    {ep.path}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed ${isSelected ? 'text-stone-400' : 'text-stone-500'}`}>
                  {ep.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Console Response Viewer */}
        <div className="lg:col-span-7 glass-panel rounded-3xl overflow-hidden border border-black/10 shadow-xl text-left flex flex-col font-mono text-xs">
          {/* Header Bar */}
          <div className="px-5 py-4 bg-stone-900 text-stone-200 border-b border-stone-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Server size={16} className="text-emerald-400" />
              <span className="font-bold text-xs text-white">
                {selectedEndpoint.method} {selectedEndpoint.path}
              </span>
            </div>

            <button
              onClick={() => handleSend(selectedEndpoint)}
              disabled={loading}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Execute</span>
                  <Send size={12} />
                </>
              )}
            </button>
          </div>

          {/* Response Metadata Bar */}
          <div className="px-5 py-2.5 bg-stone-800 text-stone-400 border-b border-stone-700/60 flex justify-between items-center text-[11px]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 size={12} /> HTTP 200 OK
              </span>
              <span>Time: <strong className="text-stone-200">{latency}</strong></span>
              <span>Type: <strong className="text-stone-200">application/json</strong></span>
            </div>

            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy Payload'}</span>
            </button>
          </div>

          {/* Formatted JSON Payload Body */}
          <div className="p-6 bg-[#0d1117] text-stone-200 max-h-[340px] overflow-y-auto code-scroll leading-relaxed">
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="py-16 text-center text-stone-500 italic">
                  Dispatching HTTP Request...
                </div>
              ) : (
                <motion.pre
                  key={selectedEndpoint.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-emerald-300"
                >
                  <code>{JSON.stringify(activeResponse, null, 2)}</code>
                </motion.pre>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Info */}
          <div className="px-5 py-2.5 bg-stone-900 border-t border-stone-800 text-[10px] text-stone-500 flex justify-between items-center">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Cpu size={12} /> Shafi REST API Mock Engine v1.0
            </span>
            <span>REST API Standard Schema</span>
          </div>
        </div>
      </div>
    </section>
  );
}
