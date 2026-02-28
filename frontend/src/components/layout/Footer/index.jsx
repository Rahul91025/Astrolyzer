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
    <footer className="bg-mystic-bg-sec text-mystic-text pt-24 pb-8 relative overflow-hidden border-t border-mystic-border transition-colors duration-700">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-mystic-gold/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 transition-colors duration-700" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-mystic-accent/10 rounded-full blur-[150px] pointer-events-none translate-y-1/2 transition-colors duration-700" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 relative z-10">

          {/* Brand & About */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h2 className="text-3xl font-display font-bold text-mystic-text tracking-tight transition-colors duration-700">
              Cosmic <span className="text-gradient italic font-light">Astrology</span>
            </h2>
            <p className="text-mystic-text-sec leading-relaxed font-light max-w-sm transition-colors duration-700">
              We bring you cosmic guidance wrapped in clarity and calm. Discover the mystical connections between the stars and your soul's journey.
            </p>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-mystic-text tracking-widest uppercase mb-4 transition-colors duration-700">Connect With Us</h4>
              <div className="flex gap-4">
                {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-mystic-border flex items-center justify-center text-mystic-text-sec hover:text-mystic-gold hover:border-mystic-gold hover:bg-mystic-gold/10 transition-all duration-300"
                  >
                    <Icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display text-mystic-text mb-6 flex items-center gap-2 transition-colors duration-700">
              <span className="w-4 h-[1px] bg-mystic-gold transition-colors duration-700"></span> Contact
            </h4>
            <ul className="space-y-5 text-sm text-mystic-text-sec font-light transition-colors duration-700">
              <li className="flex items-start gap-4 group cursor-pointer hover:text-mystic-text transition-colors duration-300">
                <FaMapMarkerAlt className="text-mystic-gold mt-1 text-base transition-colors group-hover:drop-shadow-[0_0_8px_rgba(229,192,123,0.8)]" />
                <span>Chaibasa, Jharkhand, INDIA</span>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer hover:text-mystic-text transition-colors duration-300">
                <FaPaperPlane className="text-mystic-gold mt-1 text-base transition-colors group-hover:drop-shadow-[0_0_8px_rgba(229,192,123,0.8)]" />
                <span>guidance@cosmicastrology.com</span>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer hover:text-mystic-text transition-colors duration-300">
                <FaPhoneAlt className="text-mystic-gold mt-1 text-base transition-colors group-hover:drop-shadow-[0_0_8px_rgba(229,192,123,0.8)]" />
                <span>+91 7903 344 316</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-display text-mystic-text mb-6 flex items-center gap-2 transition-colors duration-700">
              <span className="w-4 h-[1px] bg-mystic-gold transition-colors duration-700"></span> Services
            </h4>
            <ul className="space-y-4 text-sm text-mystic-text-sec font-light transition-colors duration-700">
              {["Daily Horoscope", "AI Palm Reading", "Love Compatibility", "Vedic Astrology"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-mystic-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="text-mystic-gold/50 group-hover:text-mystic-gold transition-colors">✦</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 border-t border-mystic-border text-xs text-mystic-text-sec font-light transition-colors duration-700">
          <p>© {new Date().getFullYear()} Cosmic Astrology. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-mystic-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-mystic-text transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
