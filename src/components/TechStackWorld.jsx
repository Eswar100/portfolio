import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function TechStackWorld({ progress }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Active between 0.62 and 0.80
  let opacity = 0;
  if (progress >= 0.62 && progress < 0.66) {
    opacity = (progress - 0.62) / 0.04;
  } else if (progress >= 0.66 && progress <= 0.76) {
    opacity = 1;
  } else if (progress > 0.76 && progress <= 0.80) {
    opacity = Math.max(0, 1 - (progress - 0.76) / 0.04);
  }

  if (opacity <= 0.01) return null;

  // Local progress in opposite journey (0 to 1)
  const localP = Math.max(0, Math.min(1, (progress - 0.64) / 0.14));

  // The character walks from right to left (0.75 down to 0.22)
  // Which corresponds to passing skills 0 to 7
  const activeSkillIndex = Math.min(
    PORTFOLIO_DATA.techStack.length - 1,
    Math.floor(localP * PORTFOLIO_DATA.techStack.length)
  );

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
        zIndex: 21,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(20px, 5vw, 60px)',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Editorial Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <span className="tech-tag" style={{ background: '#fff', borderColor: 'var(--ink-primary)' }}>
            REVERSE TRAJECTORY // OPPOSITE WALK
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--ink-primary)',
              marginTop: '6px'
            }}
          >
            TECHNICAL PROFICIENCIES
          </h2>
        </div>

        <div className="font-hand" style={{ fontSize: '1.25rem', color: 'var(--ink-accent)', textAlign: 'right' }}>
          *character traveling backward through core stack
        </div>
      </div>

      {/* Floating Monolithic Tech Monuments */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {PORTFOLIO_DATA.techStack.map((tech, idx) => {
          const isActive = idx === activeSkillIndex || hoveredSkill === idx;
          return (
            <div
              key={tech.name}
              className="interactive"
              onMouseEnter={() => setHoveredSkill(idx)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                border: isActive ? '1.5px solid var(--ink-primary)' : '1px solid var(--paper-border)',
                boxShadow: isActive ? '4px 4px 0 var(--ink-primary)' : '1px 1px 0 rgba(0,0,0,0.02)',
                padding: '16px 18px',
                borderRadius: '2px',
                position: 'relative',
                transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(4px)'
              }}
            >
              {/* Top metadata line */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
                  0{idx + 1} // {tech.category}
                </span>
                {isActive && <span className="status-dot" />}
              </div>

              {/* Skill Name */}
              <h3
                className="font-display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: isActive ? 'var(--ink-primary)' : 'var(--ink-secondary)'
                }}
              >
                {tech.name}
              </h3>

              <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-blueprint)', marginTop: '2px' }}>
                {tech.version}
              </div>

              {/* Descriptive technical details */}
              <p
                className="font-sans"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--ink-secondary)',
                  marginTop: '8px',
                  lineHeight: 1.45
                }}
              >
                {tech.details}
              </p>

              {/* Code snippet annotation */}
              <div
                className="font-mono"
                style={{
                  marginTop: '10px',
                  fontSize: '0.68rem',
                  color: isActive ? 'var(--ink-accent)' : 'var(--ink-muted)',
                  borderTop: '1px dashed var(--paper-border)',
                  paddingTop: '6px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {tech.annotation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
