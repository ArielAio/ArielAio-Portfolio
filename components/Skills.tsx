import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { Cpu, Server, Layout } from 'lucide-react';

const Skills: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Layout size={20} />;
      case 'backend': return <Server size={20} />;
      default: return <Cpu size={20} />;
    }
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tecnológico</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Ferramentas que utilizo no dia a dia para transformar problemas complexos em soluções escaláveis e performáticas.
          </motion.p>
        </div>

        {/* Spotlight Container */}
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
            {/* Spotlight Overlay Layer */}
            <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
                }}
            />

          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5, 
                transition: { duration: 0.2, delay: 0 }
               }}
              className="group glass-card p-6 rounded-xl border border-white/5 transition-all relative overflow-hidden z-20 bg-dark/40 hover:bg-dark/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-white/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  {getIcon(skill.category)}
                </div>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-secondary border border-secondary/20 group-hover:bg-secondary/10 transition-colors">
                  {skill.time}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors relative z-10">
                {skill.name}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;