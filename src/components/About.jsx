import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Building2, CheckCircle2, Award } from 'lucide-react';

const timelineData = [
  {
    type: 'experience',
    role: 'Full-Stack Software Engineer',
    company: 'Veronn Tourism',
    description: 'Engineered luxury travel booking engines, itinerary configurators, and automated flight search REST API integrations. Optimized client page load performance by 40%.',
    badge: 'Company Position',
    cardStyle: 'border-purple-300 bg-purple-50/70',
    iconStyle: 'bg-purple-100 text-purple-700 border-purple-200',
    tagStyle: 'bg-purple-100 text-purple-800 border-purple-200',
    checkColor: 'text-purple-600',
    highlights: ['Travel Booking Engine', 'Flight API Integration', 'Itinerary Builder'],
  },
  {
    type: 'experience',
    role: 'Full-Stack Software Engineer',
    company: 'Axis Visa Services',
    description: 'Architected global visa status tracking engine, country document verification workflow, appointment booking calendars, and status notification microservices.',
    badge: 'Company Position',
    cardStyle: 'border-cyan-300 bg-cyan-50/70',
    iconStyle: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    tagStyle: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    checkColor: 'text-cyan-600',
    highlights: ['Visa Tracker Portal', 'Document Verification', 'Appointment Scheduler'],
  },
  {
    type: 'education',
    role: 'Bachelor of Computer Applications (BCA)',
    company: 'Undergraduate Program',
    period: 'Ongoing / Pursuing',
    description: 'Specializing in Web Engineering, Software Architecture, Database Systems, Data Structures, and Algorithmic Complexity.',
    badge: 'Higher Education',
    cardStyle: 'border-blue-300 bg-blue-50/70',
    iconStyle: 'bg-blue-100 text-blue-700 border-blue-200',
    tagStyle: 'bg-blue-100 text-blue-800 border-blue-200',
    checkColor: 'text-blue-600',
    highlights: ['Software Engineering', 'Database Architecture', 'Web Systems'],
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold block mb-2">
          // 01. Background & Experience
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space text-gradient-vibrant">
          About Me & Company Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio & Stats */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="glass-panel p-7 rounded-3xl border border-slate-200 space-y-4 bg-white/90 shadow-xl">
            <div className="flex items-center gap-2.5 mb-1 text-purple-600">
              <Award size={18} />
              <h3 className="text-base font-bold text-slate-900 font-space">
                Full-Stack Software Engineer
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Driven software engineer with <strong className="text-purple-700 font-bold">3+ years of commercial development experience</strong>. Specialized in building high-throughput web applications, clean React frontends, scalable Node.js microservices, and optimized PostgreSQL/MongoDB databases.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Proven experience engineering production software at <strong className="text-purple-800 font-bold">Veronn Tourism</strong> and <strong className="text-cyan-800 font-bold">Axis Visa Services</strong>. Pursuing BCA.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 rounded-2xl text-left border border-purple-200 bg-purple-50/50">
              <span className="text-3xl font-extrabold text-purple-600 font-mono block mb-1">3+</span>
              <span className="text-xs font-bold text-slate-800 font-space block">Years Commercial Exp</span>
              <span className="text-[10px] text-purple-700 font-mono">Full-Stack Engineering</span>
            </div>

            <div className="glass-panel p-5 rounded-2xl text-left border border-cyan-200 bg-cyan-50/50">
              <span className="text-3xl font-extrabold text-cyan-600 font-mono block mb-1">2+</span>
              <span className="text-xs font-bold text-slate-800 font-space block">Companies Worked</span>
              <span className="text-[10px] text-cyan-700 font-mono">Veronn & Axis Visa</span>
            </div>
          </div>
        </div>

        {/* Right Column: Color-Coded Timeline Cards */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-panel tilt-card p-6 rounded-3xl border shadow-lg ${item.cardStyle}`}
            >
              <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-2xl border ${item.iconStyle}`}>
                    {item.type === 'experience' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 font-space">
                      {item.role}
                    </h4>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Building2 size={13} /> {item.company}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${item.tagStyle}`}>
                  {item.period || item.badge}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">
                {item.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200/80">
                {item.highlights.map((hl) => (
                  <span key={hl} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/90 text-slate-800 font-semibold border border-slate-200 flex items-center gap-1 shadow-sm">
                    <CheckCircle2 size={11} className={item.checkColor} />
                    {hl}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
