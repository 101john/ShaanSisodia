import React from 'react';
import { motion } from 'framer-motion';
import TechCubes from './TechCubes';

const TechStack: React.FC = () => {
  const techCategories = [
    {
      title: 'Languages',
      items: [
        { name: 'TypeScript', description: 'The only way to write JavaScript', icon: 'https://cdn.simpleicons.org/typescript' },
        { name: 'Python', description: 'My go-to for complex systems', icon: 'https://cdn.simpleicons.org/python' },
        { name: 'C++', description: 'When performance matters', icon: 'https://cdn.simpleicons.org/cplusplus' },
        { name: 'C', description: 'Close to the metal', icon: 'https://cdn.simpleicons.org/c' },
        { name: 'Assembly', description: 'OS development', icon: 'https://cdn.simpleicons.org/assemblyscript' },
      ]
    },
    {
      title: 'Frameworks & Tools',
      items: [
        { name: 'React + Next.js', description: 'Modern web development', icon: 'https://cdn.simpleicons.org/react' },
        { name: 'TailwindCSS', description: 'Design & styling', icon: 'https://cdn.simpleicons.org/tailwindcss' },
        { name: 'PostgreSQL + Supabase', description: 'Database architecture', icon: 'https://cdn.simpleicons.org/postgresql' },
        { name: 'Docker, Git, Linux', description: 'Development workflow', icon: 'https://cdn.simpleicons.org/docker' },
      ]
    }
  ];

  return (
    <section id="tech" className="py-32 px-6 relative overflow-hidden">
      {/* Tech Cubes Background */}
      <TechCubes />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tools and technologies I use to build systems that scale
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-gray-100 mb-8">{category.title}</h3>
              
              <div className="space-y-6">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: (categoryIndex * 0.2) + (index * 0.1), duration: 0.6 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="group p-6 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-8 h-8 mr-4 object-contain"
                        style={{ filter: item.name.includes('Next.js') ? 'invert(1)' : 'none' }}
                      />
                      <h4 className="text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors duration-200">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-400 ml-12">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-100 mb-8">Currently Exploring</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Rust', 'WebAssembly', 'Kubernetes', 'Machine Learning'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-cyan-400 rounded-full border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;