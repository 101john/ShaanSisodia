import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

const TechCubes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cubes, setCubes] = useState<Array<{ id: number; x: number; y: number; tech: TechItem }>>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const technologies: TechItem[] = [
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', color: '#3178C6' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python', color: '#3776AB' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react', color: '#61DAFB' },
    { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus', color: '#00599C' },
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', color: '#000000' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', color: '#336791' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', color: '#2496ED' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git', color: '#F05032' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Generate fewer cubes with better spacing
    const newCubes = technologies.slice(0, 6).map((tech, index) => ({
      id: index,
      x: Math.random() * (rect.width - 100) + 50,
      y: Math.random() * (rect.height - 100) + 50,
      tech
    }));
    
    setCubes(newCubes);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {cubes.map((cube, index) => (
        <motion.div
          key={cube.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: cube.x,
            top: cube.y,
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -15, 15, 0],
            rotateX: [0, 360],
            rotateY: [0, -360],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
          whileHover={{
            scale: 1.2,
            rotateZ: 45,
            transition: { duration: 0.3 }
          }}
        >
          {/* 3D Cube */}
          <motion.div
            className="relative w-16 h-16 transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
            }}
            transition={{
              duration: 12 + index,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Cube faces */}
            {[
              { transform: 'rotateY(0deg) translateZ(32px)', bg: 'front' },
              { transform: 'rotateY(180deg) translateZ(32px)', bg: 'back' },
              { transform: 'rotateY(90deg) translateZ(32px)', bg: 'right' },
              { transform: 'rotateY(-90deg) translateZ(32px)', bg: 'left' },
              { transform: 'rotateX(90deg) translateZ(32px)', bg: 'top' },
              { transform: 'rotateX(-90deg) translateZ(32px)', bg: 'bottom' },
            ].map((face, faceIndex) => (
              <div
                key={faceIndex}
                className="absolute w-16 h-16 border border-gray-600/30 flex items-center justify-center"
                style={{
                  transform: face.transform,
                  backgroundColor: `${cube.tech.color}15`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {faceIndex === 0 && ( // Only show icon on front face
                  <img
                    src={cube.tech.icon}
                    alt={cube.tech.name}
                    className="w-8 h-8 object-contain"
                    style={{ 
                      filter: cube.tech.name === 'Next.js' ? 'invert(1)' : 'none' 
                    }}
                  />
                )}
              </div>
            ))}
          </motion.div>
          
          {/* Tech name label */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-gray-400 whitespace-nowrap opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {cube.tech.name}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechCubes;