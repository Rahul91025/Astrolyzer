import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { FaPhoneAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AboutAstrology = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Title Reveal
      const splitTitle = new SplitType(titleRef.current, { types: 'lines, words' });
      gsap.from(splitTitle.words, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        }
      });

      // Parallax Image
      if (imgRef.current) {
        gsap.from(imgRef.current, {
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      // Content reveals
      gsap.from(".about-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%"
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#050505] px-6 md:px-12 lg:px-24 py-32 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-[#E5C07B]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-center gap-20 xl:gap-32 relative z-10">

        {/* Image block with parallax */}
        <div className="xl:w-1/2 w-full max-w-lg mx-auto xl:mx-0 relative flex-shrink-0">
          <div className="overflow-hidden rounded-none relative aspect-[3/4]">
            <img
              ref={imgRef}
              src="/images/about2.jpg"
              alt="Astrology Readings"
              className="w-full h-full object-cover scale-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
          </div>

          {/* Floating Tag */}
          <div className="about-reveal absolute -bottom-6 -right-6 bg-[#E5C07B] p-6 text-black text-sm font-bold uppercase tracking-widest hidden md:block">
            Est.<br />Ancient Times
          </div>

          {/* Corner accent */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-[#E5C07B]/30 pointer-events-none" />
        </div>

        {/* Text Content */}
        <div className="xl:w-1/2 w-full space-y-10">

          <div className="about-reveal flex items-center gap-4">
            <span className="text-[#E5C07B] text-[10px] font-bold tracking-[0.4em] uppercase">Our Essence</span>
            <div className="flex-1 h-[1px] bg-white/[0.06] max-w-[60px]" />
          </div>

          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[0.9] tracking-tighter uppercase"
          >
            Cosmic<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-500 to-white italic font-light">
              Truths
            </span>
          </h2>

          <p className="about-reveal text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-xl">
            Astrology is more than mere predictions—it's a profound pathway to understanding your inner self and your place in the vast universe. With centuries of ancient wisdom, we help you align with the cosmos's rhythm.
          </p>

          <p className="about-reveal text-base md:text-lg text-gray-500 leading-relaxed font-light max-w-xl">
            Our master astrologers are here to guide you on a transformative journey of self-discovery. Learn what the stars have written for your future.
          </p>

          <div className="about-reveal flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
            {/* CTA Button */}
            <button className="magnetic group flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-[#E5C07B]/50 flex items-center justify-center group-hover:bg-[#E5C07B] group-hover:border-[#E5C07B] transition-all duration-500">
                <div className="w-0 group-hover:w-4 h-[1px] bg-black transition-all duration-500" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white group-hover:text-[#E5C07B] transition-colors duration-300">
                Discover More
              </span>
            </button>

            {/* Phone */}
            <div className="flex items-center gap-4 border-l border-white/[0.07] pl-6">
              <div className="w-10 h-10 rounded-full bg-[#E5C07B]/10 border border-[#E5C07B]/30 flex items-center justify-center">
                <FaPhoneAlt className="text-[#E5C07B] text-sm" />
              </div>
              <div>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Consult an Expert</p>
                <p className="text-base font-display font-semibold text-white">+91 7903 344 316</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAstrology;
