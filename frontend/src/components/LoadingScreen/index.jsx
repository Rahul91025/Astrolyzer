import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Rotating Element */}
                <motion.div
                    className="w-24 h-24 mb-8 relative flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute inset-0 rounded-full border-r-2 border-t-2 border-[#D4AF37]/30" />
                    <div className="absolute inset-2 rounded-full border-l-2 border-b-2 border-white/20" />
                    <div className="text-3xl text-[#D4AF37]">✦</div>
                </motion.div>

                <h2 className="text-2xl font-display font-bold text-white tracking-widest uppercase mb-2">
                    Consulting the <span className="text-gradient italic">Stars</span>
                </h2>

                {/* Loading Dots */}
                <div className="flex gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-[#D4AF37]"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default LoadingScreen;
