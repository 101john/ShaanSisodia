import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Smooth spring config
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId: number;
    
    const updateCursorPosition = (e: MouseEvent) => {
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
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.2
          }
        }}
      >
        {/* Outer ring for contrast */}
        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
          {/* Inner dot */}
          <motion.div
            className="w-3 h-3 bg-cyan-400 rounded-full"
            animate={{
              backgroundColor: isHovering ? '#06b6d4' : '#22d3ee',
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-40"
          style={{
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-6 h-6 border-2 border-cyan-400 rounded-full" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;