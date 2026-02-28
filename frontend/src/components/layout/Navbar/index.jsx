import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegHandPaper } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const navItems = [
  { name: "Home", path: "/", num: "01" },
  { name: "About", path: "/about", num: "02" },
  { name: "Services", path: "/service", num: "03" },
  { name: "Appointment", path: "/appointment", num: "04" },
  { name: "Shop", path: "/shop", num: "05" },
  { name: "Contact", path: "/contact", num: "06" },
];

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  const menuVariants = {
    closed: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    open: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  const itemVariants = {
    closed: { y: 80, opacity: 0 },
    open: (i) => ({ y: 0, opacity: 1, transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.76, 0, 0.24, 1] } }),
  };

  return (
    <>
      {/* Main Navbar Bar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04] py-4' : 'py-6'}`}>
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Premium Logo */}
          <Link to="/" className="magnetic flex items-center gap-4 z-20 group perspective-[1000px]">
            <div className="relative flex items-center justify-center w-12 h-12 transform-style-3d group-hover:rotate-x-12 group-hover:-rotate-y-12 transition-transform duration-700">
              {/* Spinning background glow */}
              <div className="absolute inset-0 bg-[#E5C07B] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

              {/* Geometric SVG Symbol */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#E5C07B] drop-shadow-[0_0_8px_rgba(229,192,123,0.5)]">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2D8" />
                    <stop offset="50%" stopColor="#E5C07B" />
                    <stop offset="100%" stopColor="#9C7A3C" />
                  </linearGradient>
                </defs>

                {/* Outer rotating dashed ring */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="2 4" className="origin-center animate-[spin_20s_linear_infinite]" />

                {/* Middle solid ring */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" className="opacity-50" />

                {/* Eight-pointed star base */}
                <path d="M50 15 L53 47 L85 50 L53 53 L50 85 L47 53 L15 50 L47 47 Z" fill="url(#goldGrad)" className="opacity-90 origin-center animate-[pulse_4s_ease-in-out_infinite]" />
                <path d="M50 15 L53 47 L85 50 L53 53 L50 85 L47 53 L15 50 L47 47 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="1" className="origin-center rotate-45 opacity-40" />

                {/* Inner geometric shapes */}
                <circle cx="50" cy="50" r="18" fill="none" stroke="url(#goldGrad)" strokeWidth="1" />
                <circle cx="50" cy="50" r="8" fill="#050505" stroke="url(#goldGrad)" strokeWidth="1" />

                {/* Center Diamond */}
                <path d="M50 45 L52 50 L50 55 L48 50 Z" fill="url(#goldGrad)" />
              </svg>
            </div>

            {/* Logo Typography */}
            <div className="flex flex-col pt-1">
              <span className={`font-display text-xl md:text-2xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r uppercase leading-none transition-all duration-700 ${isDark ? 'from-white via-gray-200 to-gray-500 group-hover:from-[#E5C07B] group-hover:to-white' : 'from-gray-900 via-gray-700 to-[#E5C07B] group-hover:from-[#E5C07B] group-hover:to-gray-900'}`}>
                ASTROLOGER
              </span>
              <span className="text-[#E5C07B] text-[7px] font-black tracking-[0.5em] uppercase opacity-80 mt-1 pl-1">
                Cosmic Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav - minimal */}
          <nav className="hidden lg:flex items-center gap-4">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`magnetic text-xs uppercase tracking-[0.15em] font-bold transition-colors duration-300 py-2 ${isActive(item.path) ? 'text-[#E5C07B]' : 'text-gray-500 hover:text-white'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6 z-20">

            <Link to="/palm" className="magnetic hidden md:flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-white transition-colors duration-300">
              <FaRegHandPaper className="text-sm" />
              Palm AI
            </Link>

            <div className="hidden md:flex items-center gap-6 border-l border-white/10 pl-6">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="magnetic flex items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:border-[#E5C07B] text-white hover:text-[#E5C07B] transition-all duration-300"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={14} className="animate-[spin_10s_linear_infinite]" /> : <Moon size={14} className="animate-[pulse_4s_ease-in-out_infinite]" />}
              </button>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="magnetic px-5 py-2 border border-white/20 hover:border-[#E5C07B] text-xs font-bold tracking-[0.15em] uppercase text-white transition-all duration-300 hover:text-[#E5C07B]">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 border-2 border-[#E5C07B]/50" } }} />
              </SignedIn>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="magnetic flex flex-col items-end gap-[5px] w-8 cursor-none z-20"
              aria-label="Menu"
            >
              <motion.div
                className="h-[1px] bg-white"
                animate={{ width: menuOpen ? "100%" : "100%", rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="h-[1px] bg-white"
                animate={{
                  width: menuOpen ? "100%" : "60%",
                  opacity: menuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="h-[1px] bg-white"
                animate={{ width: "100%", rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay Menu */}
      <motion.div
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed inset-0 z-40 bg-[#050505] flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Left Column - Navigation */}
        <div className="flex-1 flex flex-col justify-center px-10 md:px-20 lg:px-28 py-24">
          <p className="text-[#E5C07B] text-[10px] font-bold tracking-[0.4em] uppercase mb-16">Navigation</p>
          <nav className="flex flex-col">
            {navItems.map((item, i) => (
              <motion.div
                key={item.path}
                custom={i}
                variants={itemVariants}
                initial="closed"
                animate={menuOpen ? "open" : "closed"}
                className="overflow-hidden border-b border-white/[0.05]"
              >
                <Link
                  to={item.path}
                  className="magnetic group flex items-baseline gap-6 py-5 md:py-7 transition-all duration-300 hover:pl-4"
                >
                  <span className="text-gray-600 text-xs font-bold tracking-wider group-hover:text-[#E5C07B] transition-colors duration-300">
                    {item.num}
                  </span>
                  <h2 className={`text-4xl md:text-6xl lg:text-7xl font-display font-light uppercase tracking-tight leading-none group-hover:text-[#E5C07B] transition-colors duration-500 ${isActive(item.path) ? 'text-[#E5C07B]' : 'text-white'}`}>
                    {item.name}
                  </h2>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Right Column - Info */}
        <div className="hidden lg:flex lg:w-[300px] xl:w-[400px] flex-col justify-between border-l border-white/[0.05] px-12 py-28">
          <div>
            <p className="text-gray-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Theme</p>
            <button onClick={toggleTheme} className="flex items-center gap-3 text-white hover:text-[#E5C07B] transition-colors duration-300 border border-white/20 hover:border-[#E5C07B] px-5 py-3 rounded-full mb-12">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-xs uppercase tracking-widest">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <p className="text-gray-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Constellation</p>
            <p className="text-white font-display text-2xl font-light leading-tight">
              "The cosmos is within us. We are made of star-stuff."
            </p>
            <p className="text-gray-600 text-sm mt-4 font-light">— Carl Sagan</p>
          </div>

          <div>
            <p className="text-gray-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Special</p>
            <Link to="/palm" className="magnetic group flex items-center gap-4 text-white hover:text-[#E5C07B] transition-colors duration-300">
              <FaRegHandPaper className="text-2xl" />
              <span className="font-display text-xl uppercase tracking-wider font-light">AI Palm Reading</span>
              <div className="w-6 h-[1px] bg-current ml-2 group-hover:w-12 transition-all duration-500" />
            </Link>
          </div>

          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="magnetic w-full py-4 border border-white/20 text-xs font-bold tracking-[0.2em] uppercase text-white hover:border-[#E5C07B] hover:text-[#E5C07B] transition-all duration-300">
                  Sign In to Portal
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 border-2 border-[#E5C07B]/50" } }} />
                <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">Your Account</span>
              </div>
            </SignedIn>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
