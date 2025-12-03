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
    let isMounted = true;

    // 1. Check User Preference for Motion
    let motionQuery: MediaQueryList | null = null;
    
    try {
        if (typeof window !== 'undefined' && window.matchMedia) {
            motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (isMounted) setReduceMotion(motionQuery.matches);
            
            const handleMotionChange = (e: MediaQueryListEvent) => {
                if (isMounted) setReduceMotion(e.matches);
            };
            motionQuery.addEventListener('change', handleMotionChange);
        }
    } catch (e) {
        console.warn("MatchMedia not supported", e);
    }

    // 2. BENCHMARKING (The real test)
    let frameCount = 0;
    let startTime = performance.now();
    let rafId: number;

    const finalizeTier = (fps: number) => {
      if (!isMounted) return;

      try {
        // If user explicitly requested reduced motion, honor it -> Low Tier
        if (motionQuery && motionQuery.matches) {
            setTier('low');
            return;
        }

        let isMobile = false;
        let cores = 4;

        // Defensive navigator access to prevent Script Errors in strict environments
        try {
            if (typeof navigator !== 'undefined') {
                isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                cores = navigator.hardwareConcurrency || 4;
            }
        } catch (e) {
            console.warn("Navigator access blocked", e);
        }
        
        console.log(`[System Check] Benchmark: ${Math.round(fps)} FPS | Mobile: ${isMobile} | Cores: ${cores}`);

        // Decision Logic
        if (fps > 50) {
            setTier('high');
        } else if (fps > 30) {
            setTier('medium');
        } else {
            setTier('low');
        }
      } catch (err) {
        console.warn("Error finalizing tier, defaulting to low", err);
        setTier('low');
      }
    };

    const benchmark = () => {
      try {
        if (!isMounted) return;

        frameCount++;
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;

        // Run benchmark for approx 800ms
        if (elapsed < 800) {
          rafId = requestAnimationFrame(benchmark);
        } else {
          const fps = (frameCount / elapsed) * 1000;
          finalizeTier(fps);
        }
      } catch (error) {
        console.error("Benchmark error:", error);
        finalizeTier(60); 
      }
    };

    // Start benchmark
    try {
        if (typeof window !== 'undefined' && window.requestAnimationFrame) {
            rafId = requestAnimationFrame(benchmark);
        } else {
            finalizeTier(60);
        }
    } catch (e) {
        finalizeTier(60);
    }

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
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