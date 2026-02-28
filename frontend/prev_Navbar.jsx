import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegHandPaper } from "react-icons/fa";

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

          {/* Logo */}
          <Link to="/" className="magnetic flex items-center gap-3 z-20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E5C07B] to-purple-500 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#050505] flex items-center justify-center text-[#E5C07B] text-xs font-display font-black">✦</div>
            </div>
            <span className="font-display text-lg font-bold tracking-[0.2em] text-white uppercase">
              ASTROLOGER
            </span>
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

            <div className="hidden md:block border-l border-white/10 pl-6">
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
