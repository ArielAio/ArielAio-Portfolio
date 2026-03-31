import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import LanguageTransition from './components/LanguageTransition';
import ThemeTransition from './components/ThemeTransition';
import { Particles } from './components/Particles';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { PerformanceProvider, usePerformance } from './PerformanceContext';
import { useThemeClasses } from './hooks/useThemeClasses';

const About = React.lazy(() => import('./components/About'));
const Experience = React.lazy(() => import('./components/Experience'));
const FeaturedProject = React.lazy(() => import('./components/FeaturedProject'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));

const AppContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { tier, isLowPower, isLoading, completeLoading, enableParticles } = usePerformance();
  const classes = useThemeClasses();

  // Determine Particle Count based on enableParticles flag
  const particleCount = enableParticles ? (tier === 'high' ? 60 : 30) : 0;

  return (
    <div className={`${classes.bg.base} min-h-screen ${classes.text.primary} selection:bg-primary ${classes.text.inverse}`}>
      
      {/* LOADING SCREEN OVERLAY */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={completeLoading} />}
      </AnimatePresence>

      <LanguageTransition />
      <ThemeTransition />

      {/* GLOBAL BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        <div className="absolute inset-0 bg-gradient-radial from-primary/6 via-transparent to-transparent opacity-60"></div>

        {!isLowPower && (
          <>
            <div className="hidden md:block absolute top-[-8%] right-[-8%] w-[28vw] h-[28vw] bg-secondary/8 rounded-full blur-[36px]"></div>
            {tier === 'high' && (
              <div className="hidden lg:block absolute bottom-[-10%] left-[15%] w-[30vw] h-[30vw] bg-blue-900/8 rounded-full blur-[40px]"></div>
            )}
          </>
        )}

        {/* Particles - Only render after loading is complete to save initial frames */}
        {!isLoading && particleCount > 0 && <Particles quantity={particleCount} />}
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Main Content - Opacity fade in after loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main className="relative z-10">
            <Hero />
            <Suspense fallback={null}>
              <About />
              <Experience />
              <FeaturedProject />
              <Projects />
              <Skills />
              <Contact />
            </Suspense>
        </main>
      </motion.div>

    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PerformanceProvider>
          <AppContent />
        </PerformanceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;