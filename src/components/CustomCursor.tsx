import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Use motion values for smooth tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring configuration for smooth following
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as Element;
      if (target?.matches?.('button, a, .interactive, input, textarea')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as Element;
      if (target?.matches?.('button, a, .interactive, input, textarea')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseOut = () => setIsVisible(false);

    // Add event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main blob cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 1.8 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.3
          }
        }}
      >
        {/* Outer blob with morphing animation */}
        <motion.div
          className="relative w-8 h-8"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {/* Main blob shape */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 rounded-full"
            animate={{
              borderRadius: [
                "50% 50% 50% 50%",
                "60% 40% 60% 40%", 
                "40% 60% 40% 60%",
                "50% 50% 50% 50%"
              ],
              scale: isHovering ? [1, 1.1, 1] : [1, 1.05, 1],
            }}
            transition={{
              borderRadius: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
          
          {/* Inner glow */}
          <motion.div
            className="absolute inset-1 bg-white/30 rounded-full blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Sparkle effects when hovering */}
          {isHovering && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 20],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 20],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing particles */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-16 h-16 border border-cyan-400/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -360],
            borderRadius: [
              "50% 50% 50% 50%",
              "45% 55% 45% 55%",
              "55% 45% 55% 45%",
              "50% 50% 50% 50%"
            ],
          }}
          transition={{
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            },
            borderRadius: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Inner pulse ring */}
        <motion.div
          className="absolute inset-2 border border-purple-400/30 rounded-full"
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-30"
          style={{
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-8 h-8 border-2 border-cyan-400 rounded-full" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;