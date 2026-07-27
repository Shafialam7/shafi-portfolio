import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Database, Cloud, ArrowRight, CheckCircle2, ShieldCheck, Cpu, Code2 } from 'lucide-react';

const tiers = [
  {
    id: 'frontend',
    name: '01. Frontend Tier',
    title: 'Client UI & State Engine',
    icon: <Layout className="w-5 h-5 text-cyan-600" />,
    color: 'border-cyan-300 bg-cyan-50/60 text-cyan-800',
    badge: 'React.js + Tailwind CSS',
    specs: ['Virtual DOM Reconciliation', 'Responsive Mobile-First Layouts', 'Framer Motion Animations', 'TypeScript Strict Props'],
    details: 'Constructed using modern React patterns, custom hooks, and utility-first Tailwind CSS. Ensures Lighthouse performance scores of 95+ and instant user interactions.',
    snippet: `// React UI Layer Architecture
const AppView = () => {
  const { data, isLoading } = useQuery(["apiData"], fetchLiveData);
  return <ResponsiveGrid items={data} animated={true} />;
};`
  },
  {
    id: 'api',
    name: '02. API Gateway Tier',
    title: 'Express REST & Business Logic',
    icon: <Server className="w-5 h-5 text-purple-600" />,
    color: 'border-purple-300 bg-purple-50/60 text-purple-800',
    badge: 'Node.js + Express.js',
    specs: ['Modular Route Handlers', 'JWT Authentication & Rate Limiting', 'Async Middleware Pipelines', 'CORS & Security Headers'],
    details: 'Scalable backend API architecture engineered with Express.js. Implements robust request validation, rate limiting, and centralized error logging.',
    snippet: `// Express API Router Setup
const router = Express.Router();
router.use(jwtAuth, rateLimiter(100));
router.post("/api/v1/booking", createBookingHandler);`
  },
  {
    id: 'database',
    name: '03. Data Persistence Tier',
    title: 'PostgreSQL & MongoDB Databases',
    icon: <Database className="w-5 h-5 text-emerald-600" />,
    color: 'border-emerald-300 bg-emerald-50/60 text-emerald-800',
    badge: 'PostgreSQL + MongoDB',
    specs: ['ACID Transaction Integrity', 'B-Tree Query Indexing', 'JSON B Document Collections', 'ORMs (Prisma / Mongoose)'],
    details: 'Relational data modeling in PostgreSQL for strict financial/booking records, combined with MongoDB for flexible JSON content stores.',
    snippet: `// PostgreSQL Query Optimization
const userBooking = await db.query(
  "SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC",
  [userId]
);`
  },
  {
    id: 'devops',
    name: '04. Deployment Tier',
    title: 'Cloud & CI/CD Pipelines',
    icon: <Cloud className="w-5 h-5 text-amber-600" />,
    color: 'border-amber-300 bg-amber-50/60 text-amber-800',
    badge: 'Docker + Vercel + GitHub Actions',
    specs: ['Automated Build Testing', 'Docker Containerization', 'Zero-Downtime Deployments', 'SSL & Environment Secrets'],
    details: 'Automated CI/CD workflows triggered on git push to run unit tests and automatically push production artifacts to cloud servers.',
    snippet: `// Docker Deployment Workflow
name: CI/CD Pipeline
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps: [{ uses: 'actions/checkout@v3' }]`
  }
];

export default function ArchitectureDiagram() {
  const [selectedTier, setSelectedTier] = useState(tiers[0]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold block mb-2">
          // Interactive System Visualizer
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space text-gradient-vibrant">
          Full-Stack Architecture Blueprints
        </h2>
        <p className="text-slate-600 text-xs max-w-xl mx-auto mt-2 font-mono">
          Click any architectural tier below to inspect Shafi's engineering design patterns, tech specifications, and code snippets!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual Tier Flow */}
        <div className="lg:col-span-6 space-y-4 text-left">
          {tiers.map((tier) => {
            const isSelected = selectedTier.id === tier.id;
            return (
              <motion.div
                key={tier.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedTier(tier)}
                className={`glass-panel p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-md ${
                  isSelected
                    ? 'border-purple-500 bg-white ring-2 ring-purple-400/30'
                    : 'border-slate-200 bg-white/90 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    {tier.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono">
                      {tier.name}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 font-space">
                      {tier.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${tier.color}`}>
                    {tier.badge}
                  </span>
                  <ArrowRight size={14} className={isSelected ? 'text-purple-600' : 'text-slate-400'} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Inspector Details Window */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTier.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 rounded-3xl border border-slate-300 text-left bg-white/95 shadow-xl space-y-6"
            >
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
                    {selectedTier.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-700 block font-mono">
                      {selectedTier.name}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-space">
                      {selectedTier.title}
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-white shadow-sm">
                  ACTIVE SPEC
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {selectedTier.details}
              </p>

              {/* Specs Grid */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold uppercase text-slate-500 block font-mono">
                  Key Technical Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTier.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-1.5 text-xs text-slate-800 font-semibold bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <CheckCircle2 size={13} className="text-purple-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="pt-2 font-mono">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5 flex items-center gap-1">
                  <Code2 size={12} className="text-purple-600" /> Implementation Pattern:
                </span>
                <div className="p-3.5 bg-[#0a0f1d] rounded-2xl border border-stone-800 text-cyan-300 text-[10px] leading-relaxed overflow-x-auto code-scroll font-mono">
                  <pre><code>{selectedTier.snippet}</code></pre>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
