import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type PerformanceTier = 'low' | 'medium' | 'high';

interface PerformanceContextType {
  tier: PerformanceTier;
  reduceMotion: boolean;
  isLowPower: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<PerformanceTier>('high');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // 1. Check User Preference for Motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(motionQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // 2. Determine Hardware Tier
    const getTier = (): PerformanceTier => {
      // If user specifically asked for reduced motion, force low tier
      if (motionQuery.matches) return 'low';

      // Detect Logical Cores (CPU)
      const cores = navigator.hardwareConcurrency || 4;
      
      // Detect RAM (Chrome/Edge only - returns GB)
      // @ts-ignore - deviceMemory property is experimental but supported in Chromium
      const ram = (navigator as any).deviceMemory || 4;

      // Detect Slow Connection (Network Information API)
      // @ts-ignore
      const connection = (navigator as any).connection;
      const isSlowConnection = connection ? (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === '3g') : false;

      // Tier Logic
      if (isSlowConnection || cores <= 2 || ram < 2) {
        return 'low';
      } else if (cores <= 4 || ram <= 4) {
        return 'medium';
      } else {
        return 'high';
      }
    };

    setTier(getTier());

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const value = {
    tier,
    reduceMotion,
    isLowPower: tier === 'low'
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