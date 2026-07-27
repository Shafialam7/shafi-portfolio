import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Cpu, Settings, Database, BarChart, ShieldCheck, Code } from 'lucide-react';

const servicesData = [
  {
    icon: <Globe size={18} className="text-cyan-600" />,
    func: 'createFullStackApp()',
    title: 'Full-Stack Web Engineering',
    colorStyle: 'border-cyan-300 bg-cyan-50/40 hover:border-cyan-400',
    badgeStyle: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    description: 'Developing end-to-end applications backed by 3+ years of experience with React, Node.js, and high-performance databases.',
    tags: ['React.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    snippet: `async function createFullStackApp(spec: AppSpec): Promise<DeploymentResult> {
  const frontend = await buildReactUI(spec.frontend);
  const backend = await initExpressServer(spec.backend);
  const db = await connectPostgreSQL(spec.database);
  return { status: "200 OK", appUrl: spec.domain, latency: "14ms" };
}`,
  },
  {
    icon: <Cpu size={18} className="text-purple-600" />,
    func: 'architectTravelVisaPortal()',
    title: 'Custom Travel & Visa Portals',
    colorStyle: 'border-purple-300 bg-purple-50/40 hover:border-purple-400',
    badgeStyle: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Architecting specialized industry software like booking engines, itinerary builders, and visa status tracking portals.',
    tags: ['Veronn Tourism System', 'Axis Visa Engine', 'REST APIs'],
    snippet: `function architectTravelVisaPortal(config: EnterprisePortalConfig): PortalService {
  const bookingEngine = new TravelBookingEngine(config.veronnTourism);
  const visaTracker = new VisaStatusTracker(config.axisVisaServices);
  return { bookingEngine, visaTracker, activeIntegrations: 12 };
}`,
  },
  {
    icon: <Settings size={18} className="text-rose-600" />,
    func: 'buildRestfulApi()',
    title: 'RESTful API Services',
    colorStyle: 'border-rose-300 bg-rose-50/40 hover:border-rose-400',
    badgeStyle: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Designing modular, scalable backend logic and RESTful APIs using Express and Node.js for high throughput and security.',
    tags: ['Express.js', 'JSON Web Tokens', 'Rate Limiting', 'OpenAPI'],
    snippet: `function buildRestfulApi(routes: RouteDefinition[]): ExpressRouter {
  const router = Express.Router();
  router.use(cors(), express.json(), rateLimiter());
  routes.forEach(r => router[r.method](r.path, r.handler));
  return router;}`,
  },
  {
    icon: <Database size={18} className="text-amber-600" />,
    func: 'optimizeDatabaseSchema()',
    title: 'Database Architecture',
    colorStyle: 'border-amber-300 bg-amber-50/40 hover:border-amber-400',
    badgeStyle: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Modeling schemas and optimizing query configurations in PostgreSQL and MongoDB for data integrity and speed.',
    tags: ['PostgreSQL', 'MongoDB', 'Query Indexing', 'ACID Transactions'],
    snippet: `async function optimizeDatabaseSchema(orm: ORMClient): Promise<QueryMetrics> {
  await orm.migration.applyLatest();
  const indexes = await orm.index.create(["user_id", "created_at"]);
  return { queryTime: "2.4ms", connectionPool: 20, status: "HEALTHY" };
}`,
  },
  {
    icon: <BarChart size={18} className="text-emerald-600" />,
    func: 'auditWebPerformance()',
    title: 'Speed & SEO Performance',
    colorStyle: 'border-emerald-300 bg-emerald-50/40 hover:border-emerald-400',
    badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Optimizing web vitals, bundle splitting, structural markup, and responsive layouts to maximize search rankings.',
    tags: ['Google Lighthouse 98+', 'Bundle Splitting', 'Web Vitals'],
    snippet: `function auditWebPerformance(url: string): AuditReport {
  const vitals = measureLCPAndCLS(url);
  const seoScore = checkStructuredDataMarkup(url);
  return { lighthousePerformance: 99, seoScore: 100, fcp: "0.6s" };
}`,
  },
  {
    icon: <ShieldCheck size={18} className="text-blue-600" />,
    func: 'deployCicdPipeline()',
    title: 'Cloud & CI/CD Deployment',
    colorStyle: 'border-blue-300 bg-blue-50/40 hover:border-blue-400',
    badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Automating build pipelines, environment credentials, and cloud platform deployments on Vercel, Netlify, and Docker.',
    tags: ['Vercel', 'Docker', 'GitHub Actions', 'SSL Security'],
    snippet: `async function deployCicdPipeline(repo: GitRepo): Promise<DeployStatus> {
  await runAutomatedBuildTests(repo);
  const container = await buildDockerImage(repo);
  return await pushToProductionCluster(container);
}`,
  },
];

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold block mb-2">
          // 04. Service Specification & API Endpoints
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space text-gradient-vibrant">
          services.api.ts
        </h2>
        <p className="text-slate-600 text-xs max-w-xl mx-auto mt-2 font-mono">
          Click any service card below to inspect its live TypeScript function signature and implementation snippet!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={index}
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className={`glass-panel tilt-card p-6 rounded-3xl border text-left flex flex-col justify-between shadow-lg cursor-pointer transition-all ${service.colorStyle}`}
            >
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200/80">
                  <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    {service.icon}
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${service.badgeStyle}`}>
                    <Code size={11} /> {service.func}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 font-space">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                  {service.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-white text-slate-800 rounded-md border border-slate-200 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable Code Snippet */}
              <div className="pt-3 border-t border-slate-200/80">
                <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold mb-2">
                  <span>TypeScript Signature</span>
                  <span>{isExpanded ? 'Hide Code ▲' : 'View Code ▼'}</span>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="p-3 bg-[#0a0f1d] rounded-xl border border-stone-800 overflow-x-auto code-scroll text-[10px] text-cyan-300 leading-relaxed font-mono"
                    >
                      <pre><code>{service.snippet}</code></pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
