import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, Copy, Check, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { Github, Linkedin, Instagram } from './BrandIcons';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 5) {
      tempErrors.message = 'Message must be at least 5 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Format WhatsApp & Live Terminal Payload
  const getFormattedPayload = () => {
    return `Hello Shafi Alam,

I would like to discuss a project with you:
• Name: ${formData.name || '[Your Name]'}
• Email: ${formData.email || '[Your Email]'}
• Subject: ${formData.subject || '[Subject]'}

Message Details:
${formData.message || '[Type your message description here...]'}`;
  };

  // 1. Direct Real Email Inbox Submission via FormSubmit Endpoint
  const handleSendRealEmail = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/devbyshafi@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Portfolio Inquiry] ${formData.subject}`,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      } else {
        // Fallback to mailto link if API fetch encounters network issues
        const mailtoUrl = `mailto:devbyshafi@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(getFormattedPayload())}`;
        window.location.href = mailtoUrl;
        setSubmitted(true);
      }
    } catch (err) {
      // Fallback to mailto link
      const mailtoUrl = `mailto:devbyshafi@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(getFormattedPayload())}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // 2. Direct WhatsApp Dispatch
  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const text = encodeURIComponent(getFormattedPayload());
    const whatsappUrl = `https://wa.me/917995781051?text=${text}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold block mb-2">
          // 05. Direct Connect & Inquiries
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space text-gradient-vibrant">
          Get In Touch
        </h2>
        <p className="text-slate-600 text-xs max-w-xl mx-auto mt-2 font-mono">
          Send a message directly into Shafi's email inbox (<strong className="text-purple-700">devbyshafi@gmail.com</strong>) or reach out via <strong className="text-emerald-700">WhatsApp</strong>!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 glass-panel tilt-card p-8 rounded-3xl text-left border border-slate-200 bg-white/90 flex flex-col justify-between shadow-xl"
        >
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <Sparkles size={18} className="text-purple-600" />
              <h3 className="text-base font-bold text-slate-900 font-space">
                Direct Contact Channels
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-8 leading-relaxed font-medium">
              Open for full-stack engineering roles, travel/visa engine consulting, and custom web development.
            </p>

            <div className="space-y-4 font-mono">
              {/* WhatsApp Card */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300">
                <a href="https://wa.me/917995781051" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-300">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-emerald-800">WHATSAPP / PHONE</span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      +91 79957 81051
                    </span>
                  </div>
                </a>
                <button
                  onClick={() => handleCopy('+917995781051', 'phone')}
                  className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Email Card */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/80 border border-purple-300">
                <a href="mailto:devbyshafi@gmail.com" className="flex items-center gap-3 group">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-300">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-purple-800">EMAIL INBOX</span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      devbyshafi@gmail.com
                    </span>
                  </div>
                </a>
                <button
                  onClick={() => handleCopy('devbyshafi@gmail.com', 'email')}
                  className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Copy Email Address"
                >
                  {copiedField === 'email' ? <Check size={14} className="text-purple-600" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-500">LOCATION</span>
                  <span className="text-xs font-bold text-slate-800">
                    Hyderabad, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-3 font-mono">
              Official Profiles
            </span>
            <div className="flex gap-3">
              <a
                href="https://github.com/Shafialam7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-shafi-122171197?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors border border-blue-200"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/192.168.7.5.26?igsh=MWsxOW9mY3AxNmw2Yg=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors border border-rose-200"
                title="Instagram Profile"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean Form + Live Payload Preview Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-panel tilt-card p-8 rounded-3xl border border-slate-200 bg-white/90 shadow-xl"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form className="space-y-5 text-left font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5 font-mono">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-900"
                    />
                    {errors.name && <span className="text-[10px] text-rose-500 font-bold mt-1 block font-mono">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5 font-mono">
                      Your Email Address:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-900"
                    />
                    {errors.email && <span className="text-[10px] text-rose-500 font-bold mt-1 block font-mono">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5 font-mono">
                    Subject:
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-900"
                  />
                  {errors.subject && <span className="text-[10px] text-rose-500 font-bold mt-1 block font-mono">{errors.subject}</span>}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5 font-mono">
                    Message Description:
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your project description here..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-900 resize-none"
                  />
                  {errors.message && <span className="text-[10px] text-rose-500 font-bold mt-1 block font-mono">{errors.message}</span>}
                </div>

                {/* Restored Live Message Payload Preview Box */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5 flex items-center gap-1">
                    <Terminal size={12} className="text-purple-600" /> Live Formatted Message Payload Preview:
                  </span>
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-slate-800 text-[10px] leading-relaxed font-mono overflow-x-auto code-scroll">
                    <pre><code>{getFormattedPayload()}</code></pre>
                  </div>
                </div>

                {/* Dispatch Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={handleSendRealEmail}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail size={16} />
                        <span>Send Email to Inbox</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSendWhatsApp}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center flex flex-col items-center font-mono">
                <CheckCircle size={44} className="text-purple-600 mb-4 animate-bounce" />
                <h4 className="text-lg font-bold text-slate-900 mb-1 font-space">
                  Message Sent Directly to Shafi's Inbox!
                </h4>
                <p className="text-xs text-slate-600 mb-6 font-medium max-w-sm leading-relaxed">
                  Thank you! Your message has been delivered directly to <strong className="text-purple-700">devbyshafi@gmail.com</strong>. Shafi will reply to your email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-purple-600 hover:bg-slate-100 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
