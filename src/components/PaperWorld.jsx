import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import CharacterCanvas from './CharacterCanvas';
import OpeningLoader from './OpeningLoader';
import HeroOverlay from './HeroOverlay';
import ProjectsWorld from './ProjectsWorld';
import ArchitectureWorld from './ArchitectureWorld';
import TechStackWorld from './TechStackWorld';
import TimelineWorld from './TimelineWorld';
import FinalWaveWorld from './FinalWaveWorld';
import FloatingNav from './FloatingNav';
import ProjectModal from './ProjectModal';
import CustomCursor from './CustomCursor';
import { soundManager } from '../services/SoundManager';
import { frameManager } from '../services/CharacterFrameManager';

export default function PaperWorld() {
  const [progress, setProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const progressRef = useRef(0);
  const lenisRef = useRef(null);
  const lastPRef = useRef(0);

  // Initialize Assets & Lenis Scroll Engine
  useEffect(() => {
    // 1. Start frame manager preloading
    frameManager.preloadInitial();

    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5
    });

    lenisRef.current = lenis;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, scrollY / maxScroll));

      progressRef.current = p;
      setProgress(p);

      // Trigger tactile audio cues during major scene transitions
      const prevP = lastPRef.current;
      if (
        (prevP < 0.25 && p >= 0.25) || // Landing 1
        (prevP < 0.58 && p >= 0.58) || // Landing 2
        (prevP < 0.90 && p >= 0.90)    // Landing 3
      ) {
        soundManager.playImpact();
      }

      // Paper rustle on movement
      if (Math.abs(p - prevP) > 0.015) {
        soundManager.playPaperRustle();
      }

      lastPRef.current = p;
    };

    lenis.on('scroll', onScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Initial check
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Smooth programmatic scroll to progress target (0 to 1)
  const handleNavigate = (targetProgress) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const targetScrollY = targetProgress * maxScroll;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScrollY, { duration: 1.4 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '850vh' }}>
      {/* Paper grain overlay */}
      <div className="paper-grain-overlay" />

      {/* Architectural Coordinate Grid */}
      <div className="architectural-grid" />

      {/* Custom Crosshair Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <FloatingNav progress={progress} onNavigate={handleNavigate} />

      {/* Hardware-Accelerated Continuous Character Canvas */}
      <CharacterCanvas progressRef={progressRef} />

      {/* Scene 1: Opening / Loading Experience */}
      <OpeningLoader progress={progress} onEnterWorld={() => handleNavigate(0.12)} />

      {/* Scene 2: Hero Composition */}
      <HeroOverlay progress={progress} />

      {/* Scene 3: Projects World Gallery Walk */}
      <ProjectsWorld progress={progress} onSelectProject={(p) => setSelectedProject(p)} />

      {/* Scene 4: Backend Architecture Visualization */}
      <ArchitectureWorld progress={progress} />

      {/* Scene 5: Tech Stack Monoliths (Opposite Journey Walk) */}
      <TechStackWorld progress={progress} />

      {/* Scene 6: Continuous Drawn Timeline World */}
      <TimelineWorld progress={progress} />

      {/* Scene 7: Final Landing & Waving Character */}
      <FinalWaveWorld progress={progress} />

      {/* Interactive Project Architecture Dossier Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
