import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Wrench, Globe, Cpu, Smartphone, Database, Layers } from 'lucide-react';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    icon: <Layout size={16} className="text-cyan-600" />,
    gradient: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'React.js', level: 92, type: 'UI Library' },
      { name: 'JavaScript (ES6+)', level: 95, type: 'Core Language' },
      { name: 'Tailwind CSS v4', level: 92, type: 'Design System' },
      { name: 'HTML5 & CSS3', level: 95, type: 'Markup & Layout' },
      { name: 'Framer Motion', level: 88, type: 'Animation Engine' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Database Architecture',
    icon: <Server size={16} className="text-purple-600" />,
    gradient: 'from-purple-500 to-rose-500',
    skills: [
      { name: 'Node.js', level: 88, type: 'Runtime Environment' },
      { name: 'Express.js', level: 90, type: 'REST API Framework' },
      { name: 'PostgreSQL', level: 85, type: 'Relational Database' },
      { name: 'MongoDB', level: 82, type: 'Document Database' },
      { name: 'REST & GraphQL APIs', level: 94, type: 'API Protocol' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Cloud Ecosystem',
    icon: <Wrench size={16} className="text-rose-600" />,
    gradient: 'from-rose-500 to-amber-500',
    skills: [
      { name: 'Git & GitHub', level: 92, type: 'Version Control' },
      { name: 'Docker', level: 75, type: 'Containerization' },
      { name: 'Vite & Webpack', level: 88, type: 'Bundlers' },
      { name: 'Vercel / Netlify', level: 90, type: 'Cloud Hosting' },
      { name: 'Linux Terminal', level: 82, type: 'OS & CLI' },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const activeData = skillCategories.find((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-cyan-600 font-bold block mb-2">
          // 03. Core Competencies & Tech Stack
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space text-gradient-vibrant">
          Skills & Technical Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category Selector Tabs */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl w-full text-left font-bold text-xs transition-all whitespace-nowrap lg:whitespace-normal border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="font-space">{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skill Progress Inspector Window */}
        <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border border-slate-200 text-left min-h-[360px] flex flex-col justify-between shadow-xl bg-white/90">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-200 text-xs">
            <span className="text-purple-700 font-bold flex items-center gap-2 font-space">
              <Layers size={15} /> {activeData.title}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Technical Proficiency Matrix</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {activeData.skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-800">
                      <span className="font-bold">{skill.name}</span>{' '}
                      <span className="text-slate-500 text-[10px]">({skill.type})</span>
                    </span>
                    <span className="text-purple-600 font-mono font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${activeData.gradient} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200 font-semibold text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-cyan-600" /> <span>SEO Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-purple-600" /> <span>High Speed</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone size={14} className="text-rose-600" /> <span>Responsive UI</span>
            </div>
            <div className="flex items-center gap-2">
              <Database size={14} className="text-amber-600" /> <span>Type Safe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
