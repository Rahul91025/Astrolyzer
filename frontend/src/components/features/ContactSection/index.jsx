import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_INFO = [
  {
    icon: '✦',
    label: 'Phone',
    lines: ['+91 7903 344 316', '+91 1800-326-324'],
    subtitle: 'Mon–Sat, 9am to 9pm IST'
  },
  {
    icon: '◈',
    label: 'Email',
    lines: ['astrology@example.com', 'astro@example.com'],
    subtitle: 'We reply within 24 hours'
  },
  {
    icon: '⬡',
    label: 'Location',
    lines: ['GITA Autonomous College,', 'Bhubaneswar, Odisha'],
    subtitle: 'Visit by appointment'
  }
];

const SERVICES = ['Vedic Astrology', 'Palm Reading', 'Vastu Shastra', 'Relationship Guidance', 'Career Forecast', 'Birth Chart Analysis'];

const INPUT_CLASS = `
  w-full bg-transparent border-0 border-b border-mystic-border-subtle
  text-mystic-text text-base font-light placeholder:text-mystic-text-sec/50
  py-4 focus:outline-none focus:border-mystic-gold
  transition-colors duration-700 caret-mystic-gold
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [focusField, setFocusField] = useState(null);
  const formRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!formData.message.trim()) e.message = 'Tell us what you need';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    // Simulate send (replace with real API call)
    await new Promise(r => setTimeout(r, 1800));
    setStatus('sent');
  };

  const handleChange = (field, val) => {
    setFormData(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <section className="bg-mystic-bg min-h-screen relative overflow-hidden transition-colors duration-700">

      {/* Massive Background Typography */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.025] select-none">
        <span className="absolute bottom-0 left-0 text-[22vw] font-display font-black text-mystic-text uppercase leading-none tracking-tighter transition-colors duration-700">
          CONTACT
        </span>
      </div>

      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-mystic-accent rounded-full blur-[200px] opacity-10 pointer-events-none transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-mystic-gold rounded-full blur-[200px] opacity-5 pointer-events-none transition-colors duration-700" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-32 grid grid-cols-1 xl:grid-cols-5 gap-16 md:gap-24 relative z-10 min-h-screen items-center">

        {/* ── Left: Info Column (2/5 width) ── */}
        <div className="xl:col-span-2 flex flex-col justify-center gap-16">

          <div>
            <p className="text-mystic-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-6 transition-colors duration-700">Transmit to the Cosmos</p>
            <h2 className="text-6xl md:text-7xl xl:text-8xl font-display font-bold text-mystic-text leading-[0.85] tracking-tighter uppercase transition-colors duration-700">
              Let's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-mystic-text-sec to-mystic-text italic font-light transition-colors duration-700">
                Connect
              </span>
            </h2>
            <p className="text-mystic-text-sec font-light mt-8 max-w-sm leading-relaxed transition-colors duration-700">
              Whether you seek cosmic clarity or have a specific inquiry, our astrologers are ready to guide your path.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="flex flex-col gap-px">
            {CONTACT_INFO.map((info, i) => (
              <div
                key={i}
                className="group flex items-start gap-6 py-6 border-b border-mystic-border-subtle hover:bg-mystic-text/5 transition-colors duration-500 px-2 -mx-2"
              >
                <span className="text-mystic-gold text-xl mt-1 flex-shrink-0 group-hover:scale-125 transition-all duration-500">
                  {info.icon}
                </span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-mystic-text-sec mb-2 transition-colors duration-700">{info.label}</p>
                  {info.lines.map((line, j) => (
                    <p key={j} className="text-mystic-text font-light text-base transition-colors duration-700">{line}</p>
                  ))}
                  <p className="text-mystic-text-sec text-xs mt-1 transition-colors duration-700">{info.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-mystic-text-sec mb-4 transition-colors duration-700">Also Find Us</p>
            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'YouTube'].map(s => (
                <button key={s} className="magnetic text-xs font-bold tracking-widest uppercase text-mystic-text-sec hover:text-mystic-gold transition-colors duration-300">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Form Column (3/5 width) ── */}
        <div className="xl:col-span-3 relative">

          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center py-32"
              >
                <div className="w-24 h-24 rounded-full border border-mystic-gold/50 flex items-center justify-center mb-8 transition-colors duration-700">
                  <span className="text-mystic-gold text-4xl transition-colors duration-700">✦</span>
                </div>
                <h3 className="text-5xl font-display font-light text-mystic-text mb-4 uppercase tracking-wider transition-colors duration-700">Transmitted</h3>
                <p className="text-mystic-text-sec font-light max-w-md leading-relaxed transition-colors duration-700">
                  The stars have received your message. An astrologer will respond within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', service: '', message: '' }); }}
                  className="magnetic mt-12 flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-mystic-text hover:text-mystic-gold transition-colors duration-300"
                >
                  Send Another
                  <div className="w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-500" />
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col gap-0"
              >
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-mystic-text-sec mb-12 transition-colors duration-700">Initiate Contact</p>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10">
                  {/* Name */}
                  <div className="relative mb-8 md:mb-0">
                    <label className={`absolute top-4 left-0 transition-all duration-500 pointer-events-none text-xs font-bold tracking-[0.25em] uppercase ${focusField === 'name' || formData.name ? 'top-0 text-[8px] text-mystic-gold' : 'text-mystic-text-sec'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => handleChange('name', e.target.value)}
                      onFocus={() => setFocusField('name')}
                      onBlur={() => setFocusField(null)}
                      className={INPUT_CLASS}
                    />
                    {errors.name && <p className="text-red-400 text-[10px] mt-2 tracking-wider">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="relative mb-8 md:mb-0">
                    <label className={`absolute top-4 left-0 transition-all duration-500 pointer-events-none text-xs font-bold tracking-[0.25em] uppercase ${focusField === 'email' || formData.email ? 'top-0 text-[8px] text-mystic-gold' : 'text-mystic-text-sec'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      onFocus={() => setFocusField('email')}
                      onBlur={() => setFocusField(null)}
                      className={INPUT_CLASS}
                    />
                    {errors.email && <p className="text-red-400 text-[10px] mt-2 tracking-wider">{errors.email}</p>}
                  </div>
                </div>

                {/* Service Selector */}
                <div className="mt-10 mb-4">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-mystic-text-sec mb-4 transition-colors duration-700">Service Sought</p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map(svc => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => handleChange('service', svc === formData.service ? '' : svc)}
                        className={`magnetic px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase border transition-all duration-700 ${formData.service === svc
                          ? 'border-mystic-gold bg-mystic-gold text-mystic-bg'
                          : 'border-mystic-border-subtle text-mystic-text-sec hover:border-mystic-border hover:text-mystic-text'
                          }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="relative mt-10">
                  <label className={`absolute top-4 left-0 transition-all duration-500 pointer-events-none text-xs font-bold tracking-[0.25em] uppercase ${focusField === 'message' || formData.message ? 'top-0 text-[8px] text-mystic-gold' : 'text-mystic-text-sec'}`}>
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={e => handleChange('message', e.target.value)}
                    onFocus={() => setFocusField('message')}
                    onBlur={() => setFocusField(null)}
                    className={`${INPUT_CLASS} resize-none`}
                  />
                  {errors.message && <p className="text-red-400 text-[10px] mt-2 tracking-wider">{errors.message}</p>}
                </div>

                {/* Submit */}
                <div className="mt-16 flex items-center gap-10">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="magnetic group relative overflow-hidden flex items-center gap-6 text-mystic-text"
                  >
                    {/* Animated circle submit button */}
                    <div className={`relative w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-700 ${status === 'sending' ? 'border-mystic-gold' : 'border-mystic-border group-hover:border-mystic-gold group-hover:bg-mystic-gold'}`}>
                      {status === 'sending' ? (
                        <div className="w-5 h-5 border-2 border-mystic-gold border-t-transparent rounded-full animate-spin transition-colors duration-700" />
                      ) : (
                        <svg className="w-6 h-6 transition-colors duration-500 group-hover:text-mystic-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase group-hover:text-mystic-gold transition-colors duration-300">
                      {status === 'sending' ? 'Transmitting...' : 'Send Message'}
                    </span>
                  </button>

                  <p className="text-mystic-text-sec text-xs font-light tracking-wider hidden md:block transition-colors duration-700">
                    By submitting, you agree to our<br />privacy & cosmic terms.
                  </p>
                </div>

              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="relative z-10 w-full border-t border-mystic-border-subtle transition-colors duration-700" />
    </section>
  );
};

export default ContactSection;
