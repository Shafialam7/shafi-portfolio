import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Globe, ToggleLeft, ToggleRight, Plane, Building2, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/40 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-black/10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Modal Header Bar with Apple Window Dots */}
          <div className="px-6 py-4 border-b border-black/5 flex justify-between items-center bg-white/90">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              </div>
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                {project.icon || <Globe size={18} />}
              </span>
              <div className="text-left">
                <h3 className="text-base font-bold text-stone-900 font-space">
                  {project.title}
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold uppercase tracking-wider flex items-center gap-1">
                  {project.isCompany && <Building2 size={11} />}
                  {project.badge || 'Interactive Application Demo'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-grow text-left space-y-6 bg-white/60">
            {project.id === 'veronn' && <VeronnDemo />}
            {project.id === 'axis-visa' && <AxisVisaDemo />}
            {project.id === 'extensions' && <ExtensionsDemo />}
            {project.id !== 'veronn' && project.id !== 'axis-visa' && project.id !== 'extensions' && (
              <GenericDemo project={project} />
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-black/5 bg-white/90 flex justify-between items-center">
            <span className="text-xs text-stone-400 font-mono">
              Production System Simulated Demo • Shafi Alam Portfolio
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              Close Demo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. Veronn Tourism Demo                                                     */
/* -------------------------------------------------------------------------- */
function VeronnDemo() {
  const [selectedDest, setSelectedDest] = useState('Maldives');
  const [nights, setNights] = useState(5);
  const [guests, setGuests] = useState(2);
  const [flightAddon, setFlightAddon] = useState(true);
  const [booked, setBooked] = useState(false);

  const destinations = [
    { name: 'Maldives', pricePerNight: 280, tag: 'Luxury Beach', image: '🏝️' },
    { name: 'Swiss Alps', pricePerNight: 350, tag: 'Mountain Retreat', image: '🏔️' },
    { name: 'Tokyo', pricePerNight: 220, tag: 'Urban Culture', image: '🏯' },
    { name: 'Santorini', pricePerNight: 310, tag: 'Island Paradise', image: '🌅' },
  ];

  const current = destinations.find((d) => d.name === selectedDest);
  const flightCost = flightAddon ? 450 * guests : 0;
  const totalPrice = current.pricePerNight * nights * guests + flightCost;

  const handleBook = () => {
    setBooked(true);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Building2 size={16} className="text-emerald-600" />
          <h4 className="font-bold text-stone-900 text-base font-space">
            Veronn Tourism - Luxury Booking Configurator
          </h4>
        </div>
        <p className="text-xs text-stone-600 font-medium">
          Simulated live luxury booking engine engineered during my employment at Veronn Tourism.
        </p>
      </div>

      {/* Destinations Grid */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3 font-mono">
          Select Destination
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {destinations.map((dest) => (
            <button
              key={dest.name}
              onClick={() => { setSelectedDest(dest.name); setBooked(false); }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedDest === dest.name
                  ? 'border-emerald-600 bg-emerald-500/10 shadow-sm'
                  : 'border-black/5 hover:border-black/20 bg-white'
              }`}
            >
              <span className="text-2xl block mb-2">{dest.image}</span>
              <span className="font-bold text-sm block text-stone-900 font-space">{dest.name}</span>
              <span className="text-xs text-stone-400 block font-mono">${dest.pricePerNight}/night</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 glass-panel p-5 rounded-2xl border border-black/5 bg-white">
        <div>
          <label className="text-xs font-semibold text-stone-400 block mb-2 font-mono">Duration (Nights)</label>
          <input
            type="range"
            min="1"
            max="14"
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <span className="text-sm font-bold text-stone-800 mt-1 block font-mono">{nights} Nights</span>
        </div>

        <div>
          <label className="text-xs font-semibold text-stone-400 block mb-2 font-mono">Guests</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="px-3 py-1 rounded-lg bg-stone-100 font-bold"
            >-</button>
            <span className="font-bold text-sm font-mono">{guests} Person(s)</span>
            <button
              onClick={() => setGuests(guests + 1)}
              className="px-3 py-1 rounded-lg bg-stone-100 font-bold"
            >+</button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <label className="text-xs font-semibold text-stone-400 block mb-2 font-mono">Flight Add-On</label>
          <button
            onClick={() => setFlightAddon(!flightAddon)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              flightAddon ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30' : 'bg-stone-100 text-stone-400'
            }`}
          >
            <Plane size={14} />
            <span>{flightAddon ? 'Included (+$450/pp)' : 'Add Flights'}</span>
          </button>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 flex flex-wrap justify-between items-center gap-4 bg-white">
        <div>
          <span className="text-[10px] text-stone-400 block uppercase font-bold tracking-wider font-mono">Total Estimated Price</span>
          <span className="text-3xl font-extrabold text-emerald-600 font-mono">${totalPrice.toLocaleString()}</span>
        </div>

        <button
          onClick={handleBook}
          disabled={booked}
          className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer"
        >
          {booked ? '✓ Booking Reserved!' : 'Confirm Reservation'}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Axis Visa Services Demo                                                 */
/* -------------------------------------------------------------------------- */
function AxisVisaDemo() {
  const [selectedCountry, setSelectedCountry] = useState('Schengen (Europe)');
  const [checkedDocs, setCheckedDocs] = useState({
    passport: true,
    photo: true,
    bankStatement: false,
    invitation: false,
  });

  const countries = [
    { id: 'Schengen (Europe)', fee: '$120', processingTime: '7-10 Days', successRate: '98%' },
    { id: 'United States', fee: '$185', processingTime: '12-15 Days', successRate: '95%' },
    { id: 'United Kingdom', fee: '$150', processingTime: '5-8 Days', successRate: '97%' },
    { id: 'Canada', fee: '$140', processingTime: '10-14 Days', successRate: '96%' },
  ];

  const current = countries.find((c) => c.id === selectedCountry);

  const toggleDoc = (key) => {
    setCheckedDocs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalChecked = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = (totalChecked / 4) * 100;

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Building2 size={16} className="text-emerald-600" />
          <h4 className="font-bold text-stone-900 text-base font-space">
            Axis Visa Services - Processing & Readiness Checker
          </h4>
        </div>
        <p className="text-xs text-stone-600 font-medium">
          Simulated visa application tracker engineered during my employment at Axis Visa Services.
        </p>
      </div>

      {/* Country Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase text-stone-400 block mb-2 font-mono">Destination Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 font-semibold text-xs focus:outline-none focus:border-emerald-600 cursor-pointer"
          >
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.id}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center items-center glass-panel p-3 rounded-xl border border-black/5 bg-white">
          <div>
            <span className="text-[10px] text-stone-400 block font-mono">Govt Fee</span>
            <span className="text-xs font-bold text-emerald-600 font-mono">{current.fee}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block font-mono">Time</span>
            <span className="text-xs font-bold text-stone-700 font-mono">{current.processingTime}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block font-mono">Approval</span>
            <span className="text-xs font-bold text-emerald-600 font-mono">{current.successRate}</span>
          </div>
        </div>
      </div>

      {/* Readiness Checklist */}
      <div className="glass-panel p-5 rounded-2xl space-y-4 border border-black/5 bg-white">
        <div className="flex justify-between items-center border-b border-black/5 pb-3">
          <h5 className="font-bold text-xs text-stone-900 font-space">Document Readiness Verification</h5>
          <span className="text-xs font-bold text-emerald-600 font-mono">{totalChecked} / 4 Verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'passport', label: 'Valid Passport (6+ months remaining)' },
            { id: 'photo', label: 'Biometric Passport Photo' },
            { id: 'bankStatement', label: 'Official Bank Proof of Funds' },
            { id: 'invitation', label: 'Travel Itinerary & Flight Proof' },
          ].map((doc) => (
            <button
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                checkedDocs[doc.id]
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700'
                  : 'bg-stone-50 border-black/5 text-stone-500'
              }`}
            >
              <span className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                checkedDocs[doc.id] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-400'
              }`}>
                {checkedDocs[doc.id] && <Check size={10} />}
              </span>
              <span>{doc.label}</span>
            </button>
          ))}
        </div>

        <div className="pt-2">
          <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Extensions Manager Demo                                                 */
/* -------------------------------------------------------------------------- */
function ExtensionsDemo() {
  const [extensions, setExtensions] = useState([
    { id: 'adblock', name: 'AdBlock Pro Ultra', active: true, ram: '42 MB', version: 'v3.4.1', icon: '🛡️' },
    { id: 'devtools', name: 'React Developer Tools', active: true, ram: '28 MB', version: 'v5.2.0', icon: '⚛️' },
    { id: 'darkreader', name: 'Dark Reader Theme', active: false, ram: '0 MB', version: 'v4.9.2', icon: '🌙' },
    { id: 'password', name: 'Vault Password Manager', active: true, ram: '18 MB', version: 'v2.1.0', icon: '🔑' },
  ]);

  const toggleExtension = (id) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.id === id
          ? {
              ...ext,
              active: !ext.active,
              ram: !ext.active ? `${Math.floor(Math.random() * 30 + 15)} MB` : '0 MB',
            }
          : ext
      )
    );
  };

  const activeCount = extensions.filter((e) => e.active).length;
  const totalRam = extensions.reduce((acc, curr) => acc + parseInt(curr.ram || '0'), 0);

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
        <h4 className="font-bold text-stone-900 text-base mb-1 font-space">
          Browser Extensions Suite - Live Control Console
        </h4>
        <p className="text-xs text-stone-600 font-medium">
          Toggle browser extensions, inspect memory consumption, and verify security permissions.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="glass-panel p-3 rounded-xl border border-black/5 bg-white">
          <span className="text-[10px] text-stone-400 block uppercase font-mono">Active</span>
          <span className="text-base font-bold text-emerald-600 font-mono">{activeCount} / {extensions.length}</span>
        </div>
        <div className="glass-panel p-3 rounded-xl border border-black/5 bg-white">
          <span className="text-[10px] text-stone-400 block uppercase font-mono">Memory</span>
          <span className="text-base font-bold text-stone-800 font-mono">{totalRam} MB</span>
        </div>
        <div className="glass-panel p-3 rounded-xl border border-black/5 bg-white">
          <span className="text-[10px] text-stone-400 block uppercase font-mono">Security</span>
          <span className="text-base font-bold text-emerald-600 font-mono">Audited</span>
        </div>
      </div>

      <div className="space-y-3">
        {extensions.map((ext) => (
          <div
            key={ext.id}
            className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-black/5 bg-white"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 rounded-xl bg-stone-100">{ext.icon}</span>
              <div>
                <h5 className="font-bold text-xs text-stone-900 font-space">{ext.name}</h5>
                <span className="text-[11px] text-stone-400 font-mono">{ext.version} • {ext.ram}</span>
              </div>
            </div>

            <button
              onClick={() => toggleExtension(ext.id)}
              className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-xs font-bold cursor-pointer ${
                ext.active
                  ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30'
                  : 'bg-stone-100 text-stone-400'
              }`}
            >
              {ext.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              <span>{ext.active ? 'Enabled' : 'Disabled'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericDemo({ project }) {
  return (
    <div className="space-y-6 text-center py-8">
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-md mx-auto">
        <h4 className="font-bold text-stone-900 text-base mb-2 font-space">
          {project.title} Sandbox Environment
        </h4>
        <p className="text-xs text-stone-600 leading-relaxed font-medium">
          {project.description}
        </p>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {project.tech?.map((t) => (
          <span key={t} className="text-xs px-3 py-1 rounded-full bg-stone-100 font-semibold text-emerald-700 font-mono border border-black/5">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
