import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import zodiacBg from "../../../assets/cosmic/zodiac-bg.png";

gsap.registerPlugin(ScrollTrigger);

const ZodiacLookup = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridCardsRef = useRef([]);

  const zodiacSigns = [
    { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire", planet: "Mars" },
    { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth", planet: "Venus" },
    { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air", planet: "Mercury" },
    { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water", planet: "Moon" },
    { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire", planet: "Sun" },
    { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth", planet: "Mercury" },
    { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air", planet: "Venus" },
    { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water", planet: "Pluto" },
    { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire", planet: "Jupiter" },
    { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth", planet: "Saturn" },
    { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air", planet: "Uranus" },
    { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water", planet: "Neptune" },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Massive Title Reveal
      const splitTitle = new SplitType(titleRef.current, { types: 'chars' });

      gsap.from(splitTitle.chars, {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // Grid Cell Stagger Reveal
      gsap.from(gridCardsRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          grid: [3, 4],
          from: "random"
        },
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".zodiac-grid",
          start: "top 80%",
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#050505] py-32 px-6 md:px-12 relative overflow-hidden min-h-screen flex flex-col xl:flex-row items-center justify-center gap-12">

      {/* Premium Section Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img src={zodiacBg} alt="" className="w-full h-full object-cover mix-blend-overlay" />
      </div>

      {/* Massive Rotated Title area */}
      <div className="xl:w-1/4 flex flex-col justify-center items-start xl:items-end w-full relative z-10">
        <p className="text-[#E5C07B] text-xs font-bold tracking-[0.4em] uppercase mb-6 xl:mb-12 xl:pr-8">
          The Cosmic Blueprint
        </p>
        <h2
          ref={titleRef}
          className="text-[12vw] xl:text-[7vw] font-display font-bold text-white leading-[0.8] tracking-tighter uppercase xl:text-right"
        >
          Zodiac <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white italic font-light">Matrix</span>
        </h2>
        <p className="text-gray-500 font-light mt-8 max-w-sm xl:text-right xl:pr-2 leading-relaxed text-sm md:text-base">
          Hover to attune to the celestial frequencies governing your birth.
        </p>
      </div>

      {/* Severe Infinite Grid */}
      <div className="w-full xl:w-3/4 max-w-[1200px] zodiac-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.05] border border-white/[0.05] p-px relative z-10">
        {zodiacSigns.map((sign, index) => (
          <div
            key={index}
            ref={el => gridCardsRef.current[index] = el}
            className="magnetic group relative aspect-square bg-[#050505] overflow-hidden flex flex-col items-center justify-center cursor-none transition-colors duration-700 hover:bg-[#E5C07B]"
          >
            {/* Default State */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-90 group-hover:-translate-y-4">
              <span className="text-5xl md:text-7xl mb-4 text-white opacity-40 group-hover:opacity-100 transition-opacity">
                {sign.symbol}
              </span>
              <h3 className="text-lg md:text-2xl font-display font-light text-white tracking-widest uppercase">
                {sign.name}
              </h3>
            </div>

            {/* Hover Reveal State - Dark Text on Gold background */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 translate-y-8 scale-110 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
              <span className="text-6xl md:text-8xl mb-2 text-black opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {sign.symbol}
              </span>
              <h3 className="text-xl md:text-3xl font-display font-bold text-black tracking-widest uppercase mb-4 relative z-10">
                {sign.name}
              </h3>

              <div className="flex flex-col items-center gap-2 relative z-10">
                <span className="text-black/80 text-xs font-bold tracking-widest uppercase border-b border-black/20 pb-1">
                  {sign.dates}
                </span>
                <div className="flex gap-4 mt-2">
                  <span className="text-black/70 text-[10px] tracking-[0.2em] uppercase">
                    El: {sign.element}
                  </span>
                  <span className="text-black/70 text-[10px] tracking-[0.2em] uppercase">
                    Pl: {sign.planet}
                  </span>
                </div>
              </div>

              {/* Animated Underline */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-black group-hover:w-12 transition-all duration-700 delay-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZodiacLookup;
