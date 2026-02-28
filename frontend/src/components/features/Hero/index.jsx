import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaStop } from "react-icons/fa";
import SplitType from 'split-type';
import { aiService } from "../../../api";
import { useApi } from "../../../hooks/useApi";
import heroBg from "../../../assets/cosmic/hero-nebula.png";

gsap.registerPlugin(ScrollTrigger);

const AstroHero = () => {
  const WELCOME_MESSAGE = "Namaste, I am your astrology voice assistant. Ask your astrology question now.";
  const FALLBACK_MESSAGE = "The astrology voice service is unavailable right now. Please try again shortly.";
  const UNSUPPORTED_MESSAGE = "Your browser does not support voice recognition. Please use Chrome or Edge.";

  const container = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  const { loading: isProcessing, execute: getChatReply } = useApi(aiService.getChatResponse);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const splitTitle = new SplitType(titleRef.current, { types: 'words, chars' });
      const splitText = new SplitType(textRef.current, { types: 'lines, words' });

      gsap.set(splitTitle.chars, { y: 100, opacity: 0, rotateX: -90 });
      gsap.set(splitText.words, { y: 20, opacity: 0 });
      gsap.set('.ui-reveal', { y: 30, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(splitTitle.chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.02,
        ease: "power4.out"
      })
        .to(splitText.words, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.01,
          ease: "power3.out"
        }, "-=0.8")
        .to('.ui-reveal', {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out"
        }, "-=0.6");

      gsap.to(orb1Ref.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(orb2Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

    }, container);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let rafId = null;
    let lastX = 0, lastY = 0;

    const onMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const xPos = (lastX / window.innerWidth - 0.5) * 2;
        const yPos = (lastY / window.innerHeight - 0.5) * 2;
        gsap.to(orb1Ref.current, { x: xPos * 40, y: yPos * 40, duration: 2, ease: "power2.out", overwrite: 'auto' });
        gsap.to(orb2Ref.current, { x: xPos * -60, y: yPos * -60, duration: 2.5, ease: "power2.out", overwrite: 'auto' });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // --- AI Voice Logic ---
  const queryGeminiAI = async (userInput) => {
    try {
      setError("");
      const data = await getChatReply(userInput);
      const aiText = data.reply;

      setAiResponse(aiText);
      speakMysticalVoice(aiText);
    } catch (error) {
      console.error('Gemini AI Error:', error);
      setAiResponse(FALLBACK_MESSAGE);
      setError("Unable to get response from server.");
      speakMysticalVoice(FALLBACK_MESSAGE);
    }
  };

  const speakMysticalVoice = (text, onEnd) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.onend = () => {
        if (typeof onEnd === 'function') onEnd();
      };
      utterance.onerror = () => {
        if (typeof onEnd === 'function') onEnd();
      };

      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang?.toLowerCase() === 'hi-in')
          || voices.find(v => v.lang?.toLowerCase().startsWith('hi'))
          || voices.find(v => v.lang?.toLowerCase().includes('en-in'))
          || voices[0];

        if (preferredVoice) utterance.voice = preferredVoice;
        window.speechSynthesis.speak(utterance);
      };

      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = pickVoice;
      } else {
        pickVoice();
      }
      return;
    }

    if (typeof onEnd === 'function') onEnd();
  };

  const toggleVoiceRecognition = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError(UNSUPPORTED_MESSAGE);
      return;
    }

    const startRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = false;
      recognition.lang = 'hi-IN';
      recognition.interimResults = false;

      setIsListening(true);
      setError("");
      setTranscript("");

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const spokenText = event.results[current][0].transcript?.trim() || "";
        setTranscript(spokenText);
        if (spokenText) {
          queryGeminiAI(spokenText);
        } else {
          setError("Could not catch your voice clearly. Please try again.");
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'no-speech') {
          setError("No speech detected. Please speak again.");
        } else if (event.error === 'not-allowed') {
          setError("Microphone permission is blocked. Please allow it in browser settings.");
        } else {
          setError("Voice recognition failed. Please try again.");
        }
        setIsListening(false);
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    };

    setAiResponse(WELCOME_MESSAGE);
    speakMysticalVoice(WELCOME_MESSAGE, startRecognition);
  }, [isListening]);


  return (
    <div
      ref={container}
      className="relative min-h-screen w-full bg-mystic-bg overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 transition-colors duration-700"
    >
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden premium-invert-light transition-all duration-700">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src={heroBg}
          alt="Cosmic Background"
          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mystic-bg via-transparent to-mystic-bg transition-colors duration-700" />
      </div>

      {/* Subtle Abstract Orbs for depth */}
      <div
        ref={orb1Ref}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900 rounded-full premium-blend opacity-30 z-0 pointer-events-none transition-all duration-700"
        style={{ filter: 'blur(80px)', willChange: 'transform' }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-mystic-gold rounded-full premium-blend opacity-15 z-0 pointer-events-none transition-all duration-700"
        style={{ filter: 'blur(100px)', willChange: 'transform' }}
      />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">

        {/* Eyebrow Label */}
        <div className="ui-reveal inline-flex items-center gap-4 mb-8">
          <span className="text-[#E5C07B] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Cosmic Architecture</span>
          <div className="w-12 h-[1px] bg-[#E5C07B]/30" />
        </div>

        {/* Extreme Typography Title */}
        <h1
          ref={titleRef}
          className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-display font-bold text-mystic-text mb-6 leading-[0.85] tracking-tighter uppercase transition-colors duration-700"
          style={{ perspective: "1000px" }}
        >
          Divine <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-mystic-gold to-mystic-text italic font-light ml-12 md:ml-32 transition-colors duration-700">Intervention</span>
        </h1>

        <p
          ref={textRef}
          className="text-lg md:text-2xl text-mystic-text-sec font-light max-w-3xl mb-16 leading-relaxed transition-colors duration-700"
        >
          Tap the mic and ask your astrology question. The voice agent will answer aloud.
        </p>

        {/* Ultra Premium Action Area */}
        <div className="ui-reveal w-full max-w-4xl relative z-20 mt-8">
          {/* Ambient Glow Behind the whole container */}
          <div className={`absolute left-1/2 -top-1/2 -translate-x-1/2 w-[80%] h-[200%] blur-[120px] rounded-full mix-blend-screen opacity-30 pointer-events-none transition-all duration-1000 ${isListening ? 'bg-mystic-gold/60 scale-110' : 'bg-purple-900/40'}`} />

          <div className="glass-card w-full rounded-full p-3 pl-4 pr-8 flex items-center gap-6 md:gap-10 relative overflow-hidden group border border-mystic-border-subtle bg-mystic-bg-sec/50 backdrop-blur-2xl">

            {/* The Microphone Button Container */}
            <div className="relative flex-shrink-0">
              {/* Pulsing rings when listening */}
              <AnimatePresence>
                {isListening && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border border-mystic-gold pointer-events-none"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border border-mystic-gold/50 pointer-events-none"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 3.2, opacity: 0 }}
                      transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border border-mystic-gold/20 pointer-events-none"
                    />
                  </>
                )}
              </AnimatePresence>

              <button
                onClick={toggleVoiceRecognition}
                className={`magnetic relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full flex items-center justify-center transition-all duration-700 overflow-hidden shadow-2xl z-10 ${isListening ? 'bg-mystic-bg shadow-[0_0_40px_rgba(229,192,123,0.4)] border border-mystic-gold' : 'bg-gradient-to-br from-mystic-text to-mystic-text-sec hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  }`}
              >
                {/* Button inner highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay" />

                {isListening ? (
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                    <FaStop className="text-3xl text-mystic-gold" />
                  </motion.div>
                ) : (
                  <FaMicrophone className="text-3xl text-mystic-bg drop-shadow-md" />
                )}
              </button>
            </div>

            {/* Text and Status Area */}
            <div className="flex flex-col items-start justify-center flex-grow h-full py-2 overflow-hidden">
              <AnimatePresence mode="wait">
                {isListening ? (
                  <motion.div key="listen" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
                    <p className="text-[#E5C07B] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-2">Listening to your aura...</p>
                    <p className="text-mystic-text font-display text-xl md:text-3xl font-light italic truncate w-full opacity-80">
                      " {transcript || "Waiting for your question..."} "
                    </p>
                  </motion.div>
                ) : isProcessing ? (
                  <motion.div key="proc" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-2">
                    <p className="text-mystic-text-sec text-xs md:text-sm font-bold tracking-[0.3em] uppercase flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full border border-t-2 border-mystic-border-subtle border-t-[#E5C07B] animate-spin" />
                      Consulting the Stars...
                    </p>
                    <div className="flex gap-1 items-center mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-mystic-gold/50 animate-[ping_1.5s_0s_infinite]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-mystic-gold/50 animate-[ping_1.5s_0.2s_infinite]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-mystic-gold/50 animate-[ping_1.5s_0.4s_infinite]" />
                    </div>
                  </motion.div>
                ) : error ? (
                  <motion.div key="err" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <p className="text-red-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-1">Interference Detected</p>
                    <p className="text-mystic-text-sec font-light">{error}</p>
                  </motion.div>
                ) : (
                  <motion.div key="init" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <p className="text-mystic-text text-xl md:text-3xl font-display font-light mb-1">Awaken the oracle.</p>
                    <p className="text-mystic-text-sec text-sm md:text-base font-light font-sans tracking-wide">Press the microphone and speak your query.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ambient inner glow */}
            <div className={`absolute top-1/2 right-10 -translate-y-1/2 w-40 h-40 rounded-full blur-[40px] opacity-10 pointer-events-none transition-all duration-1000 ${isListening ? 'bg-mystic-gold opacity-20' : 'bg-transparent'}`} />
          </div>

          {/* Master AI Response Display */}
          <AnimatePresence>
            {aiResponse && !isListening && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="mt-16 w-full text-center relative px-4"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-[#E5C07B] to-transparent -translate-y-full opacity-60" />
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                  className="absolute left-1/2 top-[-60px] -translate-x-1/2 w-3 h-3 bg-[#E5C07B] rounded-full shadow-[0_0_15px_#E5C07B]"
                />

                <div className="relative inline-block">
                  <span className="absolute -left-6 -top-4 text-[#E5C07B] text-4xl font-display opacity-40">"</span>
                  <p className="text-mystic-text text-xl md:text-3xl lg:text-4xl font-display font-light leading-[1.4] italic max-w-4xl mx-auto drop-shadow-lg transition-colors duration-700">
                    Voice response delivered.
                  </p>
                  <span className="absolute -right-6 -bottom-6 text-[#E5C07B] text-4xl font-display opacity-40">"</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default AstroHero;
