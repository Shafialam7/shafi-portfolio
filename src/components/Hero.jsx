import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Code2, Copy, Check, Building2, Activity, GitBranch, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const roles = [
  'Full-Stack Engineer (3+ Yrs Exp)',
  'React & Node.js Specialist',
  'UI/UX Craftsman',
  'API & System Architect',
];

const codeContentRaw = {
  'Experience.ts': [
    { line: 1, tokens: [{ text: 'export ', color: 'token-keyword' }, { text: 'const ', color: 'token-keyword' }, { text: 'developerProfile ', color: 'token-var' }, { text: '= {', color: 'text-stone-300' }] },
    { line: 2, tokens: [{ text: '  name: ', color: 'text-stone-400' }, { text: '"Shafi Alam"', color: 'token-string' }, { text: ',', color: 'text-stone-300' }] },
    { line: 3, tokens: [{ text: '  title: ', color: 'text-stone-400' }, { text: '"Full-Stack Software Engineer"', color: 'token-string' }, { text: ',', color: 'text-stone-300' }] },
    { line: 4, tokens: [{ text: '  experienceYears: ', color: 'text-stone-400' }, { text: '3', color: 'token-number' }, { text: ',', color: 'text-stone-300' }] },
    { line: 5, tokens: [{ text: '  education: ', color: 'text-stone-400' }, { text: '"BCA (Pursuing)"', color: 'token-string' }, { text: ',', color: 'text-stone-300' }] },
    { line: 6, tokens: [{ text: '  companiesWorked: ', color: 'text-stone-400' }, { text: '[', color: 'text-stone-300' }] },
    { line: 7, tokens: [{ text: '    { ', color: 'text-stone-300' }, { text: 'name: ', color: 'text-stone-400' }, { text: '"Veronn Tourism"', color: 'token-string' }, { text: ', ', color: 'text-stone-300' }, { text: 'role: ', color: 'text-stone-400' }, { text: '"Full-Stack Developer"', color: 'token-string' }, { text: ' },', color: 'text-stone-300' }] },
    { line: 8, tokens: [{ text: '    { ', color: 'text-stone-300' }, { text: 'name: ', color: 'text-stone-400' }, { text: '"Axis Visa Services"', color: 'token-string' }, { text: ', ', color: 'text-stone-300' }, { text: 'role: ', color: 'text-stone-400' }, { text: '"Full-Stack Engineer"', color: 'token-string' }, { text: ' }', color: 'text-stone-300' }] },
    { line: 9, tokens: [{ text: '  ],', color: 'text-stone-300' }] },
    { line: 10, tokens: [{ text: '  status: ', color: 'text-stone-400' }, { text: '"Available for Hire & Contracting"', color: 'token-string' }] },
    { line: 11, tokens: [{ text: '};', color: 'text-stone-300' }] },
  ],
  'Stack.ts': [
    { line: 1, tokens: [{ text: 'export ', color: 'token-keyword' }, { text: 'const ', color: 'token-keyword' }, { text: 'techStack ', color: 'token-var' }, { text: '= {', color: 'text-stone-300' }] },
    { line: 2, tokens: [{ text: '  frontend: ', color: 'text-stone-400' }, { text: '["React.js", "Tailwind CSS v4", "Framer Motion"]', color: 'token-string' }, { text: ',', color: 'text-stone-300' }] },
    { line: 3, tokens: [{ text: '  backend: ', color: 'text-stone-400' }, { text: '["Node.js", "Express.js", "PostgreSQL", "MongoDB"]', color: 'token-string' }, { text: ',', color: 'text-stone-300' }] },
    { line: 4, tokens: [{ text: '  tools: ', color: 'text-stone-400' }, { text: '["Git & GitHub", "Vite", "Docker", "Vercel"]', color: 'token-string' }] },
    { line: 5, tokens: [{ text: '};', color: 'text-stone-300' }] },
  ],
  'Contacts.ts': [
    { line: 1, tokens: [{ text: 'export ', color: 'token-keyword' }, { text: 'const ', color: 'token-keyword' }, { text: 'contactDetails ', color: 'token-var' }, { text: '= {', color: 'text-stone-300' }] },
    { line: 2, tokens: [{ text: '  phone: ', color: 'text-stone-400' }, { text: '"+91 79957 81051"', color: 'token-string' }, { text: ',', color: 'text-stone-300' }] },
    { line: 3, tokens: [{ text: '  email: ', color: 'text-stone-400' }, { text: '"devbyshafi@gmail.com"', color: 'token-string' }, { text: ',', color: 'text-stone-300' }] },
    { line: 4, tokens: [{ text: '  github: ', color: 'text-stone-400' }, { text: '"github.com/Shafialam7"', color: 'token-string' }] },
    { line: 5, tokens: [{ text: '};', color: 'text-stone-300' }] },
  ]
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState('Experience.ts');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 35);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 80);
    }

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleCopy = () => {
    const rawText = codeContentRaw[activeTab].map(l => l.tokens.map(t => t.text).join('')).join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden font-mono"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 text-left flex flex-col"
        >
          {/* Cyan Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 w-fit mb-6 shadow-sm">
            <Sparkles size={14} className="text-cyan-600" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-800">
              3+ Years Commercial Engineering
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight font-space text-slate-900">
            Hi, I'm <span className="text-gradient-vibrant">Shafi Alam</span>
          </h1>

          <div className="h-10 flex items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-slate-700">
              <span className="text-purple-600">&gt; </span>
              <span>{displayText}</span>
              <span className="inline-block w-0.5 h-6 bg-purple-600 ml-1 animate-pulse" />
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-lg leading-relaxed font-medium">
            Full-Stack Software Engineer with <strong className="text-purple-700 font-bold">3+ years of experience</strong>. Built production platforms at <strong className="text-purple-800 font-bold">Veronn Tourism</strong> and <strong className="text-cyan-800 font-bold">Axis Visa Services</strong>. Pursuing BCA.
          </p>

          {/* Color-Coded Company Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl glass-panel border border-purple-200 text-purple-900 shadow-sm bg-purple-50">
              <Building2 size={15} className="text-purple-600" />
              <span>Veronn Tourism</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl glass-panel border border-cyan-200 text-cyan-900 shadow-sm bg-cyan-50">
              <Building2 size={15} className="text-cyan-600" />
              <span>Axis Visa Services</span>
            </div>
          </div>

          {/* Multi-Color Gradient CTA */}
          <div className="flex flex-wrap gap-4 items-center mb-10">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-purple-600 to-rose-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
            >
              <span>Explore My Work</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 glass-panel text-slate-800 hover:text-purple-600 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 border border-slate-200 shadow-sm bg-white"
            >
              <span>Contact Me</span>
            </a>
          </div>

          {/* Color-Coded Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl glass-panel border border-slate-200 text-left font-mono bg-white">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-cyan-600" />
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Uptime</span>
                <span className="text-xs font-bold text-slate-800">99.98%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap size={14} className="text-purple-600" />
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Latency</span>
                <span className="text-xs font-bold text-slate-800">18ms</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-600" />
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">CI Build</span>
                <span className="text-xs font-bold text-emerald-600">PASSING</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <GitBranch size={14} className="text-rose-600" />
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Git Commits</span>
                <span className="text-xs font-bold text-slate-800">1,420+</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Single Xcode Code IDE Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 w-full"
        >
          <div className="glass-panel tilt-card rounded-2xl overflow-hidden shadow-2xl border border-slate-300 text-left font-mono text-xs bg-[#0f172a]">
            {/* Header Window Bar */}
            <div className="px-4 py-3 bg-[#0a0f1d] text-stone-300 border-b border-stone-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                <span className="text-stone-400 text-[11px] ml-2 flex items-center gap-1.5 font-bold">
                  <Terminal size={13} className="text-cyan-400" /> shafi-ide.ts
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Xcode IDE Tabs */}
            <div className="flex bg-[#0a0f1d] border-b border-stone-800 overflow-x-auto no-scrollbar">
              {Object.keys(codeContentRaw).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveTab(fileName)}
                  className={`px-4 py-2.5 text-[11px] flex items-center gap-1.5 border-r border-stone-800 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === fileName
                      ? 'bg-[#0f172a] text-cyan-400 font-bold border-t-2 border-t-cyan-400'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Code2 size={12} />
                  <span>{fileName}</span>
                </button>
              ))}
            </div>

            {/* Syntax-Highlighted Code Editor Canvas */}
            <div className="p-5 overflow-x-auto code-scroll max-h-[320px] bg-[#0a0f1d] text-stone-300 leading-relaxed font-mono text-[11px]">
              <div className="space-y-1">
                {codeContentRaw[activeTab].map((row) => (
                  <div key={row.line} className="flex items-start">
                    <span className="w-8 text-right text-stone-600 select-none pr-4 font-mono text-[10px]">
                      {row.line}
                    </span>
                    <div className="whitespace-pre">
                      {row.tokens.map((tok, idx) => (
                        <span key={idx} className={tok.color}>
                          {tok.text}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apple IDE Status Bar */}
            <div className="px-4 py-2 bg-[#0a0f1d] border-t border-stone-800 flex justify-between items-center text-[10px] text-stone-400">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> 3+ Yrs Exp • BCA (Pursuing)
              </span>
              <span>TypeScript • UTF-8</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
