import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    num: '01', title: 'Birth Chart', sub: 'Natal Mapping',
    desc: 'Every soul arrives with a cosmic blueprint etched in the sky. Your birth chart is that manuscript — every planetary position decoded with surgical precision.',
    tags: ['Vedic', 'House Analysis', 'Transits'],
    color: '#c084fc', bg: '#1a0533',
  },
  {
    num: '02', title: 'Vastu Shastra', sub: 'Space Alchemy',
    desc: 'Your home breathes. Vastu aligns it with the five elements — Earth, Water, Fire, Air, Ether — so that every corner becomes a conduit for abundance.',
    tags: ['Architecture', 'Energetics', 'Direction'],
    color: '#34d399', bg: '#012a1c',
  },
  {
    num: '03', title: 'Face Reading', sub: 'Divine Physiognomy',
    desc: 'The ancient art of Samudrika Shastra reveals your character, health, and destiny through facial features — the soul written on the body.',
    tags: ['Physiognomy', 'Traits', 'Destiny'],
    color: '#fb923c', bg: '#2a0f00',
  },
  {
    num: '04', title: 'Lal Kitab', sub: 'Ancient Remedies',
    desc: 'The Red Book of Persian origin — a treasure of simple yet potent astrological remedies that bypass complex rituals and go straight to the source.',
    tags: ['Remedies', 'Karma', 'Planets'],
    color: '#f43f5e', bg: '#2a0010',
  },
  {
    num: '05', title: 'Crystal Ball', sub: 'Oracular Vision',
    desc: 'The crystal sphere acts as a mirror to the infinite. Our seers attune with your energy to reveal pathways you cannot yet see with ordinary sight.',
    tags: ['Prophecy', 'Clairvoyance', 'Vision'],
    color: '#60a5fa', bg: '#00102a',
  },
  {
    num: '06', title: 'Kundli Dosh', sub: 'Karmic Healing',
    desc: 'Mangal dosh, Kaal Sarp, Pitru dosh — ancient karmic imprints that shape your present. We identify, explain, and prescribe powerful remediation.',
    tags: ['Karma', 'Dosh', 'Remedies'],
    color: '#fbbf24', bg: '#1a1000',
  },
  {
    num: '07', title: 'Matrimony', sub: 'Cosmic Union',
    desc: 'Compatibility goes beyond the sun sign. We analyze 36 gunas, Navamsha, 7th house, Venus & Mars to reveal the true cosmic resonance between two souls.',
    tags: ['Compatibility', 'Guna', 'Partnership'],
    color: '#f9a8d4', bg: '#2a0018',
  },
  {
    num: '08', title: 'Year Analysis', sub: 'Annual Forecast',
    desc: 'Jupiter returns. Saturn transits. A full 12-month celestial roadmap — the opportunities, the challenges, the exact windows to act.',
    tags: ['Transits', 'Forecast', 'Timing'],
    color: '#a3e635', bg: '#0f1a00',
  },
];

const ServicesGrid = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-[#050505] min-h-screen relative overflow-hidden py-24 px-6 md:px-12 lg:px-20">

      {/* Background text */}
      <div className="absolute -top-10 right-0 text-[22vw] font-display font-black text-white opacity-[0.015] leading-none pointer-events-none select-none uppercase">SERVE</div>

      {/* Header */}
      <div className="max-w-[1600px] mx-auto mb-20">
        <p className="text-[#E5C07B] text-[10px] font-black tracking-[0.5em] uppercase mb-5">What We Offer</p>
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
          <h2 className="text-[12vw] md:text-[8vw] xl:text-[6vw] font-display font-bold text-white uppercase leading-[0.82] tracking-tighter">
            DIVINE<br />
            <span className="text-transparent italic font-light" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>OFFERINGS</span>
          </h2>
          <p className="text-gray-600 font-light max-w-xs xl:mb-2 leading-relaxed text-sm">
            Eight doorways into cosmic intelligence. Each service a universe unto itself.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-[1600px] mx-auto">
        {SERVICES.map((svc, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={i}
              layout
              onClick={() => setActive(isActive ? null : i)}
              className="group border-t border-white/[0.05] cursor-pointer overflow-hidden"
            >
              {/* Top row */}
              <div className="flex items-center gap-6 py-7 md:py-9 relative">
                {/* Number */}
                <span className="text-[10px] font-black tracking-[0.3em] w-10 flex-shrink-0 transition-colors duration-500"
                  style={{ color: isActive ? svc.color : '#2a2a2a' }}>
                  {svc.num}
                </span>

                {/* Title + sub */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <h3 className="font-display text-3xl md:text-4xl xl:text-5xl font-light text-white transition-colors duration-500 uppercase tracking-tight leading-none"
                    style={{ color: isActive ? svc.color : 'white' }}>
                    {svc.title}
                  </h3>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ color: svc.color }}>
                    {svc.sub}
                  </span>
                </div>

                {/* Tags (desktop) */}
                <div className="hidden lg:flex items-center gap-2">
                  {svc.tags.map(t => (
                    <span key={t} className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 border border-white/[0.06] text-gray-700 group-hover:border-white/20 group-hover:text-gray-500 transition-all duration-400">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Plus/Minus */}
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-all duration-500 relative">
                  <div className="w-3 h-[1px] bg-white/60 absolute" />
                  <motion.div className="w-[1px] h-3 bg-white/60" animate={{ scaleY: isActive ? 0 : 1 }} transition={{ duration: 0.3 }} />
                </div>
              </div>

              {/* Expand panel */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <div className="flex flex-col xl:flex-row gap-8 pb-10 pl-16">
                      {/* Color block accent */}
                      <div className="w-1 flex-shrink-0 self-stretch rounded-full" style={{ background: svc.color }} />

                      {/* Description */}
                      <div className="flex-1">
                        <p className="text-gray-400 font-light leading-relaxed text-lg md:text-xl max-w-2xl">
                          {svc.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                          {svc.tags.map(t => (
                            <span key={t} className="text-[9px] font-black tracking-[0.25em] uppercase px-3 py-1.5 border" style={{ borderColor: `${svc.color}40`, color: svc.color, background: `${svc.bg}80` }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-end xl:self-end flex-shrink-0">
                        <Link to="/appointment"
                          className="magnetic flex items-center gap-4 text-xs font-black tracking-[0.2em] uppercase transition-colors duration-300 group/link"
                          style={{ color: svc.color }}
                          onClick={e => e.stopPropagation()}
                        >
                          Book This Service
                          <div className="w-6 h-[1px] group-hover/link:w-10 transition-all duration-500" style={{ background: svc.color }} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        {/* Bottom border */}
        <div className="border-t border-white/[0.05]" />
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1600px] mx-auto mt-20 flex items-center justify-between">
        <p className="text-gray-700 text-xs font-bold tracking-widest uppercase">8 Cosmic Services</p>
        <Link to="/appointment" className="magnetic group flex items-center gap-4 text-xs font-black tracking-[0.2em] uppercase text-[#E5C07B] hover:text-white transition-colors duration-300">
          Book a Consultation
          <div className="w-8 h-[1px] bg-current group-hover:w-14 transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
};

export default ServicesGrid;
