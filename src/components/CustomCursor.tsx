import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Ultra-smooth motion values with optimized spring
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Buttery smooth spring config
  const springConfig = { damping: 30, stiffness: 800, mass: 0.1 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId: number;
    
    const updateCursorPosition = (e: MouseEvent) => {
      // Use RAF for smooth updates
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        setIsVisible(true);
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as Element;
      if (target && typeof target.closest === 'function') {
        if (target.closest('button, a, .interactive, input, textarea, [role="button"]')) {
          setIsHovering(true);
        }
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as Element;
      if (target && typeof target.closest === 'function') {
        if (target.closest('button, a, .interactive, input, textarea, [role="button"]')) {
          setIsHovering(false);
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseOut = () => setIsVisible(false);

    document.addEventListener('mousemove', updateCursorPosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
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
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 600,
            damping: 25,
            mass: 0.1
          }
        }}
      >
        {/* Main blob */}
        <motion.div
          className="w-6 h-6 bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 rounded-full relative"
          animate={{
            borderRadius: [
              "50% 50% 50% 50%",
              "60% 40% 60% 40%", 
              "40% 60% 40% 60%",
              "50% 50% 50% 50%"
            ],
          }}
          transition={{
            borderRadius: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* Inner glow */}
          <motion.div
            className="absolute inset-0.5 bg-white/40 rounded-full blur-sm"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        <motion.div
          className="w-8 h-8 border border-cyan-400/30 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      </motion.div>

      {/* Click ripple */}
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
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-6 h-6 border-2 border-cyan-400 rounded-full" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;