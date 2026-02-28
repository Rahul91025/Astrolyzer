import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';

gsap.registerPlugin(ScrollTrigger);

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Service = lazy(() => import('./pages/Service'));
const Appointment = lazy(() => import('./pages/Appointment'));
const Shop = lazy(() => import('./pages/Shop'));
const Page = lazy(() => import('./pages/page'));
const Auth = lazy(() => import('./pages/page/index1'));
const Billing = lazy(() => import('./pages/page/index2'));
const FAQ = lazy(() => import('./pages/page/index'));
const Contact = lazy(() => import('./pages/Contact'));
const Palm = lazy(() => import('./pages/Palm'));

// Wrapper for route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/page" element={<Page />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/palm" element={<Palm />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  // Initialize Lenis smooth scroll and sync with GSAP ticker
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothTouch: false,
    });

    // Sync Lenis raf with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#E5C07B]/30 selection:text-white cursor-none">
          <CustomCursor />
          <NoiseOverlay />
          <Navbar />
          <main className="flex-grow z-10 relative">
            <Suspense fallback={<LoadingScreen />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
