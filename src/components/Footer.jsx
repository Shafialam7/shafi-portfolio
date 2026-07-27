import { Terminal, Phone, Mail, Globe, GitBranch, Heart, ArrowUp, Sparkles, Building2, ArrowRight } from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram } from './BrandIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 font-mono pt-16 pb-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Top System Status Bar */}
        <div className="flex flex-wrap justify-between items-center pb-8 mb-12 border-b border-slate-200 gap-4 text-xs">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-900 font-space text-sm">All Systems Operational</span>
            <span className="text-slate-400 font-mono text-[11px]">• 99.98% Uptime SLA</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-purple-600 transition-colors p-2 rounded-xl bg-slate-100 border border-slate-200 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 text-left mb-14">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="text-base font-extrabold tracking-tight flex items-center gap-2 font-space text-slate-900">
              <span className="text-gradient-vibrant font-bold text-lg">&lt;Shafi.dev /&gt;</span>
            </a>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Full-Stack Software Engineer with <strong className="text-slate-900 font-bold">3+ years of commercial experience</strong> engineering production web platforms at <strong className="text-purple-800 font-bold">Veronn Tourism</strong> and <strong className="text-cyan-800 font-bold">Axis Visa Services</strong>. Pursuing BCA.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/Shafialam7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-600 transition-colors border border-slate-200"
              >
                <Github size={16} />
              </a>
              <a href="https://www.linkedin.com/in/mohammed-shafi-122171197" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-600 transition-colors border border-slate-200"><Linkedin size={16} /></a>
              <a href="https://www.instagram.com/192.168.7.5.26?igsh=MWsxOW9mY3AxNmw2Yg==" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-600 transition-colors border border-slate-200"><Instagram size={16} /></a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-space">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#home" className="hover:text-purple-600 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-purple-600 transition-colors">About & Experience</a></li>
              <li><a href="#skills" className="hover:text-purple-600 transition-colors">Skills & Tech Stack</a></li>
              <li><a href="#projects" className="hover:text-purple-600 transition-colors">Featured Projects</a></li>
              <li><a href="#services" className="hover:text-purple-600 transition-colors">Services API</a></li>
              <li><a href="#contact" className="hover:text-purple-600 transition-colors">Contact Me</a></li>
              <li><a href="/admin" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-bold hover:underline flex items-center gap-1"><span>⚡ Owner Admin Panel</span></a></li>
            </ul>
          </div>

          {/* Column 3: Production Companies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-space">
              Company Systems
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="https://veronntourism.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-2.5 rounded-xl bg-purple-50/60 border border-purple-200 hover:border-purple-300 transition-all"
                >
                  <span className="font-bold text-purple-900 group-hover:text-purple-600 flex items-center gap-1.5">
                    <Building2 size={13} /> Veronn Tourism
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Travel Booking Engine</span>
                </a>
              </li>
              <li>
                <a
                  href="https://axisvisaservices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-2.5 rounded-xl bg-cyan-50/60 border border-cyan-200 hover:border-cyan-300 transition-all"
                >
                  <span className="font-bold text-cyan-900 group-hover:text-cyan-600 flex items-center gap-1.5">
                    <Building2 size={13} /> Axis Visa Services
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Visa Status Tracker Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-space">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="mailto:devbyshafi@gmail.com" className="flex items-center gap-2 text-slate-800 hover:text-purple-600 transition-colors">
                  <Mail size={14} className="text-purple-600" />
                  <span>devbyshafi@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+917995781051" className="flex items-center gap-2 text-slate-800 hover:text-cyan-600 transition-colors">
                  <Phone size={14} className="text-cyan-600" />
                  <span>+91 79957 81051</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Shafialam7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-800 hover:text-rose-600 transition-colors">
                  <Globe size={14} className="text-rose-600" />
                  <span>github.com/Shafialam7</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-slate-200 flex flex-wrap justify-between items-center text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Shafi Alam. All rights reserved.</p>
          <div className="flex items-center gap-2 font-mono">
            <span>Built with React, Tailwind CSS & Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
