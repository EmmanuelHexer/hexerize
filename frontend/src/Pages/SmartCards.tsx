import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ringImage from "../assets/ring.png";

const SmartCards = () => {
  const navigate = useNavigate();
  const [showRings, setShowRings] = useState(false);
  const [cardRotation, setCardRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device supports hover (desktop) or is touch-only (mobile)
  useEffect(() => {
    const checkIfMobile = () => {
      // Check both viewport width and hover capability
      const isTouchDevice = window.matchMedia("(hover: none)").matches || window.innerWidth < 768;
      setIsMobile(isTouchDevice);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Add custom navbar styling for this page
  useEffect(() => {
    const navbar = document.querySelector("header");
    if (navbar) {
      navbar.classList.add("smartcards-nav");
    }
    return () => {
      if (navbar) {
        navbar.classList.remove("smartcards-nav");
      }
    };
  }, []);

  // Auto-rotate cards continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCardRotation((prev) => (prev + 1) % 4);
    }, 2500); // Rotate every 2.5 seconds

    return () => clearInterval(interval);
  }, []);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt effect - Card
  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);
  const cardRotateX = useSpring(useTransform(cardMouseY, [-300, 300], [10, -10]), { stiffness: 150, damping: 20 });
  const cardRotateY = useSpring(useTransform(cardMouseX, [-300, 300], [-10, 10]), { stiffness: 150, damping: 20 });

  // Mouse tracking for 3D tilt effect - Ring
  const ringMouseX = useMotionValue(0);
  const ringMouseY = useMotionValue(0);
  const ringRotateX = useSpring(useTransform(ringMouseY, [-300, 300], [10, -10]), { stiffness: 150, damping: 20 });
  const ringRotateY = useSpring(useTransform(ringMouseX, [-300, 300], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    cardMouseX.set(e.clientX - centerX);
    cardMouseY.set(e.clientY - centerY);
  };

  // Desktop: Hover handlers
  const handleCardMouseEnter = () => {
    if (!isMobile) {
      setShowRings(true);
    }
  };

  const handleCardMouseLeave = () => {
    cardMouseX.set(0);
    cardMouseY.set(0);
    if (!isMobile) {
      setShowRings(false);
    }
  };

  // Mobile: Click/Tap handler
  const handleCardClick = () => {
    if (isMobile) {
      setShowRings(!showRings);
    }
  };

  const handleRingMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ringRef.current) return;
    const rect = ringRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    ringMouseX.set(e.clientX - centerX);
    ringMouseY.set(e.clientY - centerY);
  };

  const handleRingMouseLeave = () => {
    ringMouseX.set(0);
    ringMouseY.set(0);
  };

  // Scroll animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".scroll-fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 transition-all duration-700 ease-in-out">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="particle" style={{ left: "10%", top: "20%", animationDelay: "0s" }}></div>
          <div className="particle" style={{ left: "80%", top: "30%", animationDelay: "2s" }}></div>
          <div className="particle" style={{ left: "20%", top: "70%", animationDelay: "4s" }}></div>
          <div className="particle" style={{ left: "70%", top: "60%", animationDelay: "6s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 xs:gap-20 sm:gap-24 lg:gap-12 items-center">
            {/* Left - Text Content */}
            <div className="space-y-3 xs:space-y-4 text-center lg:text-left scroll-fade-in">
              <div className="inline-block py-2 px-4 rounded-full bg-[color:var(--accent-color)]/10 border border-[color:var(--accent-color)]/30 text-sm">
                <span className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400 status-indicator"></span>
                  <span className="text-[color:var(--accent-color)] font-medium">Now Available in Ghana</span>
                </span>
              </div>

              <h1 className="font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-[color:var(--heading-color)]">
                Smart Business
                <br />
                <span className="text-gradient-animated">Cards & Rings</span>
              </h1>

              <p className="text-[color:var(--body-color)]/70 text-sm xs:text-base md:text-lg leading-relaxed max-w-[50ch] mx-auto lg:mx-0">
                Share your digital presence with a tap. Premium solutions for modern professionals.
              </p>

              <div className="pt-1 xs:pt-2">
                <button
                  onClick={() => navigate("/contact")}
                  className="magnetic-hover group inline-flex items-center justify-center gap-2 px-5 py-2 xs:px-6 xs:py-2.5 sm:px-8 sm:py-3 text-sm xs:text-base font-semibold text-white bg-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/90 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 animate-glow"
                >
                  <span>Order Now</span>
                  <svg className="w-3 h-3 xs:w-4 xs:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right - Card Stack & Ring Stack */}
            <div className="scroll-fade-in flex flex-col gap-8 items-center lg:items-end">
              {/* Interactive Container - Cards/Rings Switch on Hover (Desktop) or Click (Mobile) */}
              <div
                className="relative w-[260px] xs:w-[300px] sm:w-[380px]"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                onClick={handleCardClick}
                style={{ minHeight: "200px" }}
              >
                {/* Card Stack - Shows when NOT showing rings */}
                <AnimatePresence mode="wait" initial={false}>
                  {!showRings && (
                    <motion.div
                      key="cards"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0 w-full cursor-pointer"
                    >
                      <div
                        ref={cardRef}
                        onMouseMove={handleCardMouseMove}
                        className="relative"
                        style={{ perspective: "1500px" }}
                      >
                        {/* Stack of 4 cards with auto-rotation */}
                        {[0, 1, 2, 3].map((index) => {
                          // Calculate position based on auto-rotation
                          const positionInCycle = (index - cardRotation + 4) % 4;
                          const isFront = positionInCycle === 3;

                          // Always show fan spread
                          const rotation = (positionInCycle - 1.5) * 8;
                          const yOffset = (positionInCycle - 1.5) * 15;
                          const xOffset = (positionInCycle - 1.5) * 25;
                          const scale = 1 - (3 - positionInCycle) * 0.02;
                          const zIndex = positionInCycle;

                          return (
                            <motion.div
                              key={index}
                              style={{
                                rotateX: isFront ? cardRotateX : 0,
                                rotateY: isFront ? cardRotateY : 0,
                                transformStyle: "preserve-3d",
                                zIndex
                              }}
                              animate={{
                                rotateZ: rotation,
                                y: yOffset,
                                x: xOffset,
                                scale: scale,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 180,
                                damping: 22,
                                mass: 1
                              }}
                              className="absolute top-0 left-0 w-[260px] h-[160px] xs:w-[300px] xs:h-[185px] sm:w-[380px] sm:h-[240px]"
                            >
                              <div
                                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl hover-lift"
                                style={{
                                  backfaceVisibility: "hidden",
                                  filter: !isFront ? `brightness(${0.7 + positionInCycle * 0.1})` : 'none'
                                }}
                              >
                                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 relative border border-[color:var(--accent-color)]/30">
                                  {isFront && (
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                      animate={{ x: ["-100%", "200%"] }}
                                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                    />
                                  )}
                                  <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                      <div className="text-2xl font-bold mb-2 text-gradient-animated">HEXERIZE</div>
                                      <div className="text-xs text-gray-400">SMART BUSINESS CARD</div>
                                    </div>
                                    <div>
                                      <div className="text-base font-semibold text-white mb-1">Your Name</div>
                                      <div className="text-sm text-gray-400">Your Title</div>
                                    </div>
                                    <div className="absolute top-1/2 right-6 transform -translate-y-1/2 w-12 h-12 opacity-20">
                                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                        {/* Spacer for layout */}
                        <div className="w-[260px] h-[160px] xs:w-[300px] xs:h-[185px] sm:w-[380px] sm:h-[240px]"></div>
                      </div>
                      <p className="text-center text-[color:var(--body-color)]/60 text-sm mt-4">Business Card • GHS 400</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ring Stack - Shows when hovering (Desktop) or clicked (Mobile) */}
                <AnimatePresence mode="wait" initial={false}>
                  {showRings && (
                    <motion.div
                      key="rings"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0 w-full cursor-pointer"
                      style={{ perspective: "2000px" }}
                    >
                      <div
                        ref={ringRef}
                        onMouseMove={handleRingMouseMove}
                        className="relative w-[260px] h-[160px] xs:w-[300px] xs:h-[185px] sm:w-[380px] sm:h-[240px] flex items-center justify-center"
                      >
                        {/* Stack of 2 MASSIVE rings */}
                        {[0, 1].map((index) => {
                          const rotation = (index - 0.5) * 12;
                          const yOffset = (index - 0.5) * 35;
                          const xOffset = (index - 0.5) * 45;
                          const scale = 1.2;
                          const zIndex = index;
                          const isFront = index === 1;

                          return (
                            <motion.div
                              key={index}
                              style={{
                                rotateX: isFront && !isMobile ? ringRotateX : 0,
                                rotateY: isFront && !isMobile ? ringRotateY : 0,
                                transformStyle: "preserve-3d",
                                zIndex
                              }}
                              animate={{
                                rotateZ: rotation,
                                y: yOffset,
                                x: xOffset,
                                scale: scale,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 180,
                                damping: 22,
                              }}
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            >
                              <motion.div
                                className="relative"
                                animate={{
                                  rotateZ: [0, 360],
                                }}
                                transition={{
                                  rotateZ: {
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }
                                }}
                              >
                                {/* Glow effect behind ring - only on front */}
                                {isFront && (
                                  <motion.div
                                    className="absolute inset-0 rounded-full blur-xl"
                                    style={{
                                      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
                                      transform: 'scale(1.3)',
                                      zIndex: -1
                                    }}
                                    animate={{
                                      opacity: [0.5, 0.7, 0.5],
                                      scale: [1.2, 1.4, 1.2]
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  />
                                )}

                                {/* Actual Ring Image - Responsive */}
                                <img
                                  src={ringImage}
                                  alt="Smart Ring"
                                  className="w-[400px] xs:w-[480px] sm:w-[750px] md:w-[850px] lg:w-[950px] h-auto"
                                  style={{
                                    filter: `drop-shadow(0 35px 70px rgba(0, 0, 0, ${0.5 + index * 0.15})) drop-shadow(0 18px 36px rgba(0, 0, 0, 0.6)) brightness(${0.75 + index * 0.15})`,
                                  }}
                                />

                                {/* Animated light sweep overlay - only on front ring */}
                                {isFront && (
                                  <motion.div
                                    className="absolute inset-0 overflow-hidden pointer-events-none"
                                    style={{
                                      mixBlendMode: 'overlay',
                                    }}
                                  >
                                    <motion.div
                                      className="absolute inset-0"
                                      style={{
                                        background: `
                                          linear-gradient(
                                            120deg,
                                            transparent 0%,
                                            transparent 30%,
                                            rgba(255, 255, 255, 0.8) 50%,
                                            transparent 70%,
                                            transparent 100%
                                          )
                                        `,
                                        width: '200%',
                                        height: '100%',
                                      }}
                                      animate={{
                                        x: ['-100%', '100%'],
                                      }}
                                      transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                        ease: "easeInOut"
                                      }}
                                    />
                                  </motion.div>
                                )}
                              </motion.div>
                            </motion.div>
                          );
                        })}
                      </div>
                      <p className="text-center text-[color:var(--body-color)]/60 text-sm mt-4">
                        Smart Ring • GHS 600 {isMobile && <span className="block text-xs mt-1">(Tap again to see cards)</span>}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-fade-in">
            <p className="uppercase font-semibold text-xs md:text-sm text-[color:var(--body-color)]/70 mb-4 tracking-wider">Simple Process</p>
            <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-[color:var(--heading-color)] mb-6">
              How It <span className="text-gradient-animated">Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Tap & Share",
                description: "Simply tap your card or ring on any compatible smartphone. Works with iPhone 7+ and Android devices.",
                icon: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
              },
              {
                step: "02",
                title: "Instant Profile",
                description: "Your complete digital profile opens instantly with contact info, social media, and more.",
                icon: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
              },
              {
                step: "03",
                title: "Update Anytime",
                description: "Change your information from your dashboard whenever you want. Updates sync instantly.",
                icon: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
              },
            ].map((item, index) => (
              <div key={index} className="scroll-fade-in" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="relative theme-card backdrop-blur-sm p-8 rounded-2xl hover-lift h-full border border-[color:var(--accent-color)]/20">
                  <div className="text-7xl font-bold text-[color:var(--body-color)]/10 mb-4">{item.step}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[color:var(--accent-color)] to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-[color:var(--heading-color)] mb-4">{item.title}</h3>
                  <p className="text-[color:var(--body-color)]/70 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-fade-in">
            <p className="uppercase font-semibold text-xs md:text-sm text-[color:var(--body-color)]/70 mb-4 tracking-wider">Why Choose Us</p>
            <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-[color:var(--heading-color)] mb-6">
              Premium <span className="text-gradient-animated">Features</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "No App Needed", desc: "Works instantly with any smartphone", icon: <svg className="w-10 h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
              { title: "Always Updated", desc: "Edit your info anytime, anywhere", icon: <svg className="w-10 h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
              { title: "Universal", desc: "Compatible with iOS & Android", icon: <svg className="w-10 h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: "Instant Share", desc: "Tap once to transfer everything", icon: <svg className="w-10 h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
              { title: "Premium Build", desc: "High-quality durable material", icon: <svg className="w-10 h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
              { title: "Secure", desc: "Advanced encryption technology", icon: <svg className="w-10 h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
              { title: "Custom Design", desc: "Match your brand perfectly", icon: <svg className="w-10 h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
              { title: "Eco-Friendly", desc: "No paper waste, reusable", icon: <svg className="w-10 h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
            ].map((feature, index) => (
              <div key={index} className="scroll-fade-in" style={{ transitionDelay: `${index * 0.05}s` }}>
                <div className="theme-card p-6 rounded-xl hover-lift text-center border border-[color:var(--accent-color)]/20 h-full">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h4 className="text-lg font-bold text-[color:var(--heading-color)] mb-2">{feature.title}</h4>
                  <p className="text-[color:var(--body-color)]/70 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-fade-in">
            <p className="uppercase font-semibold text-xs md:text-sm text-[color:var(--body-color)]/70 mb-4 tracking-wider">Pricing</p>
            <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-[color:var(--heading-color)] mb-6">
              Choose Your <span className="text-gradient-animated">Plan</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="scroll-fade-in">
              <div className="theme-card p-8 rounded-2xl hover-lift h-full border border-[color:var(--accent-color)]/20">
                <div className="text-2xl font-bold text-[color:var(--heading-color)] mb-2">Individual Card</div>
                <div className="text-5xl font-bold text-gradient-animated mb-2">GHS 400</div>
                <p className="text-sm text-[color:var(--body-color)]/60 mb-6">per card</p>
                <ul className="space-y-3 mb-8">
                  {["Premium card", "Full color printing", "Smart technology", "Custom design", "Lifetime updates"].map((f, i) => (
                    <li key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-[color:var(--body-color)]/70 text-sm">{f}</span></li>
                  ))}
                </ul>
                <button onClick={() => navigate("/contact")} className="w-full py-3 rounded-full font-semibold border border-[color:var(--accent-color)]/30 text-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/10 transition-all duration-300 hover:scale-105">Order Now</button>
              </div>
            </div>

            <div className="scroll-fade-in relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[color:var(--accent-color)] to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold z-10 shadow-lg">Most Popular</div>
              <div className="theme-card p-8 rounded-2xl hover-lift h-full border border-[color:var(--accent-color)]">
                <div className="text-2xl font-bold text-[color:var(--heading-color)] mb-2">Business Bulk</div>
                <div className="text-5xl font-bold text-gradient-animated mb-2">GHS 350</div>
                <p className="text-sm text-[color:var(--body-color)]/60 mb-6">per card (min. 10)</p>
                <ul className="space-y-3 mb-8">
                  {["Premium cards", "Bulk discount", "Team designs", "Priority support", "Analytics dashboard", "Free shipping"].map((f, i) => (
                    <li key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-[color:var(--body-color)]/70 text-sm">{f}</span></li>
                  ))}
                </ul>
                <button onClick={() => navigate("/contact")} className="w-full py-3 rounded-full font-semibold bg-[color:var(--accent-color)] text-white shadow-lg transition-all duration-300 hover:scale-105">Order Now</button>
              </div>
            </div>

            <div className="scroll-fade-in">
              <div className="theme-card p-8 rounded-2xl hover-lift h-full border border-[color:var(--accent-color)]/20">
                <div className="text-2xl font-bold text-[color:var(--heading-color)] mb-2">Smart Ring</div>
                <div className="text-5xl font-bold text-gradient-animated mb-2">GHS 600</div>
                <p className="text-sm text-[color:var(--body-color)]/60 mb-6">per ring</p>
                <ul className="space-y-3 mb-8">
                  {["Tungsten/Titanium", "Smart technology", "Multiple sizes", "Water-resistant", "Scratch-proof", "Lifetime warranty"].map((f, i) => (
                    <li key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-[color:var(--body-color)]/70 text-sm">{f}</span></li>
                  ))}
                </ul>
                <button onClick={() => navigate("/contact")} className="w-full py-3 rounded-full font-semibold border border-[color:var(--accent-color)]/30 text-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/10 transition-all duration-300 hover:scale-105">Pre-Order</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center scroll-fade-in">
          <h2 className="font-extrabold text-4xl md:text-5xl text-[color:var(--heading-color)] mb-6">
            Ready to <span className="text-gradient-animated">Transform</span> Your Networking?
          </h2>
          <p className="text-xl text-[color:var(--body-color)]/70 mb-8 max-w-2xl mx-auto">
            Join professionals using Hexerize Smart Cards and Rings. Never miss a connection again.
          </p>
          <button onClick={() => navigate("/contact")} className="magnetic-hover inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-semibold text-white bg-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/90 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 animate-glow">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default SmartCards;
