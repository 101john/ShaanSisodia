import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const animateCursor = () => {
      // Smooth interpolation for buttery movement
      const lerp = 0.15;
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerp;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerp;

      if (cursorRef.current) {
        const { x, y } = positionRef.current;
        cursorRef.current.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as Element;
      // More specific targeting to avoid glitches
      if (target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.hasAttribute('role') && target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive') ||
        target.closest('button, a, [role="button"], .interactive')
      )) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as Element;
      const relatedTarget = (e as MouseEvent).relatedTarget as Element;
      
      // Only set hovering to false if we're actually leaving the interactive element
      if (target && !relatedTarget?.closest('button, a, [role="button"], .interactive')) {
        setIsHovering(false);
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

    rafRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseOut);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50"
        style={{
          width: '24px',
          height: '24px',
          transform: `scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
          transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Outer ring for contrast */}
        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
          {/* Inner dot */}
          <div
            className="w-3 h-3 rounded-full transition-all duration-200"
            style={{
              backgroundColor: isHovering ? '#06b6d4' : '#22d3ee',
              boxShadow: isHovering ? '0 0 10px #06b6d4' : '0 0 5px #22d3ee',
            }}
          />
        </div>
      </div>

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-40"
          style={{
            left: positionRef.current.x - 12,
            top: positionRef.current.y - 12,
            width: '24px',
            height: '24px',
            animation: 'clickRipple 0.4s ease-out forwards',
          }}
        >
          <div className="w-6 h-6 border-2 border-cyan-400 rounded-full" />
        </div>
      )}

      <style jsx>{`
        @keyframes clickRipple {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;