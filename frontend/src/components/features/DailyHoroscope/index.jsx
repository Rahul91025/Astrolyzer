import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { aiService } from '../../../api';
import { useApi } from '../../../hooks/useApi';
import constellationBg from '../../../assets/cosmic/constellation-bg.png';

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const DailyHoroscope = () => {
    const [selectedSign, setSelectedSign] = useState(null);
    const [horoscope, setHoroscope] = useState(null);
    const { loading, execute } = useApi(aiService.getDailyHoroscope);

    const fetchHoroscope = async (sign) => {
        setSelectedSign(sign);
        setHoroscope(null);

        const loadingToast = toast.loading(`Reading the stars for ${sign}...`);

        try {
            const data = await execute(sign);
            setHoroscope(data.horoscope);
            toast.success("Cosmic guidance received.", { id: loadingToast });
        } catch (err) {
            console.error('Horoscope error:', err);
            toast.error("The stars seem clouded right now. Try again later.", { id: loadingToast });
        }
    };

    return (
        <section className="relative py-24 bg-[#0a0a0c] overflow-hidden border-t border-white/5">
            {/* Constellation Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
                <img src={constellationBg} alt="" className="w-full h-full object-cover mix-blend-screen" />
            </div>
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">Daily Insight</p>
                    <h2 className="text-4xl md:text-6xl font-display font-semibold text-white mb-6">
                        AI Cosmic <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white italic font-light">Forecast</span>
                    </h2>
                    <p className="text-gray-400 font-light max-w-xl mx-auto text-lg leading-relaxed">
                        Select your sun sign to receive a personalized, AI-generated astrological reading based on today's unique planetary alignments.
                    </p>
                </div>

                {/* Zodiac Selector */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
                    {ZODIAC_SIGNS.map((sign) => (
                        <button
                            key={sign}
                            onClick={() => fetchHoroscope(sign)}
                            disabled={loading && selectedSign !== sign}
                            className={`relative overflow-hidden group py-4 px-2 rounded-xl transition-all duration-300 border
                ${selectedSign === sign
                                    ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                                }
              `}
                        >
                            <div className="flex flex-col items-center gap-2 relative z-10">
                                <img
                                    src={`/images/${sign.toLowerCase()}.png`}
                                    alt={sign}
                                    className={`w-10 h-10 object-contain transition-all duration-500
                    ${selectedSign === sign ? 'filter sepia-[.5] hue-rotate-[-20deg] brightness-125 saturate-150' : 'opacity-60 group-hover:opacity-100'}
                  `}
                                    onError={(e) => {
                                        // Fallback to text icon if image doesn't exist
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span style={{ display: 'none' }} className="text-2xl mb-1">✨</span>
                                <span className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300
                  ${selectedSign === sign ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-white'}
                `}>
                                    {sign}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Horoscope Results Display */}
                <div className="max-w-3xl mx-auto h-[250px]">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center justify-center h-full text-center"
                            >
                                <div className="w-16 h-16 rounded-full border border-t-[#D4AF37] border-white/10 animate-spin mb-6" />
                                <p className="text-gray-300 font-light tracking-wide animate-pulse">Consulting the celestial bodies...</p>
                            </motion.div>
                        ) : horoscope ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.05)] text-center h-full flex flex-col justify-center"
                            >
                                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-tl-2xl pointer-events-none" />
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#D4AF37]/20 to-transparent rounded-br-2xl pointer-events-none" />

                                <h3 className="text-2xl font-display text-[#D4AF37] mb-6 tracking-wide drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
                                    {selectedSign} Daily Insight
                                </h3>
                                <p className="text-white/90 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-serif italic">
                                    "{horoscope}"
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex h-full items-center justify-center opacity-30"
                            >
                                <span className="text-6xl filter grayscale">✨</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default DailyHoroscope;
