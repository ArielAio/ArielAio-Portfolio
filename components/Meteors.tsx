import React, { useMemo } from 'react';

export const Meteors = ({ number = 20 }: { number?: number }) => {
  // Use useMemo to generate meteor styles only once on mount, prevents recalculation on every render
  const meteors = useMemo(() => {
    return new Array(number).fill(true).map(() => ({
      left: Math.floor(Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)) + 'px',
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
    }));
  }, [number]);

  return (
    <>
      {meteors.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: 0,
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </>
  );
};