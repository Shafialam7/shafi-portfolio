import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Plane, Globe, Layers, ShoppingBag, Building2 } from 'lucide-react';

const projectsData = [
  {
    id: 'veronn',
    title: 'Veronn Tourism - Travel Engine',
    category: 'companies',
    websiteUrl: 'https://veronntourism.com',
    description: 'Production luxury travel platform engineered at Veronn Tourism. Features interactive destination package configurators, flight API integrations, real-time trip cost calculators, and instant booking reservation systems.',
    icon: <Plane className="w-5 h-5 text-purple-600" />,
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'REST API', 'Node.js'],
    badge: 'Veronn Tourism (Company Position)',
    cardStyle: 'border-purple-300 bg-purple-50/50 hover:border-purple-400',
    badgeStyle: 'bg-purple-100 text-purple-800 border-purple-200',
    buttonStyle: 'bg-purple-600 hover:bg-purple-700 text-white',
    linkStyle: 'border-purple-200 bg-purple-100/70 text-purple-800 hover:bg-purple-200',
    isCompany: true
  },
  {
    id: 'axis-visa',
    title: 'Axis Visa Services Portal',
    category: 'companies',
    websiteUrl: 'https://axisvisaservices.com',
    description: 'Enterprise global visa processing portal engineered at Axis Visa Services. Features country eligibility lookups, step-by-step document verification checklists, appointment schedulers, and status tracking.',
    icon: <Globe className="w-5 h-5 text-cyan-600" />,
    tech: ['React.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Lucide React'],
    badge: 'Axis Visa Services (Company Position)',
    cardStyle: 'border-cyan-300 bg-cyan-50/50 hover:border-cyan-400',
    badgeStyle: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    buttonStyle: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    linkStyle: 'border-cyan-200 bg-cyan-100/70 text-cyan-800 hover:bg-cyan-200',
    isCompany: true
  },
  {
    id: 'extensions',
    title: 'Browser Extensions Manager',
    category: 'apps',
    description: 'Developer-focused browser extension management hub. Features one-click toggle switches, active RAM memory profiling, security permissions auditing, and extension sandbox tester.',
    icon: <Layers className="w-5 h-5 text-amber-600" />,
    tech: ['React.js', 'WebExtension API', 'Tailwind CSS', 'Framer Motion'],
    badge: 'Developer Tool Suite',
    cardStyle: 'border-amber-300 bg-amber-50/50 hover:border-amber-400',
    badgeStyle: 'bg-amber-100 text-amber-800 border-amber-200',
    buttonStyle: 'bg-amber-600 hover:bg-amber-700 text-white',
    isCompany: false
  },
  {
    id: 'ecommerce',
    title: 'Modern E-Commerce Platform',
    category: 'apps',
    description: 'Full-featured digital storefront with optimized product browsing, stateful cart mechanics, filterable product catalogs, and checkout simulation.',
    icon: <ShoppingBag className="w-5 h-5 text-rose-600" />,
    tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    badge: 'Storefront UI System',
    cardStyle: 'border-rose-300 bg-rose-50/50 hover:border-rose-400',
    badgeStyle: 'bg-rose-100 text-rose-800 border-rose-200',
    buttonStyle: 'bg-rose-600 hover:bg-rose-700 text-white',
    isCompany: false
  }
];

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : filter === 'companies'
    ? projectsData.filter(p => p.isCompany)
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold block mb-2">
          // 02. Company Systems & Core Modules
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space text-gradient-vibrant">
          Featured Systems & Company Work
        </h2>
        <p className="text-slate-600 text-xs max-w-xl mx-auto mt-2 font-mono">
          Production systems engineered during employment at <strong className="text-purple-800">Veronn Tourism</strong> and <strong className="text-cyan-800">Axis Visa Services</strong>. Click <strong className="text-purple-800">Live Demo</strong> for interactive previews!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap text-xs">
        {[
          { id: 'all', label: 'All Featured Work (4)' },
          { id: 'companies', label: 'Company Systems (Veronn & Axis)' },
          { id: 'apps', label: 'Utility Applications' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border ${
              filter === cat.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid: 2x2 Color-Coded Clean Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className={`glass-panel tilt-card rounded-3xl p-6 flex flex-col justify-between h-full border text-left shadow-xl ${project.cardStyle}`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex justify-between items-start gap-4 mb-4 pb-3 border-b border-slate-200/80">
                  <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    {project.icon}
                  </div>

                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${project.badgeStyle}`}>
                    {project.isCompany && <Building2 size={11} />}
                    {project.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 font-space">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 bg-white text-slate-800 rounded-md border border-slate-200 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions: Live Demo + Website Link for Companies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200/80">
                  {project.websiteUrl ? (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl border transition-colors ${project.linkStyle}`}
                    >
                      <Globe size={14} />
                      <span>Visit Website</span>
                    </a>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  <button
                    onClick={() => onSelectProject(project)}
                    className={`flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-md w-full ${project.buttonStyle}`}
                  >
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
