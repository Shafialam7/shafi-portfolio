import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

export default function PoeticQuote() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl border border-purple-300 bg-white/95 shadow-xl relative overflow-hidden text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600">
            <Quote size={28} />
          </div>
        </div>

        <blockquote className="text-base sm:text-xl font-bold font-space text-slate-900 max-w-3xl mx-auto leading-relaxed mb-6">
          "Code is not just logic written for machines—it is the art of translating vision into seamless digital reality. Every system I build is engineered with precision, designed for scale, and crafted to empower business growth."
        </blockquote>

        <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold">
          <Sparkles size={14} className="text-purple-600" />
          <span className="text-gradient-vibrant font-bold">Shafi Alam • Full-Stack Software Engineer (3+ Yrs Exp)</span>
        </div>
      </motion.div>
    </section>
  );
}
