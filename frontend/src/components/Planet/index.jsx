import React from 'react';
import { motion } from 'framer-motion';

const Planet = ({ title }) => {
    return (
        <div className="relative w-full bg-[#0a0a0c] pt-40 pb-24 px-6 md:px-12 text-center overflow-hidden flex flex-col items-center border-b border-white/10">
            {/* Cosmic Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#8A2BE2]/5 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-3xl flex flex-col items-center"
            >
                <div className="inline-flex items-center gap-3 mb-6">
                    <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                    <span className="text-[#D4AF37] font-semibold tracking-widest uppercase text-sm">Celestial Journey</span>
                    <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight">
                    {title}
                </h1>

                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                    Discover the mystical connections between the stars and your soul's journey. Delve deep into the cosmic wisdom.
                </p>
            </motion.div>
        </div>
    );
};

export default Planet;