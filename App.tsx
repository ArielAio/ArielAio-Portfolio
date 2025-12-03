
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { Particles } from './components/Particles';
import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // PERFORMANCE OPTIMIZATION: 
  // Use MotionValues for high-frequency updates (mouse move).
  // Initialize off-screen to prevent flash at (0,0)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the follower (Outer Ring) - Creates the "lazy" trail effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [clickWaves, setClickWaves] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      // Update MotionValues directly
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Context Aware Logic
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorVariant('button');
      } 
      // Check if hovering over text
      else if (
        target.tagName === 'P' || 
        target.tagName === 'SPAN' || 
        target.tagName === 'H1' || 
        target.tagName === 'H2' || 
        target.tagName === 'H3' || 
        target.tagName === 'H4' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'LI'
      ) {
        setCursorVariant('text');
      } else {
        setCursorVariant('default');
      }
    };

    const handleClick = (e: MouseEvent) => {
        const newWave = { id: Date.now(), x: e.clientX, y: e.clientY };
        setClickWaves(prev => [...prev, newWave]);
        
        // Remove wave after animation
        setTimeout(() => {
            setClickWaves(prev => prev.filter(w => w.id !== newWave.id));
        }, 800);
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleClick);
    }

    const handleChange = (e: MediaQueryListEvent) => {
        setIsDesktop(e.matches);
        if (e.matches) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mousedown", handleClick);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleClick);
        }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mouseX, mouseY]);

  // Framer Motion Variants for Cursor
  // NOTE: x: "-50%", y: "-50%" is CRITICAL for centering.
  // We use `left` and `top` styles for positioning, and these transforms for centering.
  const cursorVariants = {
    default: {
        height: 32,
        width: 32,
        backgroundColor: "transparent",
        border: "1px solid rgba(255,255,255,0.5)",
        x: "-50%",
        y: "-50%",
        mixBlendMode: "difference" as "difference"
    },
    button: {
        height: 64,
        width: 64,
        backgroundColor: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0)",
        x: "-50%",
        y: "-50%",
        mixBlendMode: "screen" as "screen"
    },
    text: {
        height: 32,
        width: 2, // I-beam look
        backgroundColor: "rgba(255,255,255,1)",
        border: "none",
        x: "-50%",
        y: "-50%",
        borderRadius: 0,
        mixBlendMode: "difference" as "difference"
    }
  };

  return (
    <div className={`bg-dark min-h-screen text-white selection:bg-primary selection:text-white ${isDesktop ? 'cursor-none' : ''}`}>
      
      {/* GLOBAL BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        {/* Cinematic Noise Overlay - Adds Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
        
        {/* Ambient Moving Orbs (Living Background) - Optimized with GPU transform */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px] animate-blob gpu-accelerated"></div>
        <div className="absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] bg-secondary/10 rounded-full blur-[100px] animate-blob animation-delay-4000 gpu-accelerated"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-2000 gpu-accelerated"></div>

        {/* Particles / Fireflies Effect */}
        <Particles quantity={50} />

        {/* Global Spotlight (Mouse Tracking Fog) - Optimized */}
        {isDesktop && (
            <motion.div 
                className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none will-change-transform"
                style={{
                    left: cursorX, // Use spring physics for smooth spotlight
                    top: cursorY,
                    x: "-50%", // Center via transform
                    y: "-50%"
                }}
            />
        )}
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Custom Cursor - Optimized with MotionValues and separated physics */}
      {isDesktop && (
        <>
            {/* Click Shockwaves */}
            <AnimatePresence>
                {clickWaves.map(wave => (
                    <motion.div
                        key={wave.id}
                        initial={{ width: 0, height: 0, opacity: 0.8 }}
                        animate={{ width: 150, height: 150, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ 
                            left: wave.x, 
                            top: wave.y, 
                            x: "-50%", 
                            y: "-50%" 
                        }}
                        className="fixed rounded-full border border-primary z-[99] pointer-events-none"
                    />
                ))}
            </AnimatePresence>

            {/* Main Cursor Ring - Follows with Spring Physics */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100]"
                variants={cursorVariants}
                animate={cursorVariant}
                style={{
                    left: cursorX, // Positioning via Spring
                    top: cursorY,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }} 
            />
            
            {/* Inner Dot - Instant Follow (Precision) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[100]"
                style={{
                    left: mouseX, // Positioning via Raw MotionValue (Instant)
                    top: mouseY,
                    x: "-50%",    // Centering via Transform
                    y: "-50%"
                }}
            />
        </>
      )}

      <Navbar />
      
      {/* Main Content - z-index ensures it sits above the background */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

    </div>
  );
};

export default App;
