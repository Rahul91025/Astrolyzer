import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = ['Identity', 'Birth Details', 'Session'];

const SERVICES_APPT = [
  'Vedic Birth Chart',
  'Relationship Compatibility',
  'Career & Finance',
  'Vastu Consultation',
  'Yearly Forecast',
  'Palmistry Reading',
];

const TIMES = ['Morning (9–12)', 'Afternoon (12–4)', 'Evening (4–8)', 'Night (8–10)'];
const CHANNELS = ['Video Call', 'Phone', 'In-Person', 'WhatsApp'];

const FieldGroup = ({ label, children, error }) => (
  <div className="group">
    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-600 mb-3">{label}</p>
    {children}
    {error && <p className="text-red-400 text-[10px] mt-2 tracking-wider">{error}</p>}
  </div>
);

const LineInput = ({ ...props }) => (
  <input
    className="w-full bg-transparent border-b border-white/10 text-white text-base font-light py-3 focus:outline-none focus:border-[#E5C07B] transition-colors duration-500 placeholder:text-gray-700 caret-[#E5C07B]"
    {...props}
  />
);

const AppointmentForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    name: '', email: '', phone: '', gender: '',
    birthDate: '', birthTime: '', birthPlace: '',
    service: '', preferredTime: '', channel: '', notes: ''
  });

  const set = (k, v) => setData(p => ({ ...p, [k]: v }));

  const pageVariants = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1500));
    setSubmitted(true);
  };

  return (
    <section className="bg-[#050505] min-h-screen relative overflow-hidden flex flex-col items-center justify-center py-32 px-6 md:px-12">

      {/* Background Text */}
      <div className="absolute bottom-0 right-0 text-[20vw] font-display font-black text-white opacity-[0.02] leading-none pointer-events-none select-none uppercase pr-8 pb-4">
        BOOK
      </div>

      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-purple-900 rounded-full blur-[200px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10">

        {!submitted ? (
          <>
            {/* Header */}
            <div className="mb-20">
              <p className="text-[#E5C07B] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Cosmic Session</p>
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.85] tracking-tighter uppercase">
                Book an <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white italic font-light">
                  Appointment
                </span>
              </h2>
            </div>

            {/* Step Progress */}
            <div className="flex items-center gap-0 mb-16 border-b border-white/[0.05]">
              {STEPS.map((s, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => i < step && setStep(i)}
                  className={`magnetic px-6 py-4 text-[10px] font-bold tracking-[0.25em] uppercase border-b-2 -mb-[2px] transition-all duration-500 ${step === i
                      ? 'border-[#E5C07B] text-[#E5C07B]'
                      : i < step
                        ? 'border-white/30 text-gray-400 cursor-pointer hover:text-white hover:border-white/60'
                        : 'border-transparent text-gray-700 cursor-not-allowed'
                    }`}
                >
                  {String(i + 1).padStart(2, '0')} {s}
                </button>
              ))}

              {/* Progress bar */}
              <div className="flex-1 ml-4 h-[1px] bg-white/[0.05] relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#E5C07B]"
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">

                {/* ─── STEP 0: Identity ─── */}
                {step === 0 && (
                  <motion.div key="step0" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <FieldGroup label="Full Name">
                      <LineInput placeholder="Your cosmic name" value={data.name} onChange={e => set('name', e.target.value)} />
                    </FieldGroup>
                    <FieldGroup label="Email">
                      <LineInput type="email" placeholder="you@example.com" value={data.email} onChange={e => set('email', e.target.value)} />
                    </FieldGroup>
                    <FieldGroup label="Phone">
                      <LineInput placeholder="+91 XXXXX XXXXX" value={data.phone} onChange={e => set('phone', e.target.value)} />
                    </FieldGroup>
                    <FieldGroup label="Gender">
                      <div className="flex gap-3 mt-1">
                        {['Male', 'Female', 'Other'].map(g => (
                          <button type="button" key={g} onClick={() => set('gender', g)}
                            className={`px-5 py-2 text-[10px] font-bold tracking-widest uppercase border transition-all duration-300 ${data.gender === g ? 'border-[#E5C07B] bg-[#E5C07B] text-black' : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </FieldGroup>
                  </motion.div>
                )}

                {/* ─── STEP 1: Birth Details ─── */}
                {step === 1 && (
                  <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <FieldGroup label="Date of Birth">
                      <LineInput type="date" value={data.birthDate} onChange={e => set('birthDate', e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-[#E5C07B] transition-colors duration-500 caret-[#E5C07B] colorscheme-dark" />
                    </FieldGroup>
                    <FieldGroup label="Time of Birth">
                      <LineInput type="time" value={data.birthTime} onChange={e => set('birthTime', e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-[#E5C07B] transition-colors duration-500 caret-[#E5C07B]" />
                    </FieldGroup>
                    <FieldGroup label="Place of Birth" >
                      <LineInput placeholder="City, Country" value={data.birthPlace} onChange={e => set('birthPlace', e.target.value)} />
                    </FieldGroup>
                  </motion.div>
                )}

                {/* ─── STEP 2: Session Preferences ─── */}
                {step === 2 && (
                  <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-10">
                    <FieldGroup label="Service Required">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {SERVICES_APPT.map(svc => (
                          <button type="button" key={svc} onClick={() => set('service', svc)}
                            className={`px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase border transition-all duration-300 ${data.service === svc ? 'border-[#E5C07B] bg-[#E5C07B] text-black' : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}>
                            {svc}
                          </button>
                        ))}
                      </div>
                    </FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <FieldGroup label="Preferred Session Time">
                        <div className="flex flex-col gap-2 mt-2">
                          {TIMES.map(t => (
                            <button type="button" key={t} onClick={() => set('preferredTime', t)}
                              className={`flex items-center gap-3 py-2 text-sm font-light transition-colors duration-300 ${data.preferredTime === t ? 'text-[#E5C07B]' : 'text-gray-600 hover:text-white'}`}>
                              <div className={`w-3 h-3 rounded-full border transition-colors duration-300 ${data.preferredTime === t ? 'border-[#E5C07B] bg-[#E5C07B]' : 'border-gray-700'}`} />
                              {t}
                            </button>
                          ))}
                        </div>
                      </FieldGroup>
                      <FieldGroup label="Channel">
                        <div className="flex flex-col gap-2 mt-2">
                          {CHANNELS.map(c => (
                            <button type="button" key={c} onClick={() => set('channel', c)}
                              className={`flex items-center gap-3 py-2 text-sm font-light transition-colors duration-300 ${data.channel === c ? 'text-[#E5C07B]' : 'text-gray-600 hover:text-white'}`}>
                              <div className={`w-3 h-3 rounded-full border transition-colors duration-300 ${data.channel === c ? 'border-[#E5C07B] bg-[#E5C07B]' : 'border-gray-700'}`} />
                              {c}
                            </button>
                          ))}
                        </div>
                      </FieldGroup>
                    </div>
                    <FieldGroup label="Additional Notes">
                      <textarea
                        rows={3}
                        value={data.notes}
                        onChange={e => set('notes', e.target.value)}
                        placeholder="Any specific concerns or questions..."
                        className="w-full bg-transparent border-b border-white/10 text-white text-base font-light py-3 focus:outline-none focus:border-[#E5C07B] transition-colors duration-500 resize-none placeholder:text-gray-700 caret-[#E5C07B]"
                      />
                    </FieldGroup>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/[0.05]">
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(s => s - 1)}
                    className="magnetic flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-gray-600 hover:text-white transition-colors duration-300">
                    <div className="w-6 h-[1px] bg-current" />
                    Back
                  </button>
                ) : <div />}

                {step < STEPS.length - 1 ? (
                  <button type="button" onClick={() => setStep(s => s + 1)}
                    className="magnetic group flex items-center gap-4 text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-[#E5C07B] transition-colors duration-300">
                    Next: {STEPS[step + 1]}
                    <div className="w-8 h-[1px] bg-current group-hover:w-14 transition-all duration-500" />
                  </button>
                ) : (
                  <button type="submit"
                    className="magnetic group flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border border-white/30 group-hover:border-[#E5C07B] group-hover:bg-[#E5C07B] flex items-center justify-center transition-all duration-700">
                      <svg className="w-6 h-6 group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-[#E5C07B] transition-colors duration-300">
                      Confirm Booking
                    </span>
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          /* Success */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-28 h-28 rounded-full border border-[#E5C07B]/40 flex items-center justify-center mb-10">
              <span className="text-[#E5C07B] text-5xl">✦</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-display font-light text-white mb-6 uppercase tracking-wider">Confirmed</h3>
            <p className="text-gray-500 font-light max-w-md leading-relaxed">
              Your cosmic session is booked. An astrologer will reach out within 24 hours to confirm the details.
            </p>
            <button
              onClick={() => { setSubmitted(false); setStep(0); setData({ name: '', email: '', phone: '', gender: '', birthDate: '', birthTime: '', birthPlace: '', service: '', preferredTime: '', channel: '', notes: '' }); }}
              className="magnetic mt-12 flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-[#E5C07B] transition-colors duration-300">
              Book Another Session
              <div className="w-8 h-[1px] bg-current" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AppointmentForm;
