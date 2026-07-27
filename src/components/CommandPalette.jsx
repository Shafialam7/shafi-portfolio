import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, CornerDownLeft, X, Terminal, Phone, Mail, User, Briefcase, Cpu, Layers } from 'lucide-react';
import { Github } from './BrandIcons';

export default function CommandPalette({ isOpen, onClose, onOpenTerminal }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'about',
      title: 'Jump to About & Experience',
      category: 'Navigation',
      icon: <User size={16} className="text-emerald-600" />,
      run: () => { window.location.href = '#about'; onClose(); },
    },
    {
      id: 'projects',
      title: 'Jump to Work & Company Projects',
      category: 'Navigation',
      icon: <Briefcase size={16} className="text-emerald-600" />,
      run: () => { window.location.href = '#projects'; onClose(); },
    },
    {
      id: 'skills',
      title: 'View Skills & Core Tech Stack',
      category: 'Navigation',
      icon: <Cpu size={16} className="text-emerald-600" />,
      run: () => { window.location.href = '#skills'; onClose(); },
    },
    {
      id: 'services',
      title: 'View Services & Capabilities',
      category: 'Navigation',
      icon: <Layers size={16} className="text-emerald-600" />,
      run: () => { window.location.href = '#services'; onClose(); },
    },
    {
      id: 'contact',
      title: 'Get In Touch / Send Message',
      category: 'Navigation',
      icon: <Mail size={16} className="text-emerald-600" />,
      run: () => { window.location.href = '#contact'; onClose(); },
    },
    {
      id: 'terminal',
      title: 'Launch Interactive CLI Dev Terminal',
      category: 'Developer Tools',
      icon: <Terminal size={16} className="text-emerald-600" />,
      run: () => { onClose(); onOpenTerminal(); },
    },
    {
      id: 'github',
      title: 'Open GitHub Profile (Shafialam7)',
      category: 'External Links',
      icon: <Github size={16} className="text-emerald-600" />,
      run: () => { window.open('https://github.com/Shafialam7', '_blank'); onClose(); },
    },
    {
      id: 'phone',
      title: 'Copy Phone Number (+91 79957 81051)',
      category: 'Quick Contact',
      icon: <Phone size={16} className="text-emerald-600" />,
      run: () => { navigator.clipboard.writeText('+917995781051'); alert('Phone number copied!'); onClose(); },
    },
    {
      id: 'email',
      title: 'Copy Email Address (devbyshafi@gmail.com)',
      category: 'Quick Contact',
      icon: <Mail size={16} className="text-purple-600" />,
      run: () => { navigator.clipboard.writeText('devbyshafi@gmail.com'); alert('Email address copied!'); onClose(); },
    },
  ];

  const filtered = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].run();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-stone-950/40 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl border border-black/10 flex flex-col"
        >
          {/* Search Header */}
          <div className="px-4 py-3.5 border-b border-black/5 flex items-center gap-3 bg-white/90">
            <Search size={18} className="text-emerald-600" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search section (e.g. 'projects', 'github')..."
              className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none placeholder:text-stone-400 font-mono"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-black/5 text-stone-400 hover:text-stone-900 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Action List */}
          <div className="p-2 max-h-[320px] overflow-y-auto text-left space-y-1">
            {filtered.length > 0 ? (
              filtered.map((action, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={action.id}
                    onClick={action.run}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white font-bold'
                        : 'hover:bg-black/5 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-stone-800 text-emerald-400' : 'bg-stone-100 text-emerald-600'}`}>
                        {action.icon}
                      </span>
                      <div>
                        <span className="block font-space text-xs">{action.title}</span>
                        <span className={`text-[10px] font-mono ${isSelected ? 'text-stone-400' : 'text-stone-400'}`}>
                          {action.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-70">
                      <span className="text-[10px] font-mono">Execute</span>
                      <CornerDownLeft size={12} />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-stone-400 font-mono">
                No matching developer commands found.
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 bg-stone-50 border-t border-black/5 flex justify-between items-center text-[10px] text-stone-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 font-bold">↑↓</span> navigate
              <span className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 font-bold">↵</span> select
            </span>
            <span className="flex items-center gap-1 font-bold text-emerald-600">
              <Command size={10} /> Developer Command Palette
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
