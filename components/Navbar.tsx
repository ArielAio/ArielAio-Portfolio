import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = NAV_LINKS[language];

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 perspective-1000 ${
        scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center transform-style-3d">
        {/* Logo Section - Reverted to Clean Text */}
        <motion.a 
          href="#"
          whileHover={{ scale: 1.05, z: 20 }}
          whileTap={{ scale: 0.95, z: -10 }}
          className="flex flex-col cursor-pointer group transform-style-3d"
        >
          <span className="text-2xl font-bold font-mono tracking-tighter text-white group-hover:text-primary transition-colors leading-none">
            Ariel Aio
          </span>
          <span className="text-[10px] tracking-widest text-gray-400 uppercase font-sans group-hover:text-white transition-colors">
            Full Stack Developer
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              whileHover={{ 
                  scale: 1.1, 
                  color: '#ffffff',
                  y: -2,
                  z: 10
              }}
              whileTap={{ scale: 0.95, z: -5 }}
              className="text-gray-300 text-sm font-medium tracking-wide relative group py-2 transform-style-3d transition-colors"
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
          
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 hover:bg-white/10 hover:border-primary/50 transition-colors"
          >
             <Globe size={14} />
             <span className="font-mono">{language.toUpperCase()}</span>
          </motion.button>
        </div>

        {/* Mobile Toggle & Language */}
        <div className="md:hidden flex items-center gap-4">
           <motion.button
            onClick={toggleLanguage}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1 px-2 py-1 rounded border border-white/10 bg-white/5 text-xs text-gray-300"
          >
             <span className="font-mono">{language.toUpperCase()}</span>
          </motion.button>

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
});

export default Navbar;