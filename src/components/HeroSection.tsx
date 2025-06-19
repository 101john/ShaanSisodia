import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const beforeMoves = 'CRAFTING CODE THAT';
const moves = 'MOVES';

const HeroSection: React.FC = () => {
  const [bootSequence, setBootSequence] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing-main' | 'pause' | 'typing-moves' | 'wait-cursor' | 'show-rest'>('typing-main');
  const [showMoves, setShowMoves] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const [movesTyped, setMovesTyped] = useState('');

  useEffect(() => {
    const sequence = async () => {
      // Boot sequence
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

  // Typewriter effect for 'CRAFTING CODE THAT', pause, then type 'MOVES' faster, then show rest
  useEffect(() => {
    if (!showContent) return;

    const startTyping = async () => {
      // Start typing main text immediately after boot sequence
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
      }
    };

    startTyping();
  }, [showContent, phase]);

  // Handle subsequent phases
  useEffect(() => {
    if (phase === 'pause') {
      setTimeout(() => {
        setShowMoves(true);
        setPhase('typing-moves');
      }, 1000);
    } else if (phase === 'typing-moves') {
      let i = 0;
      const typeMoves = () => {
        if (i < moves.length) {
          setMovesTyped(moves.slice(0, i + 1));
          i++;
          setTimeout(typeMoves, 75);
        } else {
          setPhase('wait-cursor');
          setTimeout(() => setPhase('show-rest'), 500);
        }
      };
      typeMoves();
    } else if (phase === 'show-rest') {
      setShowRest(true);
    }
  }, [phase]);

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
          className="fixed inset-0 flex items-center justify-center bg-black z-20"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-cyan-500 text-sm tracking-wider">
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
                    className="absolute -inset-1 bg-cyan-500/10 blur-sm"
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
                className="inline-block ml-2 text-cyan-500"
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
          transition={{ duration: 1 }}
          className="text-center px-8 max-w-7xl mx-auto relative z-10"
        >
          <div className="mb-12">
            <h1 className="font-black leading-none tracking-tight text-5xl md:text-7xl lg:text-8xl relative inline-block" style={{lineHeight: 1.1}}>
              <span className="relative inline-block hero-gradient-static"
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundImage: 'linear-gradient(90deg, #F72585, #00ADB5)',
                  backgroundSize: '100% 100%',
                  backgroundPosition: '0% 0%'
                }}
              >
                {displayed}
              </span>
              {showMoves && (
                <span className="relative inline-block ml-2 hero-moves-gradient-seamless">{movesTyped}</span>
              )}
              <span className="typewriter-cursor text-cyan-500">{phase !== 'show-rest' && '|'}</span>
            </h1>
          </div>
          {showRest && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-16 font-light tracking-wide leading-relaxed">
                  Systems engineer. Visual architect. Code craftsman from the UK.
                  <br />
                  <span className="text-cyan-500 font-medium">Building digital experiences that breathe.</span>
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-[#F72585] mx-auto"
                />
              </motion.div>
              {/* Floating Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
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
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;