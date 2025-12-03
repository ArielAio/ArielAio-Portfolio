import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

const MagneticButton = ({ children, onClick, href, className }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });
  const { x, y } = position;

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* 3D Floating Cube (Background Decoration) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-20 pointer-events-none cube-container scale-75 md:scale-100">
        <div className="cube">
            <div className="face face-front"></div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gpu-accelerated"
        >
          <motion.span 
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
            className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm cursor-default"
          >
            {HERO_CONTENT.greeting}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 gpu-accelerated select-none"
        >
          {HERO_CONTENT.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-3xl text-gray-400 font-light mb-8 max-w-3xl mx-auto gpu-accelerated"
        >
          {HERO_CONTENT.role}
        </motion.h2>

        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed gpu-accelerated"
        >
          {HERO_CONTENT.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-8 gpu-accelerated"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            {/* Shimmer Button */}
            <motion.a
              href="#projects"
              onClick={(e) => handleScroll(e, 'projects')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#6366f1,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-50 cursor-pointer shadow-lg w-full sm:w-auto"
            >
              Ver Projetos
            </motion.a>

            {/* Magnetic Button */}
            <MagneticButton
              href="#contact"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScroll(e, 'contact')}
              className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-full cursor-pointer hover:bg-white/5 transition-colors w-full sm:w-auto"
            >
              Entrar em Contato
            </MagneticButton>
          </div>

          {/* New Resume Button */}
          <motion.a
            href="/resume.pdf" // Ensure you have this file in your public folder or replace with a real link
            download="CV_Ariel_Aio.pdf"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group backdrop-blur-sm cursor-pointer"
          >
             <div className="p-2 bg-primary/20 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Download size={18} />
             </div>
             <div className="text-left">
                <span className="block text-[10px] text-gray-400 font-mono uppercase tracking-wider leading-none mb-1">Currículo</span>
                <span className="block text-sm font-bold text-white group-hover:text-primary transition-colors leading-none">Baixar PDF</span>
             </div>
          </motion.a>

        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        <ArrowDown className="text-gray-500 w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default Hero;