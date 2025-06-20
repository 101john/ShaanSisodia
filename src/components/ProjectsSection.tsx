import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'os',
      title: 'Custom Operating System',
      description: 'Built from scratch using C and Assembly',
      longDescription: 'A complete operating system implementation featuring memory management, process scheduling, and basic I/O operations. Implements core OS concepts including virtual memory, interrupt handling, and system calls. Written entirely in C and Assembly for x86 architecture.',
      tech: ['C', 'Assembly', 'Low-level programming', 'x86 Architecture'],
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
      status: 'completed'
    },
    {
      id: 'civsim',
      title: 'CivSim - Civilization Simulator',
      description: 'Real-time simulation with AI-generated lore',
      longDescription: 'A complex civilization simulation featuring dynamic population growth, resource management, and diplomatic systems. Integrates OpenAI GPT for procedural lore generation and storytelling. Includes advanced algorithms for trade routes, cultural evolution, and technological progression.',
      tech: ['Python', 'Pygame', 'NumPy', 'OpenAI API', 'AI Integration'],
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
      status: 'completed'
    },
    {
      id: 'dailyglitch',
      title: 'Daily Glitch',
      description: 'Full-stack mystery story platform',
      longDescription: 'A sophisticated web platform for interactive mystery stories with custom CMS capabilities. Features real-time story progression, user engagement tracking, and dynamic content delivery. Built with modern web technologies and deployed with full CI/CD pipeline.',
      tech: ['React', 'Next.js', 'Supabase', 'TailwindCSS', 'TypeScript'],
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
      live: 'https://dailyglitch.org',
      status: 'completed'
    },
    {
      id: 'ardenvale',
      title: 'Ardenvale RPG',
      description: 'Text-based Dark Souls-inspired RPG',
      longDescription: 'A complex text-based RPG featuring intricate combat mechanics, character progression, and rich ASCII art. Implements advanced game state management, save/load systems, and procedural content generation. Inspired by Dark Souls difficulty and atmosphere.',
      tech: ['Python', 'Object-oriented Design', 'Game Logic', 'ASCII Art'],
      image: 'https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400/30';
      case 'in-progress': return 'text-yellow-400 border-yellow-400/30';
      case 'planned': return 'text-blue-400 border-blue-400/30';
    }
  };

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="text-gray-100">Selected</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Systems and applications that demonstrate technical depth and creative problem-solving
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer interactive"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono border ${getStatusColor(project.status)} bg-gray-900/80 backdrop-blur-sm`}>
                    {project.status.replace('-', ' ')}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-cyan-400 text-sm font-medium"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="relative max-w-4xl w-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-300" />
                </button>

                {/* Modal Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" />
                  </div>
                  
                  <div className="p-8">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono border ${getStatusColor(selectedProject.status)} bg-gray-800 mb-4`}>
                      {selectedProject.status.replace('-', ' ')}
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-100 mb-4">
                      {selectedProject.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-100 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      {selectedProject.github && (
                        <motion.a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          View Code
                        </motion.a>
                      )}
                      
                      {selectedProject.live && (
                        <motion.a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
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