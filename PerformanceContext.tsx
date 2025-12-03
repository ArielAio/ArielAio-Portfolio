import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type PerformanceTier = 'low' | 'medium' | 'high';

interface PerformanceContextType {
  tier: PerformanceTier;
  reduceMotion: boolean;
  isLowPower: boolean;
  isLoading: boolean;
  completeLoading: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // SAFE-FIRST STRATEGY: Start with 'low' tier to ensure weak devices render the initial frame successfully.
  const [tier, setTier] = useState<PerformanceTier>('low'); 
  const [isLoading, setIsLoading] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // 1. Check User Preference for Motion
    let motionQuery: MediaQueryList | null = null;
    
    if (typeof window !== 'undefined' && window.matchMedia) {
        motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduceMotion(motionQuery.matches);
        
        const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
        motionQuery.addEventListener('change', handleMotionChange);
    }

    // 2. BENCHMARKING (The real test)
    // Browsers often hide real hardware info for privacy. 
    // We run a requestAnimationFrame loop for ~800ms to measure actual FPS.
    let frameCount = 0;
    let startTime = performance.now();
    let rafId: number;

    const finalizeTier = (fps: number) => {
      // If user explicitly requested reduced motion, honor it -> Low Tier
      if (motionQuery && motionQuery.matches) {
        setTier('low');
        return;
      }

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Hardware Heuristics (as secondary check)
      const cores = navigator.hardwareConcurrency || 4;
      
      console.log(`[System Check] Benchmark: ${Math.round(fps)} FPS | Mobile: ${isMobile} | Cores: ${cores}`);

      // Decision Logic
      if (fps > 50) {
        // Smooth performance detected (>50fps)
        if (isMobile) {
          // On mobile, even if fast, we might want to avoid the heaviest 3D cube (Tesseract) to save battery, 
          // but we can allow particles. Let's go High if it's really smooth, or Medium if safe.
          // Let's allow High for powerful phones, but Hero.tsx handles specific mobile visibility for Tesseract.
          setTier('high'); 
        } else {
          setTier('high'); // Desktop with good FPS -> Full Experience
        }
      } else if (fps > 30) {
        // Acceptable performance
        setTier('medium');
      } else {
        // Struggling device
        setTier('low');
      }
    };

    const benchmark = () => {
      try {
        frameCount++;
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;

        // Run benchmark for approx 800ms (fast enough to not block, slow enough to get avg)
        if (elapsed < 800) {
          rafId = requestAnimationFrame(benchmark);
        } else {
          const fps = (frameCount / elapsed) * 1000;
          finalizeTier(fps);
        }
      } catch (error) {
        console.error("Benchmark error:", error);
        finalizeTier(60); // Default to High/Safe if benchmark fails (e.g. strict environment)
      }
    };

    // Start benchmark
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        rafId = requestAnimationFrame(benchmark);
    } else {
        finalizeTier(60); // Server-side or non-RAF environment default
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      // Remove listener logic needs to be inside the effect scope to access the handler
    };
  }, []);

  const completeLoading = () => {
    setIsLoading(false);
  };

  const value = {
    tier,
    reduceMotion,
    isLowPower: tier === 'low',
    isLoading,
    completeLoading
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};