import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import ArchitecturalPillar from './ArchitecturalPillar';

/**
 * ProjectsWorld
 * Hand-drawn Physical Architectural Project Wall.
 * Directly translated from the architectural stone gallery reference drawing.
 * 
 * Features:
 * - 100% Data-Driven: Automatically scales wall width and bay count based on `PORTFOLIO_DATA.projects`.
 * - Hand-Drawn Masonry: Architectural stone pillars and wall panels with pencil hatching.
 * - Real Screenshots: Each frame mounts the actual application screenshot inside a pencil-drawn frame.
 * - Foreground Character: Character canvas renders in front (zIndex: 25) walking along the open floor.
 * - Progressive Reveal: Cinematic horizontal gallery travel as user scrolls.
 */

export default function ProjectsWorld({ progress, onSelectProject }) {
  // Active in projects zone: 0.28 to 0.54
  let opacity = 0;
  if (progress >= 0.28 && progress < 0.32) {
    opacity = (progress - 0.28) / 0.04;
  } else if (progress >= 0.32 && progress <= 0.50) {
    opacity = 1;
  } else if (progress > 0.50 && progress <= 0.54) {
    opacity = Math.max(0, 1 - (progress - 0.50) / 0.04);
  }

  if (opacity <= 0.01) return null;

  // Local progress within projects section (0 to 1)
  const localP = Math.max(0, Math.min(1, (progress - 0.30) / 0.21));

  const projects = PORTFOLIO_DATA.projects;
  const projectCount = projects.length;

  // Each bay width (responsive: around 560px on desktop, 420px on tablet, 320px on mobile)
  const bayWidth = 560;
  const pillarWidth = 68;
  const totalTrackWidth = (bayWidth + pillarWidth) * projectCount + pillarWidth;

  // Calculate horizontal travel distance to progressively reveal all project frames
  // Leaves comfortable margins at beginning and end
  const maxScrollOffset = Math.max(0, totalTrackWidth - (typeof window !== 'undefined' ? window.innerWidth * 0.75 : 800));
  const trackX = -(localP * maxScrollOffset);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        opacity,
        zIndex: 10, // Wall and frames sit at layer 10; Character canvas is at layer 25 (foreground)
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Top Gallery Header & Blueprint Coordinates */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(20px, 7vh, 74px)',
          left: 'clamp(20px, 4vw, 50px)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          zIndex: 15
        }}
      >
        <span className="tech-tag" style={{ background: '#fff' }}>
          ZONE 01 // ARCHITECTURAL PROJECT WALL
        </span>
        <span className="font-mono" style={{ fontSize: '0.76rem', color: 'var(--ink-secondary)' }}>
          SYSTEM BLUEPRINTS & PRODUCTION BUILDS
        </span>
        <span className="font-hand" style={{ fontSize: '1.15rem', color: 'var(--ink-accent)' }}>
          *click any frame to inspect internal architecture
        </span>
      </div>

      {/* Main Architectural Wall Structure (Mounted above the floor) */}
      <div
        style={{
          position: 'absolute',
          top: '12vh',
          left: 'clamp(40px, 8vw, 120px)',
          height: '68vh',
          display: 'flex',
          alignItems: 'stretch',
          transform: `translateX(${trackX}px)`,
          transition: 'transform 0.06s linear',
          willChange: 'transform'
        }}
      >
        {/* Leading Architectural Pillar */}
        <ArchitecturalPillar height={520} width={pillarWidth} />

        {/* Data-Driven Wall Bays */}
        {projects.map((project, idx) => (
          <React.Fragment key={project.id}>
            {/* Project Wall Bay */}
            <div
              style={{
                width: `${bayWidth}px`,
                height: '520px',
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0 16px',
                background: 'rgba(248, 246, 240, 0.4)'
              }}
            >
              {/* Top Masonry Wall Beam / Cornice */}
              <div
                style={{
                  height: '34px',
                  width: '100%',
                  borderBottom: '1.5px solid var(--ink-primary)',
                  borderTop: '1.5px solid var(--ink-primary)',
                  background: 'var(--paper-cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 12px',
                  boxSizing: 'border-box'
                }}
              >
                <div className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ink-secondary)' }}>
                  SECTION {idx + 1}.0 // REINFORCED WALL PANEL
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ width: '4px', height: '4px', background: 'var(--ink-muted)' }} />
                  <div style={{ width: '4px', height: '4px', background: 'var(--ink-muted)' }} />
                </div>
              </div>

              {/* Bay Title in Hollow Pencil Architectural Style (from Reference Image) */}
              <div style={{ padding: '8px 4px 4px' }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: 'var(--ink-primary)',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px'
                  }}
                >
                  <span style={{ color: project.accent }}>PROJECT {idx + 1}:</span>
                  <span>{project.title}</span>
                </h2>
              </div>

              {/* The Physical Pencil Frame (Mounted on the Wall) */}
              <div
                className="interactive"
                onClick={() => onSelectProject(project)}
                style={{
                  flex: 1,
                  margin: '4px 0 10px',
                  background: '#ffffff',
                  border: '2px solid var(--ink-primary)',
                  boxShadow: '4px 4px 0px rgba(32, 28, 24, 0.15)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Hand-Drawn Double Pencil Inner Border */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '4px',
                    border: '1px solid var(--paper-border)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                />

                {/* Actual Project Screenshot / Visual */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '210px',
                    background: '#161920',
                    overflow: 'hidden',
                    borderBottom: '1.5px solid var(--ink-primary)'
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'grayscale(100%)',
                      transition: 'transform 0.3s ease'
                    }}
                    loading="lazy"
                  />
                  {/* Category Pill Tag */}
                  <span
                    className="tech-tag"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(255, 255, 255, 0.94)',
                      borderColor: 'var(--ink-primary)',
                      fontSize: '0.65rem'
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Frame Body Content & Metadata */}
                <div
                  style={{
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    background: '#ffffff'
                  }}
                >
                  <div>
                    <div className="font-hand" style={{ fontSize: '1.1rem', color: project.accent, marginBottom: '4px' }}>
                      {project.tagline}
                    </div>

                    {/* Tech Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
                      {project.stack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-tag" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p
                      className="font-sans"
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--ink-secondary)',
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Actions / Inspect Button */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px dashed var(--paper-border)',
                      paddingTop: '8px',
                      marginTop: '8px'
                    }}
                  >
                    <button
                      type="button"
                      className="paper-button interactive"
                      style={{ fontSize: '0.72rem', padding: '5px 12px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                    >
                      <Layers size={13} /> INSPECT ARCHITECTURE
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="paper-button interactive"
                        style={{ padding: '5px 8px', fontSize: '0.72rem' }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon size={13} />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="paper-button paper-button-blueprint interactive"
                        style={{ padding: '5px 8px', fontSize: '0.72rem' }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Live Demo"
                      >
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Masonry Wall Section (Vertical pencil hatching under the frames) */}
              <div
                style={{
                  height: '42px',
                  width: '100%',
                  borderTop: '1.5px solid var(--ink-primary)',
                  borderBottom: '2px solid var(--ink-primary)',
                  background: 'var(--paper-cream)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Vertical pencil hatching strokes */}
                <svg width="100%" height="100%" fill="none">
                  <defs>
                    <pattern id={`wallHatch-${idx}`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--ink-secondary)" strokeWidth="1" opacity="0.45" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#wallHatch-${idx})`} />
                </svg>
              </div>
            </div>

            {/* Architectural Column Between Bays */}
            <ArchitecturalPillar height={520} width={pillarWidth} />
          </React.Fragment>
        ))}
      </div>

      {/* Continuous Architectural Floor Line & Open Floor Area for Walking Character */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(12vh + 520px)',
          left: 0,
          width: '100vw',
          height: '2px',
          background: 'var(--ink-primary)',
          zIndex: 8,
          pointerEvents: 'none'
        }}
      >
        {/* Subtle graphite floor datum tick marks */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '48px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--ink-muted)'
          }}
        >
          GALLERY DATUM // LEVEL 00 • CHARACTER WALKWAY
        </div>
      </div>
    </div>
  );
}
