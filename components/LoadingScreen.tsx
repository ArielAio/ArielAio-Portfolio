import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing System...");

  useEffect(() => {
    // Sequence of "system checks"
    const timeline = [
      { p: 20, txt: "Analysing Hardware...", time: 500 },
      { p: 40, txt: "Checking GPU Capabilities...", time: 1000 },
      { p: 60, txt: "Optimizing Assets...", time: 1500 },
      { p: 80, txt: "Loading 3D Modules...", time: 2000 },
      { p: 100, txt: "System Ready.", time: 2500 },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    timeline.forEach(({ p, txt, time }) => {
      const t = setTimeout(() => {
        setProgress(p);
        setStatus(txt);
        if (p === 100) {
          setTimeout(onComplete, 500); // Small delay after 100% before unmounting
        }
      }, time);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center font-mono text-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="w-full max-w-md px-6">
        
        {/* Icon Animation */}
        <div className="flex justify-center mb-8 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute"
          >
            <div className="w-16 h-16 border-t-2 border-primary rounded-full opacity-50"></div>
          </motion.div>
          <div className="w-16 h-16 flex items-center justify-center text-primary">
            <Cpu size={32} />
          </div>
        </div>

        {/* Status Text */}
        <div className="flex justify-between items-end mb-2">
            <span className="text-xs uppercase tracking-widest text-gray-400">{status}</span>
            <span className="text-xl font-bold">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary box-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        <div className="mt-8 flex justify-center gap-2">
            {[1,2,3].map(i => (
                <motion.div 
                    key={i}
                    className="w-1 h-1 bg-primary rounded-full"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;