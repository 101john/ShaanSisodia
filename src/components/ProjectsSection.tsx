import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import Particles from './Particles';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  theme: 'neural' | 'system' | 'crypto' | 'visual';
}

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [selectedProject]);

  const projects: Project[] = [
    {
      id: 'hypnos',
      title: 'HYPNOS',
      subtitle: 'Neural Interface Design',
      description: 'An experimental interface that responds to user behavior patterns, creating adaptive layouts that evolve with interaction. Built with real-time data processing and machine learning algorithms.',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
      tech: ['TypeScript', 'WebGL', 'TensorFlow.js'],
      link: '#',
      theme: 'neural',
    },
    {
      id: 'nexus',
      title: 'NEXUS',
      subtitle: 'Distributed System Architecture',
      description: 'A high-performance distributed system for real-time data synchronization across multiple nodes. Handles millions of operations per second with sub-millisecond latency.',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
      tech: ['C++', 'Docker', 'PostgreSQL'],
      link: '#',
      theme: 'system',
    },
    {
      id: 'cipher',
      title: 'CIPHER',
      subtitle: 'Cryptographic Protocol Suite',
      description: 'Advanced encryption protocols with quantum-resistant algorithms. Provides end-to-end security with minimal performance overhead.',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
      tech: ['Python', 'C', 'CMake'],
      link: '#',
      theme: 'crypto',
    },
    {
      id: 'aurora',
      title: 'AURORA',
      subtitle: 'Visual Computing Engine',
      description: 'Real-time rendering engine with advanced lighting and particle systems. Optimized for both performance and visual fidelity.',
      image: 'https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg',
      tech: ['C++', 'OpenGL', 'GLSL'],
      link: '#',
      theme: 'visual',
    },
  ];

  const getThemeColors = (theme: Project['theme']) => {
    switch (theme) {
      case 'neural':
        return {
          primary: '#00ADB5',
          secondary: '#4ECDC4',
          particles: ['#00ADB5', '#4ECDC4', '#ffffff'],
        };
      case 'system':
        return {
          primary: '#F72585',
          secondary: '#B5179E',
          particles: ['#F72585', '#B5179E', '#ffffff'],
        };
      case 'crypto':
        return {
          primary: '#7209B7',
          secondary: '#A663CC',
          particles: ['#7209B7', '#A663CC', '#ffffff'],
        };
      case 'visual':
        return {
          primary: '#F77F00',
          secondary: '#FCBF49',
          particles: ['#F77F00', '#FCBF49', '#ffffff'],
        };
    }
  };

  return (
    <section className="py-32 px-8 relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-30">
        <Particles
          particleCount={100}
          particleSpread={12}
          speed={0.03}
          particleColors={['#00ADB5', '#F72585', '#ffffff']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.3}
          alphaParticles={true}
          particleBaseSize={60}
          sizeRandomness={0.6}
          cameraDistance={18}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Selected <span className="text-accent-primary">Works</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Carefully crafted digital experiences that push the boundaries of what's possible
          </motion.p>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto mt-8"
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => {
            const themeColors = getThemeColors(project.theme);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -20,
                  rotateX: 5,
                  rotateY: index % 2 === 0 ? 5 : -5,
                  transition: { duration: 0.4 }
                }}
                className="group cursor-pointer magnetic project-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-3xl bg-dark-surface/80 backdrop-blur-sm border border-dark-border hover:border-accent-primary/40 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-accent-primary/10">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Dynamic overlay based on theme */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.secondary}20)`
                      }}
                    />
                    
                    {/* Animated scan lines */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30"
                      style={{
                        background: `repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          ${themeColors.primary}10 2px,
                          ${themeColors.primary}10 4px
                        )`
                      }}
                      animate={{
                        x: [-100, 100],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    
                    {/* Hover indicator */}
                    <motion.div
                      className="absolute top-6 right-6 w-12 h-12 bg-dark-bg/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 border border-accent-primary/30"
                      initial={{ scale: 0, rotate: -180 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ExternalLink className="w-5 h-5 text-accent-primary" />
                    </motion.div>

                    {/* Corner brackets */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent-primary/0 group-hover:border-accent-primary/60 transition-colors duration-500" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent-primary/0 group-hover:border-accent-primary/60 transition-colors duration-500" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent-primary/0 group-hover:border-accent-primary/60 transition-colors duration-500" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent-primary/0 group-hover:border-accent-primary/60 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <motion.h3 
                      className="text-2xl font-bold mb-3 text-text-primary group-hover:text-accent-primary transition-colors duration-400"
                      whileHover={{ x: 5 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-text-secondary mb-6 font-light leading-relaxed"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.subtitle}
                    </motion.p>
                    
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-4 py-2 text-xs font-medium bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20 hover:border-accent-primary/40 hover:bg-accent-primary/20 transition-all duration-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-3xl"
                    whileHover={{ 
                      borderColor: themeColors.primary + '40',
                      boxShadow: `0 0 30px ${themeColors.primary}20`
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark-bg/95 backdrop-blur-2xl z-[9999] flex items-center justify-center p-8"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: -15 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: -15 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                className="relative max-w-5xl w-full bg-dark-surface/90 backdrop-blur-sm border border-dark-border rounded-3xl overflow-hidden z-[10000]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-8 right-8 w-12 h-12 bg-dark-bg/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent-primary/20 transition-colors z-[10001] border border-accent-primary/20"
                >
                  <X className="w-6 h-6 text-text-primary" />
                </motion.button>

                {/* Modal content */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-80 lg:h-full">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10" />
                    
                    {/* Animated overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/5 to-transparent"
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  
                  <div className="p-12 lg:p-16">
                    <motion.h3 
                      className="text-4xl font-bold mb-4 text-text-primary"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedProject.title}
                    </motion.h3>
                    <motion.p 
                      className="text-accent-primary mb-8 font-medium text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedProject.subtitle}
                    </motion.p>
                    <motion.p 
                      className="text-text-secondary mb-10 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {selectedProject.description}
                    </motion.p>
                    
                    <motion.div 
                      className="flex flex-wrap gap-3 mb-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {selectedProject.tech.map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="px-5 py-3 bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20 font-medium"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,173,181,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="magnetic inline-flex items-center gap-3 px-8 py-4 bg-accent-primary text-dark-bg font-semibold rounded-full hover:bg-accent-primary/90 transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10">View Project</span>
                      <ExternalLink className="w-5 h-5 relative z-10" />
                      
                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;