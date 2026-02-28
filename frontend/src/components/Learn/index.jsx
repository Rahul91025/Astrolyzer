import React from "react";
import { motion } from "framer-motion";

const AstrologyPage = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0c] flex items-center justify-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden">

      {/* Immersive Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#8A2BE2]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Container */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center z-10">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            <span className="text-[#D4AF37] font-semibold tracking-widest uppercase text-sm">Divine Knowledge</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8 leading-tight">
            Learn <span className="text-gradient italic font-light">Astrology</span>
          </h2>

          <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg mb-12">
            <p>
              Delve into the ancient wisdom of the cosmos. Our expert guidance helps you unravel the intricate patterns woven by celestial bodies at the exact moment of your birth.
            </p>
            <p>
              Discover how planetary alignments shape your personality, influence your relationships, and chart the course of your life's journey. Awaken your spiritual awareness and find harmony through cosmic understanding.
            </p>
          </div>

          <button className="group relative overflow-hidden px-10 py-4 border border-[#D4AF37] bg-transparent transition-all duration-300">
            <span className="relative z-10 text-sm font-semibold tracking-widest uppercase text-[#D4AF37] group-hover:text-black transition-colors duration-300">
              Read the Stars
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </button>
        </motion.div>

        {/* Image and SVG Background */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center w-full aspect-square md:aspect-auto h-[500px] lg:h-[600px]"
        >
          {/* Rotating Zodiac Mandala Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.img
              src="/images/bg1.png"
              alt="Astrology background"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="max-w-[120%] md:max-w-full lg:max-w-[600px] w-full object-contain opacity-30 mix-blend-screen"
            />
          </div>

          {/* Glowing Aura behind person */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37] opacity-20 blur-[60px] rounded-full" />

          {/* Foreground Person Image */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative z-10 h-[80%] lg:h-[90%] flex items-end"
          >
            <img
              src="/images/Dhirendra-Shastri.png"
              alt="Astrologer"
              className="max-h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-1/4 right-0 glass-card px-4 py-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-2xl"
          >
            <span className="text-2xl">✨</span>
            <div>
              <p className="text-white font-bold text-sm">Vedic Wisdom</p>
              <p className="text-[#D4AF37] text-xs">5000+ Years Old</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default AstrologyPage;
