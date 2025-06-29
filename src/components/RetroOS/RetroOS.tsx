import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BootSequence } from './BootSequence';
import { TerminalCore } from './TerminalCore';
import { FileSystem } from './FileSystem';
import { GameEngine } from './GameEngine';
import { SoundSystem } from './SoundSystem';
import { ThemeManager } from './ThemeManager';

interface RetroOSProps {
  isActive: boolean;
  onExit: () => void;
}

export const RetroOS: React.FC<RetroOSProps> = ({ isActive, onExit }) => {
  const [bootComplete, setBootComplete] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('matrix');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      // Enter fullscreen mode for immersive experience
      if (containerRef.current && !isFullscreen) {
        containerRef.current.requestFullscreen?.();
        setIsFullscreen(true);
      }
    }
  }, [isActive, isFullscreen]);

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  const handleExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
    onExit();
  };

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      style={{ fontFamily: 'monospace' }}
    >
      {/* Sound System */}
      <SoundSystem enabled={soundEnabled} />
      
      {/* Theme Manager */}
      <ThemeManager 
        theme={currentTheme} 
        onThemeChange={setCurrentTheme}
      />

      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <BootSequence
            key="boot"
            onComplete={handleBootComplete}
            theme={currentTheme}
            soundEnabled={soundEnabled}
          />
        ) : (
          <TerminalCore
            key="terminal"
            theme={currentTheme}
            soundEnabled={soundEnabled}
            onExit={handleExit}
            onThemeChange={setCurrentTheme}
            onSoundToggle={setSoundEnabled}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};