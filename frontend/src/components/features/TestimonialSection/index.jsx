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
    <section className="bg-[#050505] relative overflow-hidden py-28 px-6 md:px-12 lg:px-20">

      {/* Premium Constellation Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <img src={constellationBg} alt="" className="w-full h-full object-cover mix-blend-screen" />
      </div>

      {/* Background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-display font-black text-white opacity-[0.012] leading-none pointer-events-none select-none uppercase whitespace-nowrap">VOICES</div>

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* Header */}
        <div className="mb-20">
          <p className="text-[#E5C07B] text-[10px] font-black tracking-[0.5em] uppercase mb-5">Testimonials</p>
          <h2 className="text-[10vw] md:text-[6vw] font-display font-bold text-white uppercase leading-[0.82] tracking-tighter">
            COSMIC<br />
            <span className="text-transparent italic font-light" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>VOICES</span>
          </h2>
        </div>

        {/* Main Testimonial Display */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20">

          {/* Large Quote Block */}
          <div className="xl:col-span-8 relative">
            {/* Opening mark */}
            <div className="font-display text-[10rem] xl:text-[14rem] text-white/5 leading-none select-none absolute -top-10 -left-4">"</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0, y: -20, clipPath: 'inset(100% 0 0 0)' }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                className="relative z-10 pt-12"
              >
                <p className="text-2xl md:text-3xl xl:text-4xl text-white font-display font-light leading-[1.3] italic tracking-tight mb-12">
                  {t.quote}
                </p>

                <div className="flex items-center gap-5">
                  {/* Symbol avatar */}
                  <div className="w-14 h-14 border border-[#E5C07B]/30 flex items-center justify-center text-2xl text-[#E5C07B] flex-shrink-0">
                    {t.symbol}
                  </div>
                  <div>
                    <p className="text-white text-base font-display font-light">{t.name}</p>
                    <p className="text-[#E5C07B] text-[10px] font-black tracking-[0.3em] uppercase mt-1">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    {Array(t.stars).fill(0).map((_, i) => (
                      <span key={i} className="text-[#E5C07B] text-sm">✦</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-6 mt-14 pt-8 border-t border-white/[0.06]">
              <button
                onClick={() => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="magnetic w-10 h-10 border border-white/10 hover:border-[#E5C07B]/60 flex items-center justify-center text-gray-600 hover:text-[#E5C07B] transition-all duration-400"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className="magnetic">
                    <motion.div
                      className="rounded-full transition-all duration-400"
                      animate={{ width: i === current ? 24 : 4, height: 4, background: i === current ? '#E5C07B' : 'rgba(255,255,255,0.15)' }}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrent(c => (c + 1) % TESTIMONIALS.length)}
                className="magnetic w-10 h-10 border border-white/10 hover:border-[#E5C07B]/60 flex items-center justify-center text-gray-600 hover:text-[#E5C07B] transition-all duration-400"
              >
                →
              </button>
              <span className="ml-auto text-[10px] font-black tracking-widest text-gray-700 uppercase">
                {String(current + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: All testimonial list */}
          <div className="xl:col-span-4 flex flex-col gap-0">
            <p className="text-[9px] font-black tracking-[0.4em] uppercase text-gray-700 mb-6">All Reviews</p>
            {TESTIMONIALS.map((tm, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`group flex items-start gap-4 py-5 border-b border-white/[0.04] text-left transition-all duration-400 ${i === current ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border transition-all duration-400" style={{ borderColor: i === current ? `${TESTIMONIALS[i].symbol === t.symbol ? '#E5C07B' : '#ffffff30'}` : 'rgba(255,255,255,0.06)', color: i === current ? '#E5C07B' : '#333' }}>
                  <span className="text-xs">{tm.symbol}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-light line-clamp-2 leading-relaxed">{tm.quote.substring(0, 80)}…</p>
                  <p className="text-[9px] font-bold tracking-wider mt-2 text-gray-600">{tm.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-20 pt-8 border-t border-white/[0.04] grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '4,800+', label: 'Readings Delivered' },
            { num: '98%', label: 'Satisfaction Rate' },
            { num: '5,000', label: 'Years of Vedic Wisdom' },
            { num: '47+', label: 'Countries Served' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="font-display text-4xl md:text-5xl font-light text-white">{stat.num}</p>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
