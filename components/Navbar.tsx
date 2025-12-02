import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Logo = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="overflow-visible"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Outer Hexagon/Shape Hint - subtle background */}
    <motion.path
      d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
      stroke="url(#logoGradient)"
      strokeWidth="1"
      strokeOpacity="0.3"
      fill="transparent"
      initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
      animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />

    {/* The 'A' Apex Symbol */}
    <motion.path
      d="M50 25 L80 80 H65 L50 50 L35 80 H20 L50 25 Z"
      fill="url(#logoGradient)"
      stroke="white"
      strokeWidth="2"
      filter="url(#glow)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
    />
    
    {/* The Digital Crossbar */}
    <motion.rect
      x="42" y="65" width="16" height="3" rx="1.5"
      fill="white"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    />
  </motion.svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#about' },
    { name: 'Experiência', href: '#experience' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <motion.a 
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Logo />
          <div className="flex flex-col">
            <span className="text-xl font-bold font-mono tracking-tighter text-white group-hover:text-primary transition-colors leading-none">
              Ariel Aio
            </span>
            <span className="text-[10px] tracking-widest text-gray-400 uppercase font-sans">
              Full Stack
            </span>
          </div>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              whileHover={{ scale: 1.1, color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 text-sm font-medium tracking-wide relative group py-2"
            >
              {link.name}
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <motion.button 
            onClick={() => setIsOpen(!isOpen)} 
            whileTap={{ scale: 0.9 }}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-white/10"
        >
          <div className="px-6 py-8 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                whileTap={{ scale: 0.95, x: 10 }}
                className="text-lg font-medium text-gray-200 hover:text-primary transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;