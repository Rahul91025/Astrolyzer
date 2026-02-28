import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { getApiUrl } from "../../config/api";

const PalmReaderUpload = () => {
  const [image, setImage] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image of your palm to begin the reading.");

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("additionalInfo", additionalInfo);

      const response = await axios.post(getApiUrl("/api/ai/analyze"), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("The cosmic connection was interrupted. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatResult = (text) => {
    return text
      .replace(/\*/g, "") // remove all stars
      .split("\n")
      .filter((line) => line.trim())
      .map((point, idx) => (
        <li key={idx} className="mb-4 text-gray-300 leading-relaxed font-light">
          {point.trim()}
        </li>
      ));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-28 pb-20 px-6 flex flex-col items-center relative overflow-hidden">

      {/* Mystical Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#4B0082]/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            AI Palm <span className="text-gradient italic">Reading</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Upload an image of your palm to receive a divine reading. Let our AI Pundit analyze your life lines and planetary mounts.
          </p>
        </div>

        <div className="glass-card flex flex-col md:flex-row overflow-hidden border border-white/10 w-full">

          {/* Left Visual Panel */}
          <div className="md:w-1/2 hidden md:flex items-center justify-center p-12 relative border-r border-white/10 bg-black/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center opacity-30"
            >
              <img src="/images/bg1.png" alt="Zodiac" className="w-[120%] h-auto object-contain mix-blend-screen" />
            </motion.div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              <img src="/images/palm.png" alt="Mystical Palm" className="w-[80%] h-auto object-contain mx-auto filter brightness-90 sepia-[.3] hue-rotate-[-30deg]" />
            </motion.div>
          </div>

          {/* Form Panel */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-display font-semibold text-white mb-8">Reveal Your Destiny</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="relative group">
                <label className="relative flex flex-col items-center justify-center w-full h-56 border border-dashed border-white/20 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden">
                  {!image ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FaUpload className="text-[#D4AF37] text-2xl" />
                      </div>
                      <span className="text-sm text-gray-400 font-light tracking-wide">Upload clear palm photo</span>
                      <span className="text-xs text-gray-500 mt-2">JPEG, PNG up to 5MB</span>
                    </>
                  ) : (
                    <>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Palm Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm">Change Image</span>
                      </div>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label htmlFor="info" className="block text-sm text-gray-400 mb-2 font-light">
                  Ask a specific question (Optional)
                </label>
                <textarea
                  id="info"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="e.g., Will I be successful in my new business venture?"
                  className="input-premium h-32 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3
                  ${loading
                    ? 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/10'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] scale-100 hover:scale-[1.02]'
                  }
                `}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-xl" />
                    <span>Consulting the Stars...</span>
                  </>
                ) : (
                  "Read My Palm"
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Result Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 z-10"
          >
            {/* Image Preview Card */}
            <div className="glass-card p-6 border border-[#D4AF37]/20 flex flex-col">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <h3 className="text-xl font-display text-white">Analyzed Palm</h3>
              </div>
              <div className="flex-grow flex items-center justify-center bg-black/40 rounded-xl overflow-hidden group">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Analyzed Palm"
                  className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-500"
                />
              </div>
            </div>

            {/* Reading Text Card */}
            <div className="glass-card p-8 border border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.1)] flex flex-col relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent pointer-events-none" />

              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
                <span className="text-2xl">✨</span>
                <h3 className="text-2xl font-display text-[#D4AF37]">Divine Reading</h3>
              </div>

              <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar relative z-10">
                <ul className="list-none space-y-4">
                  {formatResult(result.message)}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PalmReaderUpload;
