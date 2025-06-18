import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [bootSequence, setBootSequence] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setBootSequence(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBootSequence(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBootSequence(3);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setShowContent(true);
    };
    sequence();
  }, []);

  const bootMessages = [
    'SYSTEM ONLINE.',
    'INITIALIZING INTERFACE...',
    'WELCOME TO THE EXPERIENCE.'
  ];

  const titleWords = ['CRAFTING', 'CODE', 'THAT', 'MOVES'];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Boot Sequence */}
      {!showContent && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-dark-bg z-20"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-accent-primary text-sm tracking-wider">
            {bootMessages.slice(0, bootSequence).map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-3 relative"
              >
                <span className="relative">
                  {message}
                  <motion.div
                    className="absolute -inset-1 bg-accent-primary/10 blur-sm"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </motion.div>
            ))}
            {bootSequence > 0 && bootSequence < 4 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-2 text-accent-primary"
              >
                █
              </motion.span>
            )}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      {showContent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center px-8 max-w-7xl mx-auto relative z-10"
          >
            <div className="mb-12">
              {titleWords.map((word, index) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="inline-block mr-6 md:mr-8 mb-4"
                >
                  <span className={`text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight ${
                    word === 'MOVES' ? 'text-accent-primary' : 'text-text-primary'
                  }`}>
                    {word === 'MOVES' ? (
                      <motion.span
                        animate={{
                          textShadow: [
                            '0 0 0px rgba(0,173,181,0)',
                            '0 0 20px rgba(0,173,181,0.5)',
                            '0 0 0px rgba(0,173,181,0)'
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {word}
                      </motion.span>
                    ) : (
                      word
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="relative"
            >
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-16 font-light tracking-wide leading-relaxed">
                Systems engineer. Visual architect. Code craftsman from the UK.
                <br />
                <span className="text-accent-primary font-medium">Building digital experiences that breathe.</span>
              </p>
              
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 2.2 }}
                className="w-24 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto"
              />
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent-primary/30 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${25 + i * 8}%`,
                }}
                animate={{
                  y: [-30, 30, -30],
                  opacity: [0.1, 0.6, 0.1],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;