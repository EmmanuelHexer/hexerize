import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Smart Business Cards & Rings - Premium NFC Technology | Hexerize Ghana</title>
        <meta
          name="title"
          content="Smart Business Cards & Rings - Premium NFC Technology | Hexerize Ghana"
        />
        <meta
          name="description"
          content="Transform your networking with Hexerize Smart Business Cards & Rings in Ghana. Share your digital presence with a tap. Premium NFC solutions from GHS 350. No app required, instant share, lifetime updates."
        />
        <meta
          name="keywords"
          content="smart business cards Ghana, NFC business cards, smart rings Ghana, digital business cards, contactless networking, NFC technology Ghana, Hexerize, professional networking, smart cards Accra"
        />
        <link rel="canonical" href="https://hexerize.com/smart-cards" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product.group" />
        <meta property="og:url" content="https://hexerize.com/smart-cards" />
        <meta
          property="og:title"
          content="Smart Business Cards & Rings - Premium NFC Technology | Hexerize Ghana"
        />
        <meta
          property="og:description"
          content="Transform your networking with Hexerize Smart Business Cards & Rings in Ghana. Share your digital presence with a tap. Premium NFC solutions from GHS 350."
        />
        <meta property="og:image" content="https://hexerize.com/og-smart-cards.jpg" />
        <meta property="og:locale" content="en_GH" />
        <meta property="og:site_name" content="Hexerize" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hexerize.com/smart-cards" />
        <meta
          property="twitter:title"
          content="Smart Business Cards & Rings - Premium NFC Technology | Hexerize Ghana"
        />
        <meta
          property="twitter:description"
          content="Transform your networking with Hexerize Smart Business Cards & Rings in Ghana. Share your digital presence with a tap. Premium NFC solutions from GHS 350."
        />
        <meta property="twitter:image" content="https://hexerize.com/og-smart-cards.jpg" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Hexerize" />
        <meta name="geo.region" content="GH" />
        <meta name="geo.placename" content="Ghana" />
      </Helmet>

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
                <AnimatePresence initial={false}>
                  {!showRings && (
                    <motion.div
                      key="cards"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
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
                <AnimatePresence initial={false}>
                  {showRings && (
                    <motion.div
                      key="rings"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
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
      <section id="features" className="py-32 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--accent-color)]/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[color:var(--accent-color)]/20 to-blue-600/20 border border-[color:var(--accent-color)]/30 text-sm font-semibold text-[color:var(--accent-color)] tracking-wider">
                SIMPLE PROCESS
              </span>
            </motion.div>
            <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-[color:var(--heading-color)] mb-6 leading-tight">
              How It <span className="text-gradient-animated">Works</span>
            </h2>
            <p className="text-[color:var(--body-color)]/70 text-lg max-w-2xl mx-auto">
              Three simple steps to transform your networking game
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Tap & Share",
                description: "Simply tap your card or ring on any compatible smartphone. Works with iPhone 7+ and Android devices.",
                icon: <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
              },
              {
                step: "02",
                title: "Instant Profile",
                description: "Your complete digital profile opens instantly with contact info, social media, and more.",
                icon: <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
              },
              {
                step: "03",
                title: "Update Anytime",
                description: "Change your information from your dashboard whenever you want. Updates sync instantly.",
                icon: <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="scroll-fade-in group"
              >
                <div className="relative theme-card backdrop-blur-sm p-10 rounded-3xl hover-lift h-full border border-[color:var(--accent-color)]/30 bg-gradient-to-br from-gray-900/50 to-black/50 overflow-hidden transition-all duration-500 hover:border-[color:var(--accent-color)]/60 hover:shadow-2xl hover:shadow-[color:var(--accent-color)]/20">
                  {/* Animated background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Step number with glow */}
                  <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--accent-color)]/30 to-blue-600/20 mb-6 leading-none group-hover:from-[color:var(--accent-color)]/50 group-hover:to-blue-600/40 transition-all duration-500">
                    {item.step}
                  </div>

                  {/* Icon container with animation */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 bg-gradient-to-br from-[color:var(--accent-color)] to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-[color:var(--accent-color)]/30 group-hover:shadow-2xl group-hover:shadow-[color:var(--accent-color)]/50 transition-all duration-500"
                  >
                    {item.icon}
                  </motion.div>

                  <h3 className="text-3xl font-bold text-[color:var(--heading-color)] mb-4 group-hover:text-gradient-animated transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[color:var(--body-color)]/70 leading-relaxed text-base">
                    {item.description}
                  </p>

                  {/* Connecting line (except last card) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-12 lg:w-16 h-0.5 bg-gradient-to-r from-[color:var(--accent-color)]/50 to-transparent"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Minimal Bento Style */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[color:var(--accent-color)]/5 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 scroll-fade-in">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-extrabold text-5xl md:text-6xl lg:text-7xl text-[color:var(--heading-color)] mb-4 leading-tight tracking-tight"
            >
              Why Choose <span className="text-gradient-animated">Us</span>
            </motion.h2>
          </div>

          {/* Bento Grid - Asymmetric Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Large Feature - Spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-2 row-span-2 group"
            >
              <div className="h-full p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-white/10 hover:border-[color:var(--accent-color)]/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[color:var(--accent-color)]/10 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Instant Share</h3>
                  <p className="text-[color:var(--body-color)]/60 text-base md:text-lg">One tap transfers everything. No apps, no friction, just seamless connection.</p>
                </div>
              </div>
            </motion.div>

            {/* Small Features */}
            {[
              { title: "Universal", icon: <svg className="w-6 h-6 md:w-8 md:h-8 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: "Secure", icon: <svg className="w-6 h-6 md:w-8 md:h-8 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
              { title: "Premium", icon: <svg className="w-6 h-6 md:w-8 md:h-8 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
              { title: "Updated", icon: <svg className="w-6 h-6 md:w-8 md:h-8 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-xl border border-white/5 hover:border-[color:var(--accent-color)]/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[color:var(--accent-color)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[color:var(--accent-color)]/10 rounded-xl flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h4 className="text-base md:text-lg font-semibold text-white">{feature.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Medium Features */}
            {[
              { title: "No App Required", desc: "Works with any smartphone", icon: <svg className="w-8 h-8 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
              { title: "Eco-Friendly", desc: "Sustainable & reusable", icon: <svg className="w-8 h-8 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="col-span-2 md:col-span-1 group"
              >
                <div className="h-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-xl border border-white/5 hover:border-[color:var(--accent-color)]/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[color:var(--accent-color)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[color:var(--accent-color)]/10 rounded-xl flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-[color:var(--body-color)]/60 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
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

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Product",
              "@id": "https://hexerize.com/smart-cards#business-card",
              "name": "Hexerize Smart Business Card",
              "description": "Premium NFC smart business card with instant digital sharing. Full color printing, custom design, and lifetime updates.",
              "image": "https://hexerize.com/smart-card-product.jpg",
              "brand": {
                "@type": "Brand",
                "name": "Hexerize"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://hexerize.com/smart-cards",
                "priceCurrency": "GHS",
                "price": "400",
                "priceValidUntil": "2026-12-31",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Hexerize"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              }
            },
            {
              "@type": "Product",
              "@id": "https://hexerize.com/smart-cards#smart-ring",
              "name": "Hexerize Smart Ring",
              "description": "Premium tungsten/titanium smart ring with NFC technology. Water-resistant, scratch-proof, with lifetime warranty.",
              "image": "https://hexerize.com/smart-ring-product.jpg",
              "brand": {
                "@type": "Brand",
                "name": "Hexerize"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://hexerize.com/smart-cards",
                "priceCurrency": "GHS",
                "price": "600",
                "priceValidUntil": "2026-12-31",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/PreOrder",
                "seller": {
                  "@type": "Organization",
                  "name": "Hexerize"
                }
              }
            },
            {
              "@type": "WebPage",
              "@id": "https://hexerize.com/smart-cards",
              "url": "https://hexerize.com/smart-cards",
              "name": "Smart Business Cards & Rings - Premium NFC Technology | Hexerize Ghana",
              "description": "Transform your networking with Hexerize Smart Business Cards & Rings in Ghana. Share your digital presence with a tap.",
              "isPartOf": {
                "@type": "WebSite",
                "@id": "https://hexerize.com/#website",
                "url": "https://hexerize.com",
                "name": "Hexerize",
                "publisher": {
                  "@type": "Organization",
                  "name": "Hexerize",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://hexerize.com/logo.png"
                  }
                }
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://hexerize.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Smart Cards & Rings",
                    "item": "https://hexerize.com/smart-cards"
                  }
                ]
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do Hexerize smart cards work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply tap your Hexerize smart card or ring on any compatible smartphone (iPhone 7+ or Android). Your complete digital profile opens instantly with contact info, social media, and more. No app required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I update my smart card information?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! You can change your information from your dashboard whenever you want. Updates sync instantly to your card."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What devices are compatible with Hexerize smart cards?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hexerize smart cards and rings work with iPhone 7+ and most Android devices with NFC capability."
                  }
                }
              ]
            }
          ]
        })}
      </script>
    </>
  );
};

export default SmartCards;
