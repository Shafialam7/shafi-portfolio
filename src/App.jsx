import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import DevApiSandbox from './components/DevApiSandbox';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import Projects from './components/Projects';
import ClientImpact from './components/ClientImpact';
import PoeticQuote from './components/PoeticQuote';
import Services from './components/Services';
import Contact from './components/Contact';

import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import SpotlightOverlay from './components/SpotlightOverlay';
import ParticleBackground from './components/ParticleBackground';
import ProjectModal from './components/ProjectModal';
import CommandPalette from './components/CommandPalette';
import DevTerminalDrawer from './components/DevTerminalDrawer';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    // Enforce Warm White Canvas
    document.documentElement.classList.remove('dark');

    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fafcfb] text-[#0f172a] flex flex-col transition-colors duration-400 overflow-x-hidden font-sans">
      {/* Dynamic Animated Particle Canvas Constellation */}
      <ParticleBackground />

      {/* Ambient Warm White Multi-Color Wallpaper Mesh */}
      <div className="warm-mesh-bg" />

      {/* Interactive Cursor Spotlight Beam */}
      <SpotlightOverlay />

      {/* Floating Pill Navbar */}
      <Navbar onOpenPalette={() => setIsPaletteOpen(true)} />

      {/* Main Workstation Sections */}
      <main className="flex-grow relative z-10">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        <About />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        <Skills />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        <ArchitectureDiagram />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        <DevApiSandbox />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        <ClientImpact />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        {/* Client-Attracting Poetic Quote Banner */}
        <PoeticQuote />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        <Services />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200" />
        </div>

        <Contact />

      </main>

      {/* Footer */}
      <Footer />
      <AIChatbot />

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Developer Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Floating Interactive CLI Terminal Drawer with Shafi AI Assistant */}
      <DevTerminalDrawer
        isOpen={isTerminalOpen}
        setIsOpen={setIsTerminalOpen}
      />
    </div>
  );
}

export default App;
