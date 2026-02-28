import React from "react";
import { motion } from "framer-motion";
import constellationBg from "../../../assets/cosmic/constellation-bg.png";

const TickItem = ({ text }) => (
  <li className="flex items-start gap-3 text-gray-400 font-light">
    <span className="text-[#D4AF37] mt-1 text-xs">✦</span>
    <span>{text}</span>
  </li>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const PricingSection = () => {
  const features = [
    "Personalized Daily Horoscope",
    "Monthly Tarot Reading",
    "Birth Chart Analysis",
    "Spiritual Guidance Session",
    "Priority AI Palm Reading",
    "Compatibility Reports",
    "Cosmic Event Alerts",
  ];

  return (
    <div className="bg-[#0a0a0c] py-24 px-6 relative overflow-hidden">
      {/* Premium Constellation Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <img src={constellationBg} alt="" className="w-full h-full object-cover mix-blend-screen" />
      </div>
      {/* Background Glows */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#8A2BE2]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
            <span className="text-[#D4AF37] font-semibold tracking-widest uppercase text-sm">Cosmic Investment</span>
            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            Choose Your <span className="text-gradient italic">Path</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Unlock the universe's secrets with our premium astrology packages crafted for every stage of your spiritual journey.
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-center"
      >
        {/* Basic Package */}
        <motion.div variants={cardVariants} className="glass-card hover:bg-white/5 transition-colors duration-500 text-center py-12 px-8 border border-white/10 group">
          <h3 className="text-xl font-display font-medium text-white mb-2">Seeker</h3>
          <p className="text-sm text-gray-500 font-light mb-8">For the curious soul</p>

          <div className="flex justify-center items-baseline gap-1 mb-8">
            <span className="text-3xl text-[#D4AF37] font-light">$</span>
            <span className="text-5xl font-display font-bold text-white">19</span>
            <span className="text-gray-500 text-sm font-light">/mo</span>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          <ul className="text-left space-y-4 mb-10 min-h-[250px]">
            {features.slice(0, 3).map((feature, idx) => (
              <TickItem key={`basic-${idx}`} text={feature} />
            ))}
          </ul>

          <button className="w-full py-4 border border-white/20 text-white font-semibold tracking-widest uppercase text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
            Begin Journey
          </button>
        </motion.div>

        {/* Standard Package */}
        <motion.div variants={cardVariants} className="glass-card relative scale-100 md:scale-105 z-20 text-center py-14 px-8 border border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden group">
          <div className="absolute top-6 right-0 bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-black text-xs py-1.5 px-6 font-semibold uppercase tracking-widest rounded-l-full shadow-lg z-10">
            Most Popular
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <h3 className="text-2xl font-display font-semibold text-[#D4AF37] mb-2">Mystic</h3>
          <p className="text-sm text-gray-400 font-light mb-8">Deepen your connection</p>

          <div className="flex justify-center items-baseline gap-1 mb-8">
            <span className="text-4xl text-white font-light">$</span>
            <span className="text-6xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">49</span>
            <span className="text-gray-400 text-sm font-light">/mo</span>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-8" />

          <ul className="text-left space-y-4 mb-10 min-h-[250px] relative z-10">
            {features.slice(0, 5).map((feature, idx) => (
              <TickItem key={`std-${idx}`} text={feature} />
            ))}
          </ul>

          <button className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-black font-semibold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow duration-300 relative z-10">
            Awaken Now
          </button>
        </motion.div>

        {/* Pro Package */}
        <motion.div variants={cardVariants} className="glass-card hover:bg-white/5 transition-colors duration-500 text-center py-12 px-8 border border-white/10 group">
          <h3 className="text-xl font-display font-medium text-white mb-2">Oracle</h3>
          <p className="text-sm text-gray-500 font-light mb-8">Ultimate cosmic mastery</p>

          <div className="flex justify-center items-baseline gap-1 mb-8">
            <span className="text-3xl text-[#D4AF37] font-light">$</span>
            <span className="text-5xl font-display font-bold text-white">99</span>
            <span className="text-gray-500 text-sm font-light">/mo</span>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          <ul className="text-left space-y-4 mb-10 min-h-[250px]">
            {features.map((feature, idx) => (
              <TickItem key={`pro-${idx}`} text={feature} />
            ))}
          </ul>

          <button className="w-full py-4 border border-white/20 text-white font-semibold tracking-widest uppercase text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
            Reach Ascendance
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PricingSection;
