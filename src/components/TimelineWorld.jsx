import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function TimelineWorld({ progress }) {
  // Active between 0.77 and 0.88
  let opacity = 0;
  if (progress >= 0.77 && progress < 0.80) {
    opacity = (progress - 0.77) / 0.03;
  } else if (progress >= 0.80 && progress <= 0.85) {
    opacity = 1;
  } else if (progress > 0.85 && progress <= 0.88) {
    opacity = Math.max(0, 1 - (progress - 0.85) / 0.03);
  }

  if (opacity <= 0.01) return null;

  const timeline = PORTFOLIO_DATA.experienceTimeline;

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
        padding: 'clamp(20px, 6vw, 80px)',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span className="tech-tag" style={{ background: '#fff' }}>
            ENGINEERING TRAJECTORY
          </span>
          <span className="font-hand" style={{ fontSize: '1.25rem', color: 'var(--ink-accent)' }}>
            *journey of continuous backend craftsmanship
          </span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 3.6vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--ink-primary)',
            marginBottom: '32px'
          }}
        >
          TIMELINE & EVOLUTION
        </h2>

        {/* Drawn Paper Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '20px',
            position: 'relative'
          }}
        >
          {/* Continuous connecting horizontal pencil stroke line */}
          <div
            style={{
              position: 'absolute',
              top: '26px',
              left: '10px',
              right: '10px',
              height: '2px',
              borderTop: '2px dashed var(--paper-border)',
              zIndex: 0
            }}
          />

          {timeline.map((item, idx) => (
            <div
              key={item.period}
              className="sketch-border"
              style={{
                background: 'rgba(255, 255, 255, 0.94)',
                padding: '18px',
                position: 'relative',
                zIndex: 1,
                backdropFilter: 'blur(6px)'
              }}
            >
              {/* Year Marker */}
              <div
                style={{
                  display: 'inline-block',
                  background: 'var(--ink-primary)',
                  color: '#ffffff',
                  padding: '2px 8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}
              >
                {item.period}
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: 'var(--ink-primary)',
                  lineHeight: 1.25,
                  marginBottom: '4px'
                }}
              >
                {item.milestone}
              </h3>

              <div
                className="font-mono"
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--ink-blueprint)',
                  marginBottom: '8px'
                }}
              >
                {item.role}
              </div>

              <p
                className="font-sans"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.5
                }}
              >
                {item.narrative}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
