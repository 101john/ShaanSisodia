import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const fullText = 'CRAFTING CODE THAT MOVES';
const beforeMoves = 'CRAFTING CODE THAT';
const moves = 'MOVES';

const HeroSection: React.FC = () => {
  const [bootSequence, setBootSequence] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing-main' | 'pause' | 'typing-moves' | 'done'>('typing-main');
  const [gradientActive, setGradientActive] = useState(false);

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

  // Typewriter effect with pause and gradient trigger
  useEffect(() => {
    if (!showContent) return;
    if (phase === 'typing-main') {
      let i = 0;
      const type = () => {
        if (i < beforeMoves.length) {
          setDisplayed(beforeMoves.slice(0, i + 1));
          i++;
          setTimeout(type, 80);
        } else {
          setPhase('pause');
        }
      };
      type();
    } else if (phase === 'pause') {
      setTimeout(() => {
        setGradientActive(true);
        setTimeout(() => setPhase('typing-moves'), 700); // short hesitation
      }, 400);
    } else if (phase === 'typing-moves') {
      let i = 0;
      const type = () => {
        if (i < moves.length) {
          setDisplayed(beforeMoves + moves.slice(0, i + 1));
          i++;
          setTimeout(type, 60);
        } else {
          setPhase('done');
        }
      };
      type();
    }
  }, [showContent, phase]);

  const bootMessages = [
    'SYSTEM ONLINE.',
    'INITIALIZING INTERFACE...',
    'WELCOME TO THE EXPERIENCE.'
  ];

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center px-8 max-w-7xl mx-auto relative z-10"
        >
          <div className="mb-12">
            <h1 className="font-black leading-none tracking-tight text-5xl md:text-7xl lg:text-8xl relative inline-block" style={{lineHeight: 1.1}}>
              <span className={`relative inline-block hero-gradient-text ${gradientActive ? 'hero-gradient-animate' : ''}`}
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundImage: 'linear-gradient(90deg, #00ADB5, #F72585, #4ECDC4, #B5179E, #F77F00, #FCBF49, #00ADB5)',
                  transition: 'background-position 1.5s cubic-bezier(.68,-0.55,.27,1.55)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: gradientActive ? '100% 0%' : '0% 0%'
                }}
              >
                {displayed.length <= beforeMoves.length ? displayed : displayed.slice(0, beforeMoves.length)}
              </span>
              {displayed.length > beforeMoves.length && (
                <span className={`relative inline-block ml-2 hero-moves-gradient`}>{displayed.slice(beforeMoves.length)}</span>
              )}
              <span className="typewriter-cursor text-accent-primary">{phase !== 'done' && '|'}</span>
            </h1>
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
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="w-24 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto"
            />
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
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;