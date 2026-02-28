import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Vedic Astrology',
    icon: '/images/Vedic-Astrology.png',
    description: 'Unlock the secrets of your soul journey through ancient Vedic wisdom and planetary alignments.',
  },
  {
    title: 'Astrology Advice',
    icon: '/images/Astrology-Advice.png',
    description: 'Receive personalized cosmic guidance to navigate life\'s challenges and embrace your true potential.',
  },
  {
    title: 'Vastu Shastra',
    icon: '/images/Vastu-Shastra.png',
    description: 'Harmonize your living space with cosmic energies to bring peace, prosperity, and spiritual growth.',
  },
  {
    title: 'Relationship',
    icon: '/images/Relationship.png',
    description: 'Understand the celestial bonds between souls and find harmony in your connections.',
  },
];

const DailyRoutines = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // Massive Scrolling Marquee Background
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Card Reveal and Scale
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 150,
            opacity: 0,
            scale: 1.1,
            rotateY: 15
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Section Title Reveal
      gsap.from(".rt-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".rt-title-container",
          start: "top 80%",
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#050505] py-32 px-6 md:px-10 lg:px-20 relative overflow-hidden min-h-screen flex flex-col justify-center">

      {/* Massive Background Marquee */}
      <div className="absolute top-[20%] left-0 w-[300vw] pointer-events-none z-0 opacity-[0.03] flex">
        <h2 ref={marqueeRef} className="text-[20vw] font-display font-bold text-white whitespace-nowrap uppercase tracking-tighter leading-none">
          COSMIC ROUTINES — DIVINE PATHWAY — COSMIC ROUTINES — DIVINE PATHWAY —
        </h2>
      </div>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E5C07B]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Heading */}
      <div className="rt-title-container text-center mb-32 relative z-10 w-full flex flex-col items-center">
        <div className="rt-title inline-flex items-center gap-4 mb-6">
          <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Spiritual Architecture</span>
        </div>
        <h2 className="rt-title text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter uppercase leading-[0.9]">
          SACRED <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white italic font-light ml-24">RITUALS</span>
        </h2>
      </div>

      {/* Cards Grid - Minimalistic & Structural */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative z-10 max-w-[1600px] mx-auto w-full perspective-1000">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="group flex flex-col items-start justify-between min-h-[500px] p-8 md:p-10 relative overflow-hidden bg-[#0a0a0c] border border-white/[0.05] hover:border-[#E5C07B]/30 transition-colors duration-700"
          >
            {/* Soft internal glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#E5C07B]/0 to-[#E5C07B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            {/* Icon Block */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-12 relative z-10 overflow-hidden bg-white/5 border border-white/10 group-hover:bg-[#E5C07B]/10 group-hover:border-[#E5C07B]/50 transition-all duration-700">
              <img
                src={service.icon}
                alt={service.title}
                className="w-8 h-8 object-contain filter invert opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-col items-start w-full z-10">
              <h3 className="text-2xl md:text-3xl font-display font-light text-white mb-6 uppercase tracking-wide group-hover:text-[#E5C07B] transition-colors duration-500">
                {service.title}
              </h3>

              <p className="text-sm md:text-base text-gray-500 leading-relaxed font-light mb-12">
                {service.description}
              </p>
            </div>

            {/* Magnetic Button */}
            <div className="z-10 w-full pt-6 border-t border-white/[0.05] group-hover:border-[#E5C07B]/20 transition-colors duration-700 mt-auto">
              <button className="magnetic flex items-center gap-4 group/btn w-fit">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white group-hover/btn:text-[#E5C07B] transition-colors duration-300">
                  Initiate
                </span>
                <div className="w-8 h-[1px] bg-white group-hover/btn:bg-[#E5C07B] group-hover/btn:w-16 transition-all duration-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyRoutines;
