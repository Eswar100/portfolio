import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import CharacterCanvas from './CharacterCanvas';
import OpeningLoader from './OpeningLoader';
import HeroOverlay from './HeroOverlay';
import FallSpaceTransition from './FallSpaceTransition';
import ProjectsWorld from './ProjectsWorld';
import TechStackWorld from './TechStackWorld';
import FinalWaveWorld from './FinalWaveWorld';
import FloatingNav from './FloatingNav';
import ProjectModal from './ProjectModal';
import CustomCursor from './CustomCursor';
import { soundManager } from '../services/SoundManager';
import { frameManager } from '../services/CharacterFrameManager';

/**
 * PaperWorld
 * Master Cinematic Conductor for Eswar's Hand-Drawn Continuous Portfolio Journey.
 * 
 * Journey Sequence:
 * 1. LOADING (Zoomed camera, "INITIALIZED.", camera pull-back)
 * 2. HERO ("LET'S BUILD SOMETHING.", Developer positioning, links)
 * 3. FALL TRANSITION 1 (Hero -> Projects: Asteroid & Satellite sketch space)
 * 4. PROJECT WALL (Physical architectural stone gallery, real project screenshots)
 * 5. FALL TRANSITION 2 (Projects -> Tech Stack: Asteroid belt descent)
 * 6. TECH STACK WALL (Physical architectural wall, actual tech logos)
 * 7. FALL TRANSITION 3 (Tech Stack -> Final: Deep space descent)
 * 8. FINAL / CONTACT ("Thanks for visiting!", WebM-ready character slot, links, Colophon)
 */

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

      // Trigger tactile audio cues during major landings onto gallery floors
      const prevP = lastPRef.current;
      if (
        (prevP < 0.25 && p >= 0.25) || // Landing 1: Project Gallery Floor
        (prevP < 0.58 && p >= 0.58) || // Landing 2: Tech Stack Gallery Floor
        (prevP < 0.91 && p >= 0.91)    // Landing 3: Final Base Platform
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

  // Lock background Lenis scroll engine whenever Project Modal is open
  useEffect(() => {
    if (selectedProject) {
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    } else {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    }
  }, [selectedProject]);

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
    <div style={{ position: 'relative', width: '100%', minHeight: '800vh' }}>
      {/* Paper grain overlay */}
      <div className="paper-grain-overlay" />

      {/* Architectural Coordinate Grid */}
      <div className="architectural-grid" />

      {/* Custom Crosshair Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <FloatingNav progress={progress} onNavigate={handleNavigate} />

      {/* Hardware-Accelerated Continuous Character Canvas (zIndex: 25 - Foreground above walls) */}
      <CharacterCanvas progressRef={progressRef} />

      {/* Scene 1: Opening / Loading Experience */}
      <OpeningLoader progress={progress} onEnterWorld={() => handleNavigate(0.10)} />

      {/* Scene 2: Hero Composition */}
      <HeroOverlay progress={progress} />

      {/* Transition 1: First Fall & Space Journey (Hero -> Project Wall) */}
      <FallSpaceTransition
        progress={progress}
        startProgress={0.18}
        endProgress={0.28}
        variant="hero-to-projects"
      />

      {/* Scene 3: Projects World Gallery Wall (Data-Driven, Physical Masonry Wall) */}
      <ProjectsWorld progress={progress} onSelectProject={(p) => setSelectedProject(p)} />

      {/* Transition 2: Second Fall & Space Journey (Projects -> Tech Stack) */}
      <FallSpaceTransition
        progress={progress}
        startProgress={0.52}
        endProgress={0.62}
        variant="projects-to-tech"
      />

      {/* Scene 4: Tech Stack World Gallery Wall (Data-Driven, Real Tech Logos) */}
      <TechStackWorld progress={progress} />

      {/* Transition 3: Final Fall & Space Journey (Tech Stack -> Final Scene) */}
      <FallSpaceTransition
        progress={progress}
        startProgress={0.86}
        endProgress={0.93}
        variant="tech-to-final"
      />

      {/* Scene 5: Final Landing, Waving Character & Contact Dossier */}
      <FinalWaveWorld progress={progress} />

      {/* Interactive Project Architecture Dossier Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
