import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 800, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseEnterElement = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      
      if (target.matches('a, button, .interactive, [role="button"]')) {
        setIsHovering(true);
        setCursorVariant('link');
      } else if (target.matches('.magnetic')) {
        setIsHovering(true);
        setCursorVariant('magnetic');
      } else if (target.matches('.project-card')) {
        setIsHovering(true);
        setCursorVariant('project');
      } else if (target.matches('input, textarea')) {
        setIsHovering(true);
        setCursorVariant('text');
      }
    };

    const handleMouseLeaveElement = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      
      if (target.matches('a, button, .interactive, .magnetic, .project-card, input, textarea, [role="button"]')) {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseenter', handleMouseEnterElement, true);
    document.addEventListener('mouseleave', handleMouseLeaveElement, true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseenter', handleMouseEnterElement, true);
      document.removeEventListener('mouseleave', handleMouseLeaveElement, true);
    };
  }, [cursorX, cursorY]);

  const getCursorStyles = () => {
    const baseStyles = {
      width: 40,
      height: 40,
      borderRadius: '50%',
      pointerEvents: 'none' as const,
      zIndex: 9999,
      mixBlendMode: 'difference' as const,
    };

    switch (cursorVariant) {
      case 'link':
        return {
          ...baseStyles,
          width: 60,
          height: 60,
          backgroundColor: 'rgba(0, 173, 181, 0.15)',
          border: '2px solid #00ADB5',
          backdropFilter: 'blur(8px)',
        };
      case 'magnetic':
        return {
          ...baseStyles,
          width: 80,
          height: 80,
          backgroundColor: 'rgba(0, 173, 181, 0.08)',
          border: '2px solid rgba(0, 173, 181, 0.4)',
          backdropFilter: 'blur(12px)',
        };
      case 'project':
        return {
          ...baseStyles,
          width: 100,
          height: 100,
          backgroundColor: 'rgba(247, 37, 133, 0.1)',
          border: '2px solid #F72585',
          backdropFilter: 'blur(16px)',
        };
      case 'text':
        return {
          ...baseStyles,
          width: 2,
          height: 24,
          borderRadius: '1px',
          backgroundColor: '#00ADB5',
          border: 'none',
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(4px)',
        };
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        ...getCursorStyles(),
      }}
      animate={{
        scale: isClicking ? 0.7 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        mass: 0.2,
      }}
    >
      {/* Inner dot for default cursor */}
      {cursorVariant === 'default' && (
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent-primary rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: isClicking ? 2 : 1,
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            scale: { duration: 0.1 },
            opacity: { duration: 2, repeat: Infinity },
          }}
        />
      )}

      {/* Ripple effect for project cursor */}
      {cursorVariant === 'project' && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent-secondary/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Magnetic cursor particles */}
      {cursorVariant === 'magnetic' && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-primary rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                x: [0, Math.cos(i * 2.1) * 20, 0],
                y: [0, Math.sin(i * 2.1) * 20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default CustomCursor;