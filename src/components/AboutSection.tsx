import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const textRevealVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const title = "My Approach";

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-8 relative">
      {/* Transition Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]) }}
      />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left Side - Enhanced Profile */}
          <motion.div 
            style={{ y, opacity, scale }}
            className="relative group"
          >
            <div className="relative w-80 h-96 mx-auto lg:mx-0 overflow-hidden rounded-3xl bg-gradient-to-br from-dark-surface to-dark-bg border border-dark-border group-hover:border-accent-primary/30 transition-all duration-700">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5"
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(0,173,181,0.05) 0%, rgba(247,37,133,0.05) 100%)",
                    "linear-gradient(225deg, rgba(247,37,133,0.05) 0%, rgba(0,173,181,0.05) 100%)",
                    "linear-gradient(135deg, rgba(0,173,181,0.05) 0%, rgba(247,37,133,0.05) 100%)",
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Profile content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full border-2 border-accent-primary/40 flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05, borderColor: "rgba(0,173,181,0.8)" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-4xl font-bold text-accent-primary z-10">SS</span>
                  
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent border-t-accent-primary/60 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
              
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/10 to-transparent"
                animate={{
                  x: [-100, 400],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-accent-primary/30" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent-primary/30" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-accent-primary/30" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-accent-primary/30" />
            </div>
          </motion.div>

          {/* Right Side - Enhanced Content */}
          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <motion.h2 
                variants={textRevealVariants}
                className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              >
                {title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className={char === ' ' ? 'mr-4' : (index >= 3 ? 'text-accent-primary' : 'text-text-primary')}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-32 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full origin-left"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <motion.p 
                className="text-lg text-text-secondary leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                I build systems, not screens. Every interface should breathe. 
                Every interaction should feel <span className="text-accent-primary font-semibold">inevitable</span>.
              </motion.p>
              
              <motion.p 
                className="text-lg text-text-secondary leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                With expertise spanning <span className="text-accent-primary font-semibold">TypeScript</span>, 
                <span className="text-accent-primary font-semibold"> Python</span>, and 
                <span className="text-accent-primary font-semibold"> C++</span>, I architect 
                solutions that scale from conception to production.
              </motion.p>

              <motion.blockquote
                variants={itemVariants}
                className="relative border-l-4 border-accent-primary/40 pl-8 py-6 my-10 bg-dark-surface/30 rounded-r-xl"
              >
                <motion.p 
                  className="text-xl italic text-text-primary font-light leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  "Function without soul is noise."
                </motion.p>
                
                <motion.div
                  className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-accent-primary rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-accent-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.blockquote>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8">
              <motion.h3 
                className="text-xl font-semibold mb-6 text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Currently mastering
              </motion.h3>
              <div className="flex flex-wrap gap-4">
                {['Docker', 'PostgreSQL', 'Git', 'CMake'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -4,
                      boxShadow: "0 10px 25px rgba(0,173,181,0.2)"
                    }}
                    className="px-5 py-3 bg-dark-surface border border-accent-primary/20 rounded-full text-sm font-medium text-accent-primary hover:border-accent-primary/60 hover:bg-accent-primary/5 transition-all duration-300 cursor-default relative overflow-hidden group"
                  >
                    <span className="relative z-10">{tech}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;