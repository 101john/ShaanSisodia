import React from 'react';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TechStack from './components/TechStack';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import TerminalOverlay from './components/TerminalOverlay';

function App() {
  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      <TerminalOverlay />
      
      <main>
        <HeroSection />
        <AboutSection />
        <TechStack />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;