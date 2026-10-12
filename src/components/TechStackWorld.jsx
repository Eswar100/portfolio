import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import ArchitecturalPillar from './ArchitecturalPillar';

/**
 * TechStackWorld
 * Hand-drawn Physical Architectural Technology Wall.
 * Shares the exact architectural gallery visual identity as the Project Wall.
 * 
 * Features:
 * - 100% Data-Driven: Automatically scales wall length and bay count based on `PORTFOLIO_DATA.techStack`.
 * - Hand-Drawn Masonry: Stone pillars and wall panels with graphite pencil hatching.
 * - Real Logos: Each frame mounts the actual technology logo SVG inside a pencil-drawn frame.
 * - Foreground Character: Character canvas renders in front (zIndex: 25) walking along the floor line.
 * - Progressive Reveal: Cinematic horizontal movement as user scrolls.
 */

export default function TechStackWorld({ progress }) {
  // Active in tech stack zone: 0.62 to 0.86
  let opacity = 0;
  if (progress >= 0.62 && progress < 0.66) {
    opacity = (progress - 0.62) / 0.04;
  } else if (progress >= 0.66 && progress <= 0.82) {
    opacity = 1;
  } else if (progress > 0.82 && progress <= 0.86) {
    opacity = Math.max(0, 1 - (progress - 0.82) / 0.04);
  }

  if (opacity <= 0.01) return null;

  // Local progress within tech stack section (0 to 1)
  const localP = Math.max(0, Math.min(1, (progress - 0.64) / 0.20));

  const techStack = PORTFOLIO_DATA.techStack;
  const techCount = techStack.length;

  // Bay width for tech items: compact architectural bay (~360px wide)
  const bayWidth = 360;
  const pillarWidth = 60;
  const totalTrackWidth = (bayWidth + pillarWidth) * techCount + pillarWidth;

  // Progressive horizontal scroll revealing technologies sequentially
  const maxScrollOffset = Math.max(0, totalTrackWidth - (typeof window !== 'undefined' ? window.innerWidth * 0.75 : 800));
  const trackX = -(localP * maxScrollOffset);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        opacity,
        zIndex: 10, // Wall and frames at layer 10; Character canvas at layer 25 (foreground)
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Top Gallery Header Annotation */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(16px, 3vh, 32px)',
          left: 'clamp(20px, 4vw, 50px)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          zIndex: 15
        }}
      >
        <span className="tech-tag" style={{ background: '#fff' }}>
          ZONE 02 // TECHNICAL STACK GALLERY
        </span>
        <span className="font-mono" style={{ fontSize: '0.76rem', color: 'var(--ink-secondary)' }}>
          CORE RUNTIMES, ENGINES & INFRASTRUCTURE
        </span>
        <span className="font-hand" style={{ fontSize: '1.15rem', color: 'var(--ink-accent)' }}>
          *character walking across production stack
        </span>
      </div>

      {/* Main Architectural Tech Wall Structure */}
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

        {/* Data-Driven Tech Bays */}
        {techStack.map((tech, idx) => (
          <React.Fragment key={tech.name}>
            {/* Tech Wall Bay */}
            <div
              style={{
                width: `${bayWidth}px`,
                height: '520px',
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0 14px',
                background: 'rgba(248, 246, 240, 0.4)'
              }}
            >
              {/* Top Wall Beam / Header */}
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
                  MODULE 0{idx + 1} // {tech.category}
                </div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ink-primary)' }} />
              </div>

              {/* Bay Title in Hollow Pencil Architectural Style */}
              <div style={{ padding: '8px 4px 4px' }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: 'var(--ink-primary)',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '6px'
                  }}
                >
                  <span style={{ color: 'var(--ink-blueprint)' }}>STACK {idx + 1}:</span>
                  <span>{tech.name}</span>
                </h2>
              </div>

              {/* The Physical Pencil Frame (Mounted on the Wall) */}
              <div
                className="interactive"
                style={{
                  flex: 1,
                  margin: '4px 0 10px',
                  background: '#ffffff',
                  border: '2px solid var(--ink-primary)',
                  boxShadow: '4px 4px 0px rgba(32, 28, 24, 0.15)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                  overflow: 'hidden',
                  boxSizing: 'border-box'
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

                {/* Actual Technology Logo Mount inside the Frame */}
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--paper-border)',
                    background: 'var(--paper-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    margin: '10px 0 14px',
                    boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.04)',
                    boxSizing: 'border-box'
                  }}
                >
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'grayscale(100%)'
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Tech Title & Version */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: 'var(--ink-primary)',
                    textAlign: 'center',
                    marginBottom: '2px'
                  }}
                >
                  {tech.name}
                </h3>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-blueprint)', marginBottom: '8px' }}>
                  {tech.version}
                </span>

                {/* Technical Description */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--ink-secondary)',
                    textAlign: 'center',
                    lineHeight: 1.45,
                    marginBottom: 'auto'
                  }}
                >
                  {tech.details}
                </p>

                {/* Hand-Drawn Pencil Code Snippet / Annotation Box */}
                <div
                  className="font-mono"
                  style={{
                    width: '100%',
                    background: 'var(--paper-cream)',
                    border: '1px dashed var(--ink-secondary)',
                    padding: '6px 10px',
                    fontSize: '0.66rem',
                    color: 'var(--ink-primary)',
                    textAlign: 'center',
                    marginTop: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box'
                  }}
                >
                  {tech.annotation}
                </div>
              </div>

              {/* Lower Masonry Wall Section (Vertical pencil hatching) */}
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
                <svg width="100%" height="100%" fill="none">
                  <defs>
                    <pattern id={`techWallHatch-${idx}`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--ink-secondary)" strokeWidth="1" opacity="0.45" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#techWallHatch-${idx})`} />
                </svg>
              </div>
            </div>

            {/* Architectural Column Between Bays */}
            <ArchitecturalPillar height={520} width={pillarWidth} />
          </React.Fragment>
        ))}
      </div>

      {/* Continuous Architectural Floor Line for Tech Gallery Walkway */}
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
          STACK DATUM // LEVEL 00 • CHARACTER WALKWAY
        </div>
      </div>
    </div>
  );
}
