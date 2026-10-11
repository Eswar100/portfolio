import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ExternalLink, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsWorld({ progress, onSelectProject }) {
  // Active between 0.28 and 0.55
  let opacity = 0;
  if (progress >= 0.28 && progress < 0.32) {
    opacity = (progress - 0.28) / 0.04;
  } else if (progress >= 0.32 && progress <= 0.50) {
    opacity = 1;
  } else if (progress > 0.50 && progress <= 0.54) {
    opacity = Math.max(0, 1 - (progress - 0.50) / 0.04);
  }

  if (opacity <= 0.01) return null;

  // Local progress in projects realm (0 to 1)
  const localP = Math.max(0, Math.min(1, (progress - 0.30) / 0.21));

  // Horizontal track shift: slides from right to left across the viewport
  // As character walks right, project cards flow through the gallery
  const trackOffset = (localP - 0.15) * -120; // in vw or %

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        opacity,
        zIndex: 22,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(16px, 4vw, 40px)',
        overflow: 'hidden',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Top Gallery Header Annotation */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(20px, 5vh, 48px)',
          left: 'clamp(20px, 5vw, 60px)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        <span className="tech-tag" style={{ background: '#fff' }}>
          ZONE 01 // ARCHITECTURAL SHOWCASE
        </span>
        <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>
          FEATURED PRODUCTION SYSTEMS
        </span>
        <span className="font-hand" style={{ fontSize: '1.2rem', color: 'var(--ink-accent)' }}>
          *click to inspect internal architecture
        </span>
      </div>

      {/* Horizontal Slider of Physical Project Objects */}
      <div
        style={{
          display: 'flex',
          gap: 'clamp(24px, 4vw, 48px)',
          transform: `translateX(calc(${trackOffset}vw + 35vw))`,
          transition: 'transform 0.05s linear',
          width: 'max-content',
          alignItems: 'center'
        }}
      >
        {PORTFOLIO_DATA.projects.map((project, idx) => {
          return (
            <div
              key={project.id}
              className="blueprint-card interactive"
              style={{
                width: 'clamp(320px, 34vw, 480px)',
                padding: 'clamp(20px, 2.5vw, 32px)',
                borderRadius: '2px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderLeft: `4px solid ${project.accent}`,
                background: 'rgba(255, 255, 255, 0.94)'
              }}
              onClick={() => onSelectProject(project)}
            >
              {/* Corner registration marks */}
              <div className="reg-mark" style={{ top: '8px', right: '8px' }} />

              {/* Number and Category Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: project.accent }}>
                  PROJECT // 0{idx + 1}
                </span>
                <span className="tech-tag" style={{ fontSize: '0.68rem' }}>
                  {project.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: 'var(--ink-primary)'
                  }}
                >
                  {project.title}
                </h3>
                <p className="font-hand" style={{ fontSize: '1.15rem', color: 'var(--ink-secondary)', marginTop: '4px' }}>
                  {project.tagline}
                </p>
              </div>

              {/* Stack Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.stack.map((tech, i) => (
                  <span key={i} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Narrative Description */}
              <p
                className="font-sans"
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.55,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {project.description}
              </p>

              {/* Architectural Highlight Box */}
              <div
                style={{
                  background: 'var(--paper-cream)',
                  padding: '8px 12px',
                  borderLeft: '2px dashed var(--ink-secondary)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.45
                }}
              >
                <span style={{ fontWeight: 700, color: 'var(--ink-primary)' }}>ARCH NOTE: </span>
                {project.architectureHighlight}
              </div>

              {/* Metrics preview */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--paper-border)',
                  paddingTop: '10px'
                }}
              >
                {Object.entries(project.metrics).map(([k, v], mIdx) => (
                  <div key={mIdx} className="font-mono" style={{ fontSize: '0.72rem' }}>
                    <div style={{ color: 'var(--ink-muted)', textTransform: 'uppercase' }}>{k}</div>
                    <div style={{ fontWeight: 700, color: 'var(--ink-primary)' }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '4px'
                }}
              >
                <button
                  type="button"
                  className="paper-button interactive"
                  style={{ fontSize: '0.76rem', padding: '6px 14px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(project);
                  }}
                >
                  <Layers size={14} /> INSPECT DOSSIER
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="paper-button interactive"
                    style={{ padding: '6px 10px', fontSize: '0.76rem' }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="GitHub Repository"
                  >
                    <GithubIcon size={14} />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="paper-button paper-button-blueprint interactive"
                    style={{ padding: '6px 10px', fontSize: '0.76rem' }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Live Demo"
                  >
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ground sketch platform lines indicating the physical gallery walkway */}
      <div
        style={{
          position: 'absolute',
          bottom: '18vh',
          left: 0,
          width: '100vw',
          height: '2px',
          background: 'var(--paper-border)',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '40px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--ink-muted)'
          }}
        >
          PLATFORM LEVEL 01 // GALLERY SURFACE
        </div>
      </div>
    </div>
  );
}
