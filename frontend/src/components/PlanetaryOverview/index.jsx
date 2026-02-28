import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const overviews = [
  {
    title: "Mercury In Aries Square Mars In Capricorn",
    content: "A cosmic tension demanding action. Communication is swift, direct, and perhaps a little fiery. Channel this energy into productive debates rather than impulsive arguments.",
    date: "July 29, 2024",
    index: "01"
  },
  {
    title: "Venus Enters Leo",
    content: "Venus transitions into Leo, bringing a bold energy to love and creativity. Expect more expressive emotions and a desire for grand romantic gestures and appreciation.",
    date: "August 5, 2024",
    index: "02"
  },
  {
    title: "Sun Conjunct Uranus",
    content: "This rare alignment brings innovation and surprise. It's a powerful time for breakthroughs, both personally and collectively. Embrace sudden flashes of insight.",
    date: "August 12, 2024",
    index: "03"
  },
  {
    title: "Full Moon In Aquarius",
    content: "The Full Moon lights up the sky in Aquarius, focusing on collective ideals, friendship, and humanitarian efforts. A time to release what no longer serves the greater good.",
    date: "August 22, 2024",
    index: "04"
  },
  {
    title: "Mars Trine Jupiter",
    content: "Action (Mars) flows harmoniously with expansion (Jupiter), making this a potent day for goal-setting and achievement. Your boldest moves are cosmically supported.",
    date: "August 30, 2024",
    index: "05"
  },
];

const PlanetaryOverview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = overviews[activeIndex];

  return (
    <section className="bg-[#050505] py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden min-h-screen flex flex-col justify-center">

      {/* Background Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-purple-900 rounded-full mix-blend-screen filter blur-[200px] opacity-10 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto w-full relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8">
          <div>
            <p className="text-[#E5C07B] text-xs font-bold tracking-[0.4em] uppercase mb-4">Celestial Events</p>
            <h2 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.85] tracking-tighter uppercase">
              PLANETARY<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white italic font-light ml-8 md:ml-24">
                OVERVIEW
              </span>
            </h2>
          </div>
          <p className="text-gray-500 font-light max-w-xs md:text-right leading-relaxed text-sm">
            Real-time celestial mechanics influencing the energetic field of your reality.
          </p>
        </div>

        {/* Main Interactive Area */}
        <div className="flex flex-col xl:flex-row gap-4 md:gap-8">

          {/* Navigation List */}
          <div className="xl:w-1/2 flex flex-col divide-y divide-white/[0.05] border-y border-white/[0.05]">
            {overviews.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`magnetic group flex items-center gap-8 py-6 text-left w-full transition-all duration-500 ${activeIndex === i ? 'px-6 bg-[#E5C07B]/5' : 'px-0 hover:px-4'
                  }`}
              >
                <span className={`text-xs font-bold tracking-widest transition-colors duration-300 ${activeIndex === i ? 'text-[#E5C07B]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                  {item.index}
                </span>
                <h3 className={`text-base md:text-lg font-display font-light tracking-wide flex-1 transition-colors duration-300 uppercase ${activeIndex === i ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                  {item.title}
                </h3>
                <div className={`w-0 h-[1px] bg-[#E5C07B] transition-all duration-500 ${activeIndex === i ? 'w-8' : ''}`} />
              </button>
            ))}
          </div>

          {/* Active Content Display */}
          <div className="xl:w-1/2 flex flex-col justify-between min-h-[300px] xl:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, y: -20, clipPath: "inset(100% 0 0 0)" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col h-full p-8 md:p-12 bg-[#0a0a0a] border border-white/[0.04] relative overflow-hidden"
              >
                {/* Large background index */}
                <div className="absolute bottom-0 right-0 text-[20vw] xl:text-[12vw] font-display font-bold text-white opacity-[0.02] leading-none select-none pointer-events-none pr-4">
                  {active.index}
                </div>

                <div className="relative z-10">
                  <p className="text-[#E5C07B] text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-[#E5C07B]/50" />
                    {active.date}
                  </p>

                  <h3 className="text-2xl md:text-4xl font-display font-light text-white mb-8 leading-tight tracking-wide uppercase">
                    {active.title}
                  </h3>

                  <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg italic">
                    "{active.content}"
                  </p>
                </div>

                {/* Decorative Line */}
                <div className="mt-auto pt-8 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-gray-600 text-xs tracking-widest uppercase font-bold">
                    {activeIndex + 1} / {overviews.length}
                  </span>
                  <button
                    onClick={() => setActiveIndex((activeIndex + 1) % overviews.length)}
                    className="magnetic text-xs font-bold tracking-[0.2em] uppercase text-white flex items-center gap-3 hover:text-[#E5C07B] transition-colors duration-300"
                  >
                    Next
                    <div className="w-8 h-[1px] bg-current" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanetaryOverview;
