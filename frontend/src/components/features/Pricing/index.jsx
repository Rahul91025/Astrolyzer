import React from "react";
import { motion } from "framer-motion";
import constellationBg from "../../../assets/cosmic/constellation-bg.png";

const TickItem = ({ text }) => (
  <li className="flex items-start gap-3 text-mystic-text-sec font-light transition-colors duration-700">
    <span className="text-mystic-gold mt-1 text-xs transition-colors duration-700">✦</span>
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
    <div className="bg-mystic-bg-sec py-24 px-6 relative overflow-hidden transition-colors duration-700">
      {/* Premium Constellation Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 premium-invert-light transition-all duration-700">
        <img src={constellationBg} alt="" className="w-full h-full object-cover premium-blend" />
      </div>
      {/* Background Glows */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-mystic-gold/10 rounded-full blur-[150px] pointer-events-none transition-colors duration-700" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-mystic-accent/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-700" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-mystic-gold transition-colors duration-700"></span>
            <span className="text-mystic-gold font-semibold tracking-widest uppercase text-sm transition-colors duration-700">Cosmic Investment</span>
            <span className="w-8 h-[1px] bg-mystic-gold transition-colors duration-700"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-mystic-text mb-6 tracking-tight transition-colors duration-700">
            Choose Your <span className="text-gradient italic">Path</span>
          </h2>
          <p className="text-mystic-text-sec max-w-xl mx-auto text-lg font-light leading-relaxed transition-colors duration-700">
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
        <motion.div variants={cardVariants} className="glass-card hover:bg-mystic-text/5 transition-colors duration-500 text-center py-12 px-8 border border-mystic-border-subtle group">
          <h3 className="text-xl font-display font-medium text-mystic-text mb-2 transition-colors duration-700">Seeker</h3>
          <p className="text-sm text-mystic-text-sec font-light mb-8 transition-colors duration-700">For the curious soul</p>

          <div className="flex justify-center items-baseline gap-1 mb-8">
            <span className="text-3xl text-mystic-gold font-light transition-colors duration-700">$</span>
            <span className="text-5xl font-display font-bold text-mystic-text transition-colors duration-700">19</span>
            <span className="text-mystic-text-sec text-sm font-light transition-colors duration-700">/mo</span>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-mystic-border-subtle to-transparent mb-8 transition-colors duration-700" />

          <ul className="text-left space-y-4 mb-10 min-h-[250px]">
            {features.slice(0, 3).map((feature, idx) => (
              <TickItem key={`basic-${idx}`} text={feature} />
            ))}
          </ul>

          <button className="w-full py-4 border border-mystic-border text-mystic-text font-semibold tracking-widest uppercase text-sm hover:border-mystic-gold hover:text-mystic-gold transition-all duration-300">
            Begin Journey
          </button>
        </motion.div>

        {/* Standard Package */}
        <motion.div variants={cardVariants} className="glass-card relative scale-100 md:scale-105 z-20 text-center py-14 px-8 border border-mystic-gold/50 shadow-[0_0_40px_rgba(229,192,123,0.15)] overflow-hidden group transition-colors duration-700">
          <div className="absolute top-6 right-0 bg-gradient-to-r from-mystic-gold to-yellow-300 text-mystic-bg text-xs py-1.5 px-6 font-semibold uppercase tracking-widest rounded-l-full shadow-lg z-10 transition-colors duration-700">
            Most Popular
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-mystic-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <h3 className="text-2xl font-display font-semibold text-mystic-gold mb-2 transition-colors duration-700">Mystic</h3>
          <p className="text-sm text-mystic-text-sec font-light mb-8 transition-colors duration-700">Deepen your connection</p>

          <div className="flex justify-center items-baseline gap-1 mb-8">
            <span className="text-4xl text-mystic-text font-light transition-colors duration-700">$</span>
            <span className="text-6xl font-display font-bold text-mystic-text drop-shadow-[0_0_15px_rgba(229,192,123,0.3)] transition-colors duration-700">49</span>
            <span className="text-mystic-text-sec text-sm font-light transition-colors duration-700">/mo</span>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-mystic-gold/30 to-transparent mb-8 transition-colors duration-700" />

          <ul className="text-left space-y-4 mb-10 min-h-[250px] relative z-10">
            {features.slice(0, 5).map((feature, idx) => (
              <TickItem key={`std-${idx}`} text={feature} />
            ))}
          </ul>

          <button className="w-full py-4 bg-gradient-to-r from-mystic-gold to-yellow-300 text-mystic-bg font-semibold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(229,192,123,0.3)] hover:shadow-[0_0_30px_rgba(229,192,123,0.5)] transition-all duration-300 relative z-10">
            Awaken Now
          </button>
        </motion.div>

        {/* Pro Package */}
        <motion.div variants={cardVariants} className="glass-card hover:bg-mystic-text/5 transition-colors duration-500 text-center py-12 px-8 border border-mystic-border-subtle group">
          <h3 className="text-xl font-display font-medium text-mystic-text mb-2 transition-colors duration-700">Oracle</h3>
          <p className="text-sm text-mystic-text-sec font-light mb-8 transition-colors duration-700">Ultimate cosmic mastery</p>

          <div className="flex justify-center items-baseline gap-1 mb-8">
            <span className="text-3xl text-mystic-gold font-light transition-colors duration-700">$</span>
            <span className="text-5xl font-display font-bold text-mystic-text transition-colors duration-700">99</span>
            <span className="text-mystic-text-sec text-sm font-light transition-colors duration-700">/mo</span>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-mystic-border-subtle to-transparent mb-8 transition-colors duration-700" />

          <ul className="text-left space-y-4 mb-10 min-h-[250px]">
            {features.map((feature, idx) => (
              <TickItem key={`pro-${idx}`} text={feature} />
            ))}
          </ul>

          <button className="w-full py-4 border border-mystic-border text-mystic-text font-semibold tracking-widest uppercase text-sm hover:border-mystic-gold hover:text-mystic-gold transition-all duration-300">
            Reach Ascendance
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PricingSection;
