import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { Particles } from './components/Particles';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // PERFORMANCE OPTIMIZATION: 
  // Use MotionValues instead of useState for high-frequency updates (mouse move).
  // This prevents the entire App component tree from re-rendering on every pixel of mouse movement.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      // Update MotionValues directly (does not trigger React render)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const handleChange = (e: MediaQueryListEvent) => {
        setIsDesktop(e.matches);
        if (e.matches) {
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mouseX, mouseY]);

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
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />
        )}
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Custom Cursor - Optimized with MotionValues */}
      {isDesktop && (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[100] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.5
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[100]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
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