import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0c] text-white pt-24 pb-8 relative overflow-hidden border-t border-white/10">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8A2BE2]/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 relative z-10">

          {/* Brand & About */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">
              Cosmic <span className="text-gradient italic font-light">Astrology</span>
            </h2>
            <p className="text-gray-400 leading-relaxed font-light max-w-sm">
              We bring you cosmic guidance wrapped in clarity and calm. Discover the mystical connections between the stars and your soul's journey.
            </p>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-white tracking-widest uppercase mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
                  >
                    <Icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display text-white mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#D4AF37]"></span> Contact
            </h4>
            <ul className="space-y-5 text-sm text-gray-400 font-light">
              <li className="flex items-start gap-4 group cursor-pointer hover:text-white transition-colors duration-300">
                <FaMapMarkerAlt className="text-[#D4AF37] mt-1 text-base group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all" />
                <span>Chaibasa, Jharkhand, INDIA</span>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer hover:text-white transition-colors duration-300">
                <FaPaperPlane className="text-[#D4AF37] mt-1 text-base group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all" />
                <span>guidance@cosmicastrology.com</span>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer hover:text-white transition-colors duration-300">
                <FaPhoneAlt className="text-[#D4AF37] mt-1 text-base group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all" />
                <span>+91 7903 344 316</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-display text-white mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#D4AF37]"></span> Services
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              {["Daily Horoscope", "AI Palm Reading", "Love Compatibility", "Vedic Astrology"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors">✦</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 border-t border-white/10 text-xs text-gray-500 font-light">
          <p>© {new Date().getFullYear()} Cosmic Astrology. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
