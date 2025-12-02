import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }: { project: any }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D Tilt Logic
  const mouseX = useTransform(x, [-0.5, 0.5], [10, -10]); // Rotate Y
  const mouseY = useTransform(y, [-0.5, 0.5], [-10, 10]); // Rotate X

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateY: mouseX,
        rotateX: mouseY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden bg-dark/50 border border-white/5 perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="pointer-events-none"
      >
         {/* Image Background */}
        <div className="aspect-video w-full overflow-hidden bg-white/5">
            <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width="800"
            height="450"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
            />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent opacity-80 md:opacity-60 transition-opacity duration-300 md:group-hover:opacity-90"></div>

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-auto">
            <h3 
              className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg"
            >
            {project.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {project.tags.map((tag: string) => (
                <span key={tag} className="text-xs font-mono px-2 py-1 bg-white/10 rounded-md text-gray-300 backdrop-blur-sm border border-white/5 shadow-sm">
                {tag}
                </span>
            ))}
            </div>

            <AnimatePresence>
            {(hovered || window.innerWidth < 768) && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
                >
                <p className="text-gray-300 text-sm mb-4 line-clamp-3 transform translate-z-10">
                    {project.description}
                </p>
                <div className="flex gap-4">
                    <motion.a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-white text-sm font-bold hover:text-primary transition-colors cursor-pointer"
                    >
                        <ExternalLink size={16} /> Live Demo
                    </motion.a>
                    {project.githubRepo && (
                        <motion.a 
                            href={project.githubRepo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-white text-sm font-bold hover:text-primary transition-colors cursor-pointer"
                        >
                            <Github size={16} /> Code
                        </motion.a>
                    )}
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-transparent relative z-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-left"
        >
           <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Portfólio</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Projetos Recentes</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;