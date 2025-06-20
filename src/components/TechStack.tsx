import React from 'react';
import { motion } from 'framer-motion';

const TechStack: React.FC = () => {
  const techCategories = [
    {
      title: 'Languages',
      items: [
        { name: 'TypeScript', level: 90, description: 'The only way to write JavaScript' },
        { name: 'Python', level: 95, description: 'My go-to for complex systems' },
        { name: 'C++', level: 91, description: 'When performance matters' },
        { name: 'C', level: 87, description: 'Close to the metal' },
        { name: 'Assembly', level: 75, description: 'OS development' },
      ]
    },
    {
      title: 'Frameworks & Tools',
      items: [
        { name: 'React + Next.js', level: 92, description: 'Modern web development' },
        { name: 'TailwindCSS + Framer Motion', level: 88, description: 'Design & animation' },
        { name: 'PostgreSQL + Supabase', level: 85, description: 'Database architecture' },
        { name: 'Docker, Git, Linux', level: 89, description: 'Development workflow' },
      ]
    }
  ];

  return (
    <section id="tech" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              viewport={{ once: true }}
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
                    viewport={{ once: true }}
                    transition={{ delay: (categoryIndex * 0.2) + (index * 0.1), duration: 0.6 }}
                    whileHover={{ x: 10 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors duration-200">
                        {item.name}
                      </h4>
                      <span className="text-sm font-mono text-cyan-400">
                        {item.level}%
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                    
                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: (categoryIndex * 0.2) + (index * 0.1) + 0.3, 
                          duration: 1,
                          ease: "easeOut"
                        }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full relative"
                      >
                        <motion.div
                          animate={{ x: [-10, 10, -10] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </motion.div>
                    </div>
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
          viewport={{ once: true }}
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
                viewport={{ once: true }}
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