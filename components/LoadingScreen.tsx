import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const duration = useMemo(() => {
    if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) {
      return 450;
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return 450;
      }
    }

    return 900;
  }, []);

  const lines = useMemo(
    () => [
      '$ npm run build',
      '> vite build',
      '',
      'Analyzing performance profile...',
      'Optimizing critical rendering path...',
      'Preparing sections and assets...',
      '',
      'ready in < 1s'
    ],
    []
  );

  useEffect(() => {
    const completeTimeout = window.setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      window.clearTimeout(completeTimeout);
    };
  }, [duration, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      style={{ contain: 'layout' }}
    >
      <div className="w-full max-w-2xl px-6">
        <div className="rounded-t-xl border border-gray-800 bg-[#1b1b1b] px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-xs text-gray-400 font-mono tracking-wide">portfolio-terminal</div>
          <Terminal size={15} className="ml-auto text-gray-500" />
        </div>

        <div className="rounded-b-xl border-x border-b border-gray-800 bg-[#101010] p-6 font-mono min-h-[250px]">
          <div className="space-y-2">
            {lines.map((line, idx) => (
              <motion.div
                key={`${line}-${idx}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.16, delay: idx * 0.06 }}
                className={`text-sm ${
                  line.startsWith('$')
                    ? 'text-blue-400'
                    : line.startsWith('>')
                      ? 'text-gray-500'
                      : line.includes('ready')
                        ? 'text-green-400'
                        : 'text-gray-300'
                }`}
              >
                {line || ' '}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: duration / 1000, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-green-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            />
            Inicializacao otimizada para performance
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;