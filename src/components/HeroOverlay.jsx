import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function HeroOverlay({ progress }) {
  // Fade in as camera pulls back (from 0.05 to 0.08) and stay visible until transition 1 (around 0.20)
  let opacity = 0;
  if (progress >= 0.05 && progress < 0.09) {
    opacity = (progress - 0.05) / 0.04;
  } else if (progress >= 0.09 && progress <= 0.18) {
    opacity = 1;
  } else if (progress > 0.18 && progress <= 0.22) {
    opacity = Math.max(0, 1 - (progress - 0.18) / 0.04);
  }

  if (opacity <= 0.01) return null;

  // Parallax subtle vertical drift
  const translateY = (progress - 0.12) * 120;

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
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(20px, 6vw, 80px)',
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Hand-drawn greeting pointing to the character */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(24%, 32vw, 36%)',
          top: 'clamp(18%, 24vh, 28%)',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          transform: 'rotate(-4deg)'
        }}
      >
        <span className="font-hand" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', color: 'var(--ink-primary)', fontWeight: 700 }}>
          Hello there 👋
        </span>
        <svg width="45" height="35" viewBox="0 0 50 40" fill="none" style={{ marginTop: '2px', opacity: 0.7 }}>
          <path d="M40 5 C 30 20, 15 25, 5 35" stroke="var(--ink-primary)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M5 35 L 14 32 M 5 35 L 7 24" stroke="var(--ink-primary)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Main Hero Content — Positioned on the right side of the screen */}
      <div
        style={{
          marginLeft: 'auto',
          maxWidth: '680px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        {/* Editorial Subtitle / Role Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span className="tech-tag" style={{ background: '#fff', borderColor: 'var(--ink-primary)' }}>
            <span className="status-dot" /> BACKEND ARCHITECT
          </span>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
            THREAD: [MAIN] • STACK_DEPTH: 0
          </span>
        </div>

        {/* Primary Typography */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: 'var(--ink-primary)'
          }}
        >
          HI, I'M ESWAR.
        </h1>

        {/* Secondary Title */}
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.2rem, 2.4vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--ink-blueprint)',
            lineHeight: 1.2
          }}
        >
          {PORTFOLIO_DATA.developer.role}
        </h2>

        {/* Supporting stack line */}
        <p
          className="font-mono"
          style={{
            fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
            color: 'var(--ink-secondary)',
            letterSpacing: '0.08em',
            lineHeight: 1.6,
            borderLeft: '2px solid var(--ink-primary)',
            paddingLeft: '14px'
          }}
        >
          {PORTFOLIO_DATA.developer.coreStack.join(' • ')}
        </p>

        {/* Narrative bio snippet */}
        <p
          className="font-sans"
          style={{
            fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
            color: 'var(--ink-secondary)',
            lineHeight: 1.6,
            maxWidth: '540px'
          }}
        >
          {PORTFOLIO_DATA.developer.headline}
        </p>

        {/* Technical metrics snippet */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginTop: '8px'
          }}
        >
          {PORTFOLIO_DATA.developer.stats.map((st, i) => (
            <div
              key={i}
              className="sketch-border"
              style={{
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
                {st.label}
              </div>
              <div className="font-sans" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginTop: '2px' }}>
                {st.value}
              </div>
            </div>
          ))}
        </div>

        {/* Subtle scroll indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '16px'
          }}
        >
          <div className="animate-bounce-down font-mono" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
            SCROLL ↓ EXPLORE
          </div>
          <div style={{ height: '1px', flex: 1, maxWidth: '120px', background: 'var(--paper-border)' }} />
          <span className="font-hand" style={{ fontSize: '1.1rem', color: 'var(--ink-muted)' }}>
            step off the edge to begin
          </span>
        </div>
      </div>
    </div>
  );
}
