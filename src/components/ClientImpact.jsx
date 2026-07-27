import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Layers, Award, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

const kpis = [
  {
    value: '40%',
    label: 'Speed Boost',
    description: 'Average frontend page load speed acceleration achieved via bundle splitting and WebP compression.',
    icon: <Zap className="w-5 h-5 text-cyan-600" />,
    color: 'border-cyan-200 bg-cyan-50/60',
    valueColor: 'text-cyan-600',
  },
  {
    value: '99.98%',
    label: 'System Uptime',
    description: 'Production system reliability built with graceful error boundaries, health probes, and logging.',
    icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
    color: 'border-purple-200 bg-purple-50/60',
    valueColor: 'text-purple-600',
  },
  {
    value: '12+',
    label: 'API Integrations',
    description: 'Seamless third-party flight search APIs, payment gateways, and visa status tracking webhooks.',
    icon: <Layers className="w-5 h-5 text-emerald-600" />,
    color: 'border-emerald-200 bg-emerald-50/60',
    valueColor: 'text-emerald-600',
  },
  {
    value: '100%',
    label: 'On-Time Delivery',
    description: 'Proven commercial delivery record across platforms at Veronn Tourism and Axis Visa Services.',
    icon: <Award className="w-5 h-5 text-rose-600" />,
    color: 'border-rose-200 bg-rose-50/60',
    valueColor: 'text-rose-600',
  },
];

export default function ClientImpact() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-cyan-600 font-bold block mb-2">
          // Proven Impact & Performance Metrics
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space text-gradient-vibrant">
          Client Trust & Engineering Impact
        </h2>
        <p className="text-slate-600 text-xs max-w-xl mx-auto mt-2 font-mono">
          Measurable technical achievements delivered across production platforms for <strong className="text-purple-800">Veronn Tourism</strong> and <strong className="text-cyan-800">Axis Visa Services</strong>.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            key={index}
            className={`glass-panel tilt-card p-6 rounded-3xl border text-left flex flex-col justify-between shadow-lg ${kpi.color}`}
          >
            <div>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200/80">
                <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  {kpi.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-slate-800 border border-slate-200 shadow-sm">
                  VERIFIED KPI
                </span>
              </div>

              <span className={`text-4xl font-extrabold font-space block mb-1 ${kpi.valueColor}`}>
                {kpi.value}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mb-2 font-space">
                {kpi.label}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {kpi.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-700">
              <CheckCircle2 size={12} className="text-emerald-600" />
              <span>Production Proven</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
