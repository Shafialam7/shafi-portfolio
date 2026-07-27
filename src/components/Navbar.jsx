import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Command, Sparkles, ShieldCheck } from 'lucide-react';
import { Github } from './BrandIcons';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenPalette }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <nav className="glass-pill max-w-5xl w-full px-4 py-2 rounded-full flex items-center justify-between pointer-events-auto border border-black/5 bg-white/90 shadow-lg">
        {/* Left: Window Controls & Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 pl-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          </div>

          <a href="#home" className="text-xs font-extrabold tracking-tight flex items-center gap-2 font-space">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block animate-pulse" />
            <span className="text-gradient-vibrant font-bold text-sm">&lt;Shafi.dev /&gt;</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold">
              <Sparkles size={10} className="text-purple-600" /> 3+ Yrs Exp
            </span>
          </a>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 no-scrollbar font-mono">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-white font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="pill-active"
                    transition={{ type: 'spring', duration: 0.45 }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-rose-500 rounded-full shadow-md -z-10"
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right: Command Palette Launcher & Admin Panel Button */}
        <div className="flex items-center gap-2">
          <a
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-purple-600 text-white font-mono text-[11px] font-bold transition-all border border-slate-800 shadow-sm cursor-pointer"
            title="Open Owner Admin Dashboard"
          >
            <ShieldCheck size={12} className="text-cyan-400" />
            <span>Admin</span>
          </a>

          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-mono text-[11px] font-bold border border-purple-200 transition-colors cursor-pointer"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command size={12} />
            <span>⌘K</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors md:hidden text-slate-800 cursor-pointer"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="glass-pill border border-black/10 rounded-3xl p-5 absolute top-16 left-4 right-4 max-w-lg mx-auto pointer-events-auto md:hidden shadow-2xl flex flex-col gap-4 bg-white text-left no-scrollbar"
          >
            <div className="flex flex-col gap-2 text-left">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-slate-800 hover:text-purple-600 py-1 transition-colors font-mono"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex flex-col gap-2 text-left font-mono text-xs text-slate-600">
              <a href="tel:+917995781051" className="hover:text-purple-600 flex items-center gap-2">
                <Phone size={13} className="text-cyan-600" /> +91 79957 81051
              </a>
              <a href="mailto:devbyshafi@gmail.com" className="hover:text-purple-600 flex items-center gap-2">
                <Mail size={13} className="text-purple-600" /> devbyshafi@gmail.com
              </a>
              <a href="https://github.com/Shafialam7" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 flex items-center gap-2">
                <Github size={13} className="text-rose-600" /> github.com/Shafialam7
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
