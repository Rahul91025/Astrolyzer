import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const PRODUCTS = [
    { id: 1, name: 'Celestial Birth Chart', category: 'Reports', price: 1299, original: 1899, badge: 'BESTSELLER', desc: 'A hand-illustrated natal chart decoded at the atomic level—every degree, every house, every whisper of fate.', symbol: '✦', color1: '#1a0533', color2: '#2d0a5e', accent: '#c084fc' },
    { id: 2, name: 'Amethyst Crystal Set', category: 'Crystals', price: 899, original: 1299, badge: 'POPULAR', desc: 'Moonlit amethyst formations, each charged for 72 hours under the open sky.', symbol: '◈', color1: '#0f0a2e', color2: '#1e1052', accent: '#818cf8' },
    { id: 3, name: 'Love Compatibility', category: 'Reports', price: 999, original: 1499, badge: null, desc: 'Venus and Mars in profound dialogue—your deepest karmic bond decoded page by page.', symbol: '♡', color1: '#2a0011', color2: '#4a0022', accent: '#fb7185' },
    { id: 4, name: 'Sandalwood Ritual Bundle', category: 'Rituals', price: 399, original: null, badge: 'NEW', desc: 'Hand-rolled in sacred geometry patterns. The smoke carries your intentions to the stars.', symbol: '☽', color1: '#1a0f00', color2: '#3d2500', accent: '#f59e0b' },
    { id: 5, name: 'Saturn Talisman Ring', category: 'Talismans', price: 2199, original: 2999, badge: 'LIMITED', desc: 'Sterling silver, cast under Saturn retrograde. Wear discipline. Wear power. Wear time.', symbol: '♄', color1: '#0a0a0a', color2: '#1a1a1a', accent: '#94a3b8' },
    { id: 6, name: 'Annual Cosmic Forecast', category: 'Reports', price: 1799, original: 2499, badge: null, desc: '365 days of celestial intelligence. Your personal cosmos plotted against every transit.', symbol: '⬡', color1: '#000d1a', color2: '#001a33', accent: '#38bdf8' },
    { id: 7, name: 'Rose Quartz Heart', category: 'Crystals', price: 599, original: null, badge: null, desc: 'Ethically mined, hand-carved. The purest love frequency crystallized into form.', symbol: '✾', color1: '#1a000d', color2: '#33001a', accent: '#f9a8d4' },
    { id: 8, name: 'Sacred Geometry Pendant', category: 'Talismans', price: 1499, original: 1999, badge: 'NEW', desc: 'Gold-plated Flower of Life—the blueprint of the universe worn close to your heart.', symbol: '❋', color1: '#1a1300', color2: '#332600', accent: '#fbbf24' },
];

const CATS = ['All', 'Reports', 'Crystals', 'Talismans', 'Rituals'];
const fmt = n => `₹${n.toLocaleString('en-IN')}`;

// ─── Canvas Star Field ────────────────────────────────────────────────────────
const StarField = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.2,
            o: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 0.3 + 0.05,
        }));

        let rafId;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(s => {
                s.o += Math.sin(Date.now() * s.speed * 0.001) * 0.008;
                s.o = Math.max(0.05, Math.min(0.6, s.o));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.o})`;
                ctx.fill();
            });
            rafId = requestAnimationFrame(draw);
        };
        draw();

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);
        return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
};

// ─── Floating Cart ────────────────────────────────────────────────────────────
const FloatingCart = ({ cart, allProducts, onAdd, onRemove, formatPrice }) => {
    const [open, setOpen] = useState(false);
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((acc, [id, qty]) => {
        const p = allProducts.find(x => x.id === parseInt(id));
        return acc + (p ? p.price * qty : 0);
    }, 0);
    const cartItems = Object.entries(cart).filter(([, q]) => q > 0).map(([id, qty]) => ({ p: allProducts.find(x => x.id === parseInt(id)), qty }));

    return (
        <>
            {/* Pill trigger */}
            <AnimatePresence>
                {totalItems > 0 && (
                    <motion.button
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        onClick={() => setOpen(true)}
                        className="magnetic fixed bottom-8 left-1/2 -translate-x-1/2 z-[400] flex items-center gap-4 bg-[#E5C07B] text-black px-8 py-4 rounded-none font-black tracking-[0.2em] uppercase text-xs hover:bg-white transition-colors duration-500 shadow-[0_20px_60px_rgba(229,192,123,0.3)]"
                    >
                        <span className="w-5 h-5 rounded-full bg-black text-[#E5C07B] flex items-center justify-center font-black text-xs">
                            {totalItems}
                        </span>
                        View Selection
                        <div className="h-3 w-[1px] bg-black/30" />
                        <span className="font-light">{formatPrice(totalPrice)}</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex">
                        <div className="flex-1 bg-black/70 backdrop-blur-md" onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                            className="w-full max-w-[420px] bg-[#060606] border-l border-white/[0.04] flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between px-8 py-7 border-b border-white/[0.04]">
                                <h3 className="font-display text-3xl font-light text-white uppercase tracking-wider">Cosmos Cart</h3>
                                <button onClick={() => setOpen(false)} className="magnetic w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/40 transition-all text-xl">✕</button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {cartItems.map(({ p, qty }) => (
                                    <div key={p.id} className="flex gap-4 px-8 py-6 border-b border-white/[0.03] group">
                                        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-3xl" style={{ background: `linear-gradient(135deg, ${p.color1}, ${p.color2})` }}>
                                            <span style={{ color: p.accent }}>{p.symbol}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white text-sm font-light group-hover:text-[#E5C07B] transition-colors duration-300 leading-tight">{p.name}</p>
                                            <p className="text-gray-600 text-xs mt-1">{p.category}</p>
                                            <div className="flex items-center gap-3 mt-3">
                                                <button onClick={() => onRemove(p.id)} className="magnetic w-6 h-6 border border-white/10 text-sm text-gray-500 hover:text-[#E5C07B] hover:border-[#E5C07B] transition-all flex items-center justify-center">−</button>
                                                <span className="text-white text-xs font-bold w-4 text-center">{qty}</span>
                                                <button onClick={() => onAdd(p)} className="magnetic w-6 h-6 border border-white/10 text-sm text-gray-500 hover:text-[#E5C07B] hover:border-[#E5C07B] transition-all flex items-center justify-center">+</button>
                                            </div>
                                        </div>
                                        <p className="text-white text-sm">{formatPrice(p.price * qty)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="px-8 py-8 border-t border-white/[0.04]">
                                <div className="flex justify-between mb-6">
                                    <span className="text-gray-500 text-xs tracking-widest uppercase">Total</span>
                                    <span className="text-white font-display text-2xl font-light">{formatPrice(totalPrice)}</span>
                                </div>
                                <button className="magnetic w-full py-4 bg-[#E5C07B] text-black text-xs font-black tracking-[0.25em] uppercase hover:bg-white transition-colors duration-500">
                                    Proceed to Checkout →
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Shop = () => {
    const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [cart, setCart] = useState({});
    const [hoveredCard, setHoveredCard] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const heroRef = useRef(null);
    const hScrollRef = useRef(null);
    const trackRef = useRef(null);
    const gridRef = useRef(null);

    const addToCart = p => setCart(c => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
    const removeFromCart = id => setCart(c => { const n = { ...c, [id]: Math.max(0, (c[id] || 0) - 1) }; if (n[id] === 0) delete n[id]; return n; });

    // ── GSAP Horizontal Scroll ──────────────────────────────────────────────────
    useLayoutEffect(() => {
        if (!hScrollRef.current || !trackRef.current) return;
        const track = trackRef.current;

        const st = ScrollTrigger.create({
            trigger: hScrollRef.current,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: self => {
                gsap.set(track, { x: -(track.scrollWidth - window.innerWidth) * self.progress });
            }
        });

        // GSAP hero entrance
        gsap.from('.hero-num', { y: 80, opacity: 0, stagger: 0.06, duration: 1.4, ease: 'expo.out', delay: 0.3 });
        gsap.from('.hero-big-title span', { y: '110%', duration: 1.5, stagger: 0.04, ease: 'expo.out', delay: 0.1 });

        // Grid reveals
        ScrollTrigger.batch('.grid-card', {
            onEnter: els => gsap.from(els, { opacity: 0, y: 60, scale: 0.96, duration: 0.9, stagger: 0.12, ease: 'power3.out', clearProps: 'all' }),
            start: 'top 88%',
            once: true,
        });

        return () => st.kill();
    }, []);

    // ── Card hover parallax ──────────────────────────────────────────────────────
    useEffect(() => {
        const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    const filtered = PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

    return (
        <div className="bg-[#030303] min-h-screen overflow-x-hidden">
            <StarField />

            {/* ── Section 1: EDITORIAL HERO ─────────────────────────────────────────── */}
            <section ref={heroRef} className="relative min-h-screen flex items-stretch z-10 pt-[80px]" style={{ perspective: '1200px' }}>

                {/* Morphing BG panel */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ background: `linear-gradient(135deg, ${activeProduct.color1} 0%, ${activeProduct.color2} 55%, #030303 100%)` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                {/* Left: Product Selector */}
                <div className="relative z-10 w-[42%] flex flex-col justify-center pl-12 md:pl-20 xl:pl-28 pr-8 gap-0 py-16">
                    <p className="text-[9px] font-black tracking-[0.5em] uppercase mb-10" style={{ color: activeProduct.accent }}>
                        The Cosmic Emporium — Select Your Artifact
                    </p>

                    {PRODUCTS.map((p, i) => {
                        const isActive = activeProduct.id === p.id;
                        return (
                            <motion.button
                                key={p.id}
                                onClick={() => setActiveProduct(p)}
                                className="magnetic group relative flex items-center gap-4 py-4 border-b border-white/[0.06] text-left overflow-hidden"
                            >
                                {/* Active fill */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    animate={{ scaleX: isActive ? 1 : 0, originX: 0, background: `linear-gradient(90deg, ${p.accent}12, transparent)` }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                />

                                <span className="hero-num text-[10px] font-black tracking-widest relative z-10" style={{ color: isActive ? p.accent : '#333' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <div className="flex-1 relative z-10">
                                    <p className={`font-display text-base md:text-lg xl:text-xl font-light transition-colors duration-500 leading-tight ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                        {p.name}
                                    </p>
                                    {isActive && (
                                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-[10px] font-light tracking-wider mt-1" style={{ color: p.accent }}>
                                            {p.category} — {fmt(p.price)}
                                        </motion.p>
                                    )}
                                </div>

                                {p.badge && (
                                    <span className="text-[8px] font-black tracking-[0.2em] px-2 py-0.5 border relative z-10" style={{ borderColor: `${p.accent}50`, color: p.accent }}>
                                        {p.badge}
                                    </span>
                                )}

                                {/* Hover line */}
                                <motion.div className="absolute bottom-0 left-0 h-[1px] pointer-events-none" style={{ background: p.accent }}
                                    animate={{ width: isActive ? '100%' : '0%' }}
                                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                />
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right: Morphing Featured Panel */}
                <div className="relative z-10 w-[58%] flex flex-col justify-center items-center overflow-hidden">

                    {/* Giant symbol — rotating */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProduct.id + '-sym'}
                            initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
                            animate={{ opacity: 0.18, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 1.4, rotateY: 90 }}
                            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                            className="absolute select-none pointer-events-none"
                            style={{ fontSize: 'min(45vw, 55vh)', color: activeProduct.accent, lineHeight: 1, filter: 'blur(2px)' }}
                        >
                            {activeProduct.symbol}
                        </motion.div>
                    </AnimatePresence>

                    {/* Foreground info */}
                    <div className="relative z-10 flex flex-col items-start px-12 xl:px-20 w-full">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeProduct.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                className="w-full"
                            >
                                {/* Category tag */}
                                <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-5" style={{ color: activeProduct.accent }}>
                                    {activeProduct.category}
                                </p>

                                {/* Huge product name */}
                                <div className="hero-big-title overflow-hidden">
                                    <div className="text-4xl md:text-5xl xl:text-7xl font-display font-bold text-white uppercase leading-[0.85] tracking-tighter mb-8">
                                        <span className="inline-block">{activeProduct.name.split(' ')[0]}</span>{' '}
                                        <span className="inline-block italic font-light" style={{ color: activeProduct.accent }}>{activeProduct.name.split(' ').slice(1).join(' ')}</span>
                                    </div>
                                </div>

                                <p className="text-gray-400 font-light leading-relaxed max-w-md mb-8 text-sm md:text-base">
                                    {activeProduct.desc}
                                </p>

                                <div className="flex items-center gap-8">
                                    <div>
                                        <p className="text-white font-display text-3xl md:text-4xl font-light">{fmt(activeProduct.price)}</p>
                                        {activeProduct.original && (
                                            <p className="text-gray-600 text-sm line-through mt-1">{fmt(activeProduct.original)}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => addToCart(activeProduct)}
                                        className="magnetic group relative flex items-center gap-4 px-8 py-4 overflow-hidden border transition-all duration-700"
                                        style={{ borderColor: `${activeProduct.accent}60` }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = activeProduct.accent}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = `${activeProduct.accent}60`}
                                    >
                                        <motion.div
                                            className="absolute inset-0 origin-left pointer-events-none"
                                            style={{ background: activeProduct.accent }}
                                            initial={{ scaleX: 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                                        />
                                        <span className="relative z-10 text-xs font-black tracking-[0.25em] uppercase text-white mix-blend-difference">
                                            Add to Selection
                                        </span>
                                        <svg className="relative z-10 w-4 h-4 text-white mix-blend-difference" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-8 right-8 flex items-center gap-3 opacity-40">
                        <div className="w-8 h-[1px] bg-white" />
                        <p className="text-white text-[9px] font-bold tracking-[0.4em] uppercase">{PRODUCTS.indexOf(activeProduct) + 1} / {PRODUCTS.length}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 2: HORIZONTAL SCROLL CAROUSEL ─────────────────────────────── */}
            <section ref={hScrollRef} className="relative z-10 overflow-hidden h-screen">
                <div ref={trackRef} className="flex h-full will-change-transform">

                    {/* Intro slide */}
                    <div className="flex-shrink-0 w-screen h-full flex flex-col justify-center items-center relative border-r border-white/[0.05]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0008] to-[#030303]" />
                        <div className="relative z-10 text-center px-12">
                            <p className="text-[#E5C07B] text-[10px] font-black tracking-[0.5em] uppercase mb-6">Scroll to explore →</p>
                            <h2 className="text-[min(10vw,8rem)] font-display font-bold text-white uppercase leading-[0.82] tracking-tighter">
                                The<br />
                                <span className="italic font-light text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Collection</span>
                            </h2>
                            <div className="mt-12 w-20 h-[1px] bg-white/20 mx-auto relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#E5C07B] animate-[slideRight_1.5s_ease-in-out_infinite]" />
                            </div>
                        </div>
                    </div>

                    {/* Product slides */}
                    {PRODUCTS.map((p, i) => (
                        <div
                            key={p.id}
                            className="flex-shrink-0 w-[75vw] h-full relative border-r border-white/[0.04] group overflow-hidden cursor-none"
                        >
                            {/* Background */}
                            <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105" style={{ background: `linear-gradient(135deg, ${p.color1} 0%, ${p.color2} 60%, #030303 100%)` }} />

                            {/* Giant symbol */}
                            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                                <span
                                    className="font-display transition-all duration-700 group-hover:scale-110"
                                    style={{ fontSize: 'clamp(8rem, 25vw, 28rem)', color: p.accent, opacity: 0.15, lineHeight: 1, filter: 'blur(1px)  ' }}
                                >
                                    {p.symbol}
                                </span>
                            </div>

                            {/* Index number */}
                            <div className="absolute top-10 left-10 z-10">
                                <p className="font-display text-[8rem] font-black leading-none opacity-5 text-white select-none">
                                    {String(i + 1).padStart(2, '0')}
                                </p>
                            </div>

                            {/* Content - bottom */}
                            <div className="absolute bottom-0 left-0 right-0 z-10 p-10 md:p-16 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-700">

                                {/* slide-up text container */}
                                <div className="overflow-hidden mb-1">
                                    <p className="text-[10px] font-black tracking-[0.4em] uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" style={{ color: p.accent }}>
                                        {p.category}
                                    </p>
                                </div>

                                <div className="overflow-hidden mb-4">
                                    <h3 className="text-3xl md:text-5xl xl:text-6xl font-display font-light text-white uppercase leading-tight tracking-tight translate-y-8 group-hover:translate-y-0 transition-transform duration-600 delay-100">
                                        {p.name}
                                    </h3>
                                </div>

                                <div className="overflow-hidden">
                                    <p className="text-gray-500 font-light text-sm max-w-md translate-y-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                                        {p.desc}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 mt-8 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                                    <span className="font-display text-3xl text-white font-light">{fmt(p.price)}</span>
                                    <button
                                        onClick={() => addToCart(p)}
                                        className="magnetic px-6 py-3 border text-xs font-black tracking-[0.2em] uppercase text-white hover:text-black transition-all duration-500 relative overflow-hidden group/btn"
                                        style={{ borderColor: `${p.accent}80` }}
                                    >
                                        <span className="absolute inset-0 origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-400" style={{ background: p.accent }} />
                                        <span className="relative z-10">Add to Cart</span>
                                    </button>
                                    {p.badge && (
                                        <span className="text-[9px] font-black tracking-widest px-2 py-1 border" style={{ borderColor: `${p.accent}50`, color: p.accent }}>
                                            {p.badge}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Top right price */}
                            <div className="absolute top-10 right-10 z-10 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {p.original && <p className="text-gray-600 text-sm line-through">{fmt(p.original)}</p>}
                                <p className="font-display text-xl text-white font-light">{fmt(p.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-20">
                    <motion.div className="h-full bg-[#E5C07B]" style={{ width: '0%' }} id="h-progress" />
                </div>
            </section>

            {/* ── Section 3: EDITORIAL PRODUCT GRID ──────────────────────────────────── */}
            <section ref={gridRef} className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-20 py-24">

                {/* Section header */}
                <div className="mb-16 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8">
                    <div>
                        <p className="text-[#E5C07B] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Browse All</p>
                        <h2 className="text-[10vw] md:text-[6vw] font-display font-bold text-white uppercase leading-[0.82] tracking-tighter">
                            THE<br />
                            <span className="text-transparent italic font-light" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>ARCHIVE</span>
                        </h2>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-1">
                        {CATS.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                className={`magnetic px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase border transition-all duration-400 ${activeCategory === cat ? 'bg-[#E5C07B] text-black border-[#E5C07B]' : 'border-white/10 text-gray-600 hover:text-white hover:border-white/30'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Asymmetric editorial grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => {
                            // Magazine layout: 01&02 wide/narrow, 03&04 narrow wide, rest 4-col
                            let span = 'md:col-span-4';
                            if (i === 0) span = 'md:col-span-8';
                            else if (i === 1) span = 'md:col-span-4';
                            else if (i === 2) span = 'md:col-span-4';
                            else if (i === 3) span = 'md:col-span-8';
                            // beyond 4: 4-col repeating
                            else if (i % 4 === 0) span = 'md:col-span-8';
                            else if (i % 4 === 3) span = 'md:col-span-8';
                            else span = 'md:col-span-4';

                            const isWide = span === 'md:col-span-8';
                            const isHovered = hoveredCard === p.id;

                            return (
                                <motion.div
                                    key={p.id}
                                    layout
                                    initial={{ opacity: 0, y: 50, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                                    className={`grid-card ${span} group relative overflow-hidden border border-white/[0.04] cursor-none`}
                                    style={{ minHeight: isWide ? '440px' : '360px' }}
                                    onMouseEnter={() => setHoveredCard(p.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Background */}
                                    <div className="absolute inset-0 transition-all duration-700" style={{ background: `linear-gradient(135deg, ${p.color1}, ${p.color2})` }} />

                                    {/* Hover overlay - accent fill from corner */}
                                    <motion.div
                                        className="absolute inset-0 origin-bottom-left pointer-events-none"
                                        style={{ background: `linear-gradient(135deg, ${p.accent}22, ${p.accent}08)` }}
                                        animate={{ scale: isHovered ? 1 : 0 }}
                                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                    />

                                    {/* Giant symbol */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                        <motion.span
                                            style={{ fontSize: isWide ? 'clamp(8rem, 20vw, 22rem)' : 'clamp(6rem, 14vw, 14rem)', color: p.accent, lineHeight: 1 }}
                                            animate={{ opacity: isHovered ? 0.25 : 0.1, scale: isHovered ? 1.1 : 1 }}
                                            transition={{ duration: 0.7 }}
                                        >
                                            {p.symbol}
                                        </motion.span>
                                    </div>

                                    {/* Top - badge & category */}
                                    <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex items-start justify-between z-10">
                                        <p className="text-[9px] font-black tracking-[0.35em] uppercase" style={{ color: p.accent }}>{p.category}</p>
                                        {p.badge && (
                                            <span className="text-[8px] font-black tracking-widest px-2 py-1 border" style={{ borderColor: `${p.accent}50`, color: p.accent }}>
                                                {p.badge}
                                            </span>
                                        )}
                                    </div>

                                    {/* Bottom - product info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                                        <div className="overflow-hidden mb-2">
                                            <motion.h3
                                                className="font-display font-light text-white uppercase leading-tight tracking-tight"
                                                style={{ fontSize: isWide ? 'clamp(1.5rem, 3.5vw, 3rem)' : 'clamp(1.2rem, 2.5vw, 2rem)' }}
                                                animate={{ y: isHovered ? 0 : 8 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {p.name}
                                            </motion.h3>
                                        </div>

                                        <motion.div
                                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
                                            transition={{ duration: 0.45, delay: 0.05 }}
                                        >
                                            <p className="text-gray-500 text-xs font-light leading-relaxed max-w-xs mb-5">{p.desc}</p>
                                        </motion.div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-end gap-2">
                                                <span className="font-display text-xl md:text-2xl text-white font-light">{fmt(p.price)}</span>
                                                {p.original && <span className="text-gray-600 text-xs line-through mb-0.5">{fmt(p.original)}</span>}
                                            </div>

                                            <motion.button
                                                onClick={() => addToCart(p)}
                                                className="magnetic flex items-center gap-3 border px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-white transition-all duration-500"
                                                style={{ borderColor: `${p.accent}40` }}
                                                animate={{ opacity: isHovered ? 1 : 0.4, x: isHovered ? 0 : 10 }}
                                                transition={{ duration: 0.4 }}
                                                whileHover={{ borderColor: p.accent, backgroundColor: `${p.accent}22` }}
                                            >
                                                {cart[p.id] ? `In Cart (${cart[p.id]})` : 'Add →'}
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Border glow on hover */}
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none border"
                                        animate={{ borderColor: isHovered ? `${p.accent}40` : 'rgba(255,255,255,0.04)' }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* ── Marquee Strip ─────────────────────────────────────────────────────── */}
            <div className="relative z-10 border-y border-white/[0.04] overflow-hidden py-4">
                <div className="flex whitespace-nowrap gap-12 animate-[marquee_20s_linear_infinite]">
                    {Array(6).fill(['✦ VEDIC ASTROLOGY', '◈ RARE CRYSTALS', '☽ SACRED RITUALS', '♄ COSMIC TALISMANS', '⬡ BIRTH CHARTS', '✾ DIVINE HEALING']).flat().map((t, i) => (
                        <span key={i} className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-700">{t}</span>
                    ))}
                </div>
            </div>

            {/* ── Trust Grid ─────────────────────────────────────────────────────────── */}
            <section className="relative z-10 px-6 md:px-24 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { symbol: '✦', label: 'Vedic Certified', sub: '1000+ readings delivered' },
                    { symbol: '◈', label: 'Ethically Sourced', sub: 'Every crystal authenticated' },
                    { symbol: '☽', label: 'Moon-Charged', sub: '72h ritual preparation' },
                    { symbol: '♄', label: 'Free Shipping', sub: 'On orders above ₹999' },
                ].map((x, i) => (
                    <div key={i} className="group flex flex-col items-center gap-3 text-center p-6 border border-white/[0.03] hover:border-[#E5C07B]/20 transition-colors duration-500">
                        <span className="text-[#E5C07B] text-3xl group-hover:scale-125 transition-transform duration-500">{x.symbol}</span>
                        <p className="text-white text-xs font-black tracking-wider uppercase">{x.label}</p>
                        <p className="text-gray-700 text-xs font-light">{x.sub}</p>
                    </div>
                ))}
            </section>

            {/* Floating Cart */}
            <FloatingCart cart={cart} allProducts={PRODUCTS} onAdd={addToCart} onRemove={removeFromCart} formatPrice={fmt} />
        </div>
    );
};

export default Shop;