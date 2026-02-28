import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { FaPhoneAlt } from "react-icons/fa";
import constellationBg from "../../../assets/cosmic/constellation-bg.png";

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
    <section ref={containerRef} className="bg-mystic-bg px-6 md:px-12 lg:px-24 py-32 relative overflow-hidden transition-colors duration-700">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 z-0 opacity-20 premium-invert-light transition-all duration-700">
          <img src={constellationBg} alt="" className="w-full h-full object-cover premium-blend" />
        </div>
        <div className="absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-mystic-gold/10 rounded-full blur-[150px] transition-colors duration-700" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-mystic-bg/80 via-transparent to-transparent transition-colors duration-700" />
          </div>

          {/* Floating Tag */}
          <div className="about-reveal absolute -bottom-6 -right-6 bg-mystic-gold p-6 text-mystic-bg text-sm font-bold uppercase tracking-widest hidden md:block transition-colors duration-700">
            Est.<br />Ancient Times
          </div>

          {/* Corner accent */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-mystic-gold/30 pointer-events-none transition-colors duration-700" />
        </div>

        {/* Text Content */}
        <div className="xl:w-1/2 w-full space-y-10">

          <div className="about-reveal flex items-center gap-4">
            <span className="text-mystic-gold text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-700">Our Essence</span>
            <div className="flex-1 h-[1px] bg-mystic-border max-w-[60px] transition-colors duration-700" />
          </div>

          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-mystic-text leading-[0.9] tracking-tighter uppercase transition-colors duration-700"
          >
            Cosmic<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-mystic-text-sec to-mystic-text italic font-light transition-colors duration-700">
              Truths
            </span>
          </h2>

          <p className="about-reveal text-base md:text-lg text-mystic-text-sec leading-relaxed font-light max-w-xl transition-colors duration-700">
            Astrology is more than mere predictions—it's a profound pathway to understanding your inner self and your place in the vast universe. With centuries of ancient wisdom, we help you align with the cosmos's rhythm.
          </p>

          <p className="about-reveal text-base md:text-lg text-mystic-text-sec/80 leading-relaxed font-light max-w-xl transition-colors duration-700">
            Our master astrologers are here to guide you on a transformative journey of self-discovery. Learn what the stars have written for your future.
          </p>

          <div className="about-reveal flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
            {/* CTA Button */}
            <button className="magnetic group flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-mystic-gold/50 flex items-center justify-center group-hover:bg-mystic-gold group-hover:border-mystic-gold transition-all duration-500">
                <div className="w-0 group-hover:w-4 h-[1px] bg-mystic-bg transition-all duration-500" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-mystic-text group-hover:text-mystic-gold transition-colors duration-300">
                Discover More
              </span>
            </button>

            {/* Phone */}
            <div className="flex items-center gap-4 border-l border-mystic-border-subtle pl-6 transition-colors duration-700">
              <div className="w-10 h-10 rounded-full bg-mystic-gold/10 border border-mystic-gold/30 flex items-center justify-center transition-colors duration-700">
                <FaPhoneAlt className="text-mystic-gold text-sm transition-colors duration-700" />
              </div>
              <div>
                <p className="text-[10px] text-mystic-text-sec uppercase tracking-widest mb-1 transition-colors duration-700">Consult an Expert</p>
                <p className="text-base font-display font-semibold text-mystic-text transition-colors duration-700">+91 7903 344 316</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAstrology;
