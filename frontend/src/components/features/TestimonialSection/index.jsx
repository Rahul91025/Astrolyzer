import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import constellationBg from "../../../assets/cosmic/constellation-bg.png";

const TESTIMONIALS = [
  {
    quote: "The readings I received were nothing short of miraculous. The astrologer didn't just tell me my future — they gave me the cosmic map to navigate my present. A transcendent experience.",
    name: "Elena Rostova",
    role: "Spiritual Seeker · Moscow",
    stars: 5,
    symbol: '✦',
  },
  {
    quote: "I've consulted dozens of astrologers. This was the first time I felt truly seen — every word resonated like the universe itself was speaking through the reading.",
    name: "Arjun Mehta",
    role: "Entrepreneur · Mumbai",
    stars: 5,
    symbol: '◈',
  },
  {
    quote: "The Kundli dosh analysis was precise beyond comprehension. The remedy they prescribed changed the energy in my home overnight. I am forever grateful.",
    name: "Priya Sharma",
    role: "Architect · Bangalore",
    stars: 5,
    symbol: '☽',
  },
  {
    quote: "My birth chart reading revealed patterns in my life that I had felt but never understood. The level of detail was extraordinary — I wept reading the report.",
    name: "Marcus Webb",
    role: "Author · London",
    stars: 5,
    symbol: '♄',
  },
  {
    quote: "Vastu consultation transformed our office completely. The energy shift was palpable — productivity doubled and conflicts dissolved. Worth every rupee.",
    name: "Seema Kapoor",
    role: "Business Owner · Delhi",
    stars: 5,
    symbol: '⬡',
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const t = TESTIMONIALS[current];

  return (
    <section className="bg-mystic-bg relative overflow-hidden py-28 px-6 md:px-12 lg:px-20 transition-colors duration-700">

      {/* Premium Constellation Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 premium-invert-light transition-all duration-700">
        <img src={constellationBg} alt="" className="w-full h-full object-cover premium-blend" />
      </div>

      {/* Background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-display font-black text-mystic-text opacity-[0.012] leading-none pointer-events-none select-none uppercase whitespace-nowrap transition-colors duration-700">VOICES</div>

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* Header */}
        <div className="mb-20">
          <p className="text-mystic-gold text-[10px] font-black tracking-[0.5em] uppercase mb-5 transition-colors duration-700">Testimonials</p>
          <h2 className="text-[10vw] md:text-[6vw] font-display font-bold text-mystic-text uppercase leading-[0.82] tracking-tighter transition-colors duration-700">
            COSMIC<br />
            <span className="text-mystic-bg italic font-light transition-colors duration-700 text-mystic-text-sec" style={{ WebkitTextStroke: '1px currentColor' }}>VOICES</span>
          </h2>
        </div>

        {/* Main Testimonial Display */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20">

          {/* Large Quote Block */}
          <div className="xl:col-span-8 relative">
            {/* Opening mark */}
            <div className="font-display text-[10rem] xl:text-[14rem] text-mystic-text opacity-5 leading-none select-none absolute -top-10 -left-4 transition-colors duration-700">"</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0, y: -20, clipPath: 'inset(100% 0 0 0)' }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                className="relative z-10 pt-12"
              >
                <p className="text-2xl md:text-3xl xl:text-4xl text-mystic-text font-display font-light leading-[1.3] italic tracking-tight mb-12 transition-colors duration-700">
                  {t.quote}
                </p>

                <div className="flex items-center gap-5">
                  {/* Symbol avatar */}
                  <div className="w-14 h-14 border border-mystic-gold/30 flex items-center justify-center text-2xl text-mystic-gold flex-shrink-0 transition-colors duration-700">
                    {t.symbol}
                  </div>
                  <div>
                    <p className="text-mystic-text text-base font-display font-light transition-colors duration-700">{t.name}</p>
                    <p className="text-mystic-gold text-[10px] font-black tracking-[0.3em] uppercase mt-1 transition-colors duration-700">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    {Array(t.stars).fill(0).map((_, i) => (
                      <span key={i} className="text-mystic-gold text-sm transition-colors duration-700">✦</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-6 mt-14 pt-8 border-t border-mystic-border-subtle transition-colors duration-700">
              <button
                onClick={() => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="magnetic w-10 h-10 border border-mystic-border hover:border-mystic-gold/60 flex items-center justify-center text-mystic-text-sec hover:text-mystic-gold transition-all duration-400"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className="magnetic">
                    <motion.div
                      className="rounded-full transition-all duration-400"
                      animate={{ width: i === current ? 24 : 4, height: 4, background: i === current ? 'var(--color-mystic-gold)' : 'var(--color-mystic-border)' }}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrent(c => (c + 1) % TESTIMONIALS.length)}
                className="magnetic w-10 h-10 border border-mystic-border hover:border-mystic-gold/60 flex items-center justify-center text-mystic-text-sec hover:text-mystic-gold transition-all duration-400"
              >
                →
              </button>
              <span className="ml-auto text-[10px] font-black tracking-widest text-mystic-text-sec uppercase transition-colors duration-700">
                {String(current + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: All testimonial list */}
          <div className="xl:col-span-4 flex flex-col gap-0">
            <p className="text-[9px] font-black tracking-[0.4em] uppercase text-mystic-text-sec mb-6 transition-colors duration-700">All Reviews</p>
            {TESTIMONIALS.map((tm, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`group flex items-start gap-4 py-5 border-b border-mystic-border-subtle text-left transition-all duration-400 ${i === current ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border transition-all duration-400 border-mystic-border"
                  style={{ color: i === current ? 'var(--color-mystic-gold)' : 'var(--color-mystic-text)' }}>
                  <span className="text-xs">{tm.symbol}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-mystic-text text-xs font-light line-clamp-2 leading-relaxed transition-colors duration-700">{tm.quote.substring(0, 80)}…</p>
                  <p className="text-[9px] font-bold tracking-wider mt-2 text-mystic-text-sec transition-colors duration-700">{tm.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-20 pt-8 border-t border-mystic-border-subtle grid grid-cols-2 md:grid-cols-4 gap-8 transition-colors duration-700">
          {[
            { num: '4,800+', label: 'Readings Delivered' },
            { num: '98%', label: 'Satisfaction Rate' },
            { num: '5,000', label: 'Years of Vedic Wisdom' },
            { num: '47+', label: 'Countries Served' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="font-display text-4xl md:text-5xl font-light text-mystic-text transition-colors duration-700">{stat.num}</p>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-mystic-text-sec transition-colors duration-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
