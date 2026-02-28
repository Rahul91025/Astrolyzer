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
      className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20"
    >
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src={heroBg}
          alt="Cosmic Background"
          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* Subtle Abstract Orbs for depth */}
      <div
        ref={orb1Ref}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900 rounded-full mix-blend-screen opacity-30 z-0 pointer-events-none"
        style={{ filter: 'blur(80px)', willChange: 'transform' }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#E5C07B] rounded-full mix-blend-screen opacity-15 z-0 pointer-events-none"
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
          className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-display font-bold text-white mb-6 leading-[0.85] tracking-tighter uppercase"
          style={{ perspective: "1000px" }}
        >
          Divine <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C07B] to-white italic font-light ml-12 md:ml-32">Intervention</span>
        </h1>

        <p
          ref={textRef}
          className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mb-16 leading-relaxed"
        >
          Tap the mic and ask your astrology question. The voice agent will answer aloud.
        </p>

        {/* Ultra Premium Action Area */}
        <div className="ui-reveal w-full max-w-3xl relative z-20">
          <div className="p-[1px] rounded-full bg-gradient-to-r from-white/10 via-[#E5C07B]/40 to-white/10 hover:via-[#E5C07B] transition-all duration-1000">
            <div className="bg-[#050505] rounded-full p-2 pr-6 flex items-center justify-between w-full h-[80px] md:h-[100px] relative overflow-hidden group">

              <div className="flex items-center gap-6 h-full flex-grow pl-4">
                <button
                  onClick={toggleVoiceRecognition}
                  className={`magnetic relative flex-shrink-0 w-[64px] h-[64px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-[#E5C07B]'
                    }`}
                >
                  {isListening ? (
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                      <FaStop className="text-2xl text-white" />
                    </motion.div>
                  ) : (
                    <FaMicrophone className="text-2xl text-black" />
                  )}
                </button>

                <div className="flex flex-col items-start justify-center h-full pr-4">
                  <AnimatePresence mode="wait">
                    {isListening && (
                      <motion.p key="listen" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[#E5C07B] md:text-lg font-light tracking-wide">
                        Listening...
                      </motion.p>
                    )}
                    {isProcessing && (
                      <motion.p key="proc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-white md:text-lg font-light flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-t-2 border-white border-t-[#E5C07B] animate-spin" />
                        Preparing voice response...
                      </motion.p>
                    )}
                    {!isListening && !isProcessing && !transcript && (
                      <motion.p key="init" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-gray-500 md:text-lg font-light tracking-wide">
                        Activate microphone to begin
                      </motion.p>
                    )}
                    {error && (
                      <motion.p key="err" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 md:text-lg font-light tracking-wide">
                        {error}
                      </motion.p>
                    )}
                    {transcript && !isProcessing && !isListening && !error && (
                      <motion.p key="trans" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-white md:text-lg font-light italic truncate max-w-[200px] md:max-w-[400px]">
                        Voice captured. Reply is spoken aloud.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Ambient glow inside bar */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 h-32 bg-[#E5C07B]/10 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </div>

          {/* Master AI Response Display */}
          <AnimatePresence>
            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-12 w-full text-center relative"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-[#E5C07B] to-transparent -translate-y-full opacity-50" />
                <p className="text-white text-2xl md:text-4xl lg:text-5xl font-display font-light leading-[1.2] italic max-w-4xl mx-auto drop-shadow-2xl">
                  Voice response delivered
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default AstroHero;
