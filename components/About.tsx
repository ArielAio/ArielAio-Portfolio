import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT } from '../constants';
import { useLanguage } from '../LanguageContext';

const About: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const content = ABOUT_CONTENT[language];

  return (
    <section id="about" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-card p-8 rounded-2xl hover:bg-white/5 border border-white/5 hover:border-white/20 transition-colors group cursor-default"
            >
              <motion.div 
                className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <service.icon size={28} />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default About;