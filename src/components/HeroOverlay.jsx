import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import DeveloperDoodles from './DeveloperDoodles';

export default function HeroOverlay({ progress }) {
  // Fade in as camera pulls back (from 0.06 to 0.08) and stay visible until transition 1 (around 0.18)
  let opacity = 0;
  if (progress >= 0.06 && progress < 0.08) {
    opacity = (progress - 0.06) / 0.02;
  } else if (progress >= 0.08 && progress < 0.18) {
    opacity = 1;
  } else if (progress >= 0.18 && progress <= 0.21) {
    opacity = Math.max(0, 1 - (progress - 0.18) / 0.03);
  }

  if (opacity <= 0.01) return null;

  const { developer } = PORTFOLIO_DATA;

  // Parallax subtle vertical drift
  const translateY = (progress - 0.12) * 100;

  return (
    <div
      className="hero-overlay-root"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        opacity,
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(20px, 5vw, 60px)',
        paddingTop: 'clamp(65px, 8.5vh, 90px)',
        boxSizing: 'border-box',
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Hand-drawn developer doodles occupying empty negative space */}
      <DeveloperDoodles variant="hero" />

      {/* Hand-drawn greeting pointing to the character */}
      <div
        className="hero-speech-bubble"
        style={{
          position: 'absolute',
          left: 'clamp(400px, 18vw, 20vw)',
          top: 'clamp(60px, 9vh, 105px)',
          transform: 'translateX(-50%) rotate(-3deg)',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 28
        }}
      >
        <div
          className="sketch-border"
          style={{
            background: '#ffffff',
            padding: '10px 18px',
            borderRadius: '16px 16px 16px 2px',
            boxShadow: 'var(--shadow-paper)',
            whiteSpace: 'nowrap'
          }}
        >
          <span className="font-hand" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', color: 'var(--ink-primary)', fontWeight: 700 }}>
            Hello there 👋
          </span>
        </div>
        {/* Dashed arrow pointing down toward character body */}
        <svg width="35" height="42" viewBox="0 0 35 42" fill="none" style={{ marginLeft: '10px', marginTop: '4px', opacity: 0.7 }}>
          <path d="M16 2 C 22 16, 18 24, 8 38" stroke="var(--ink-primary)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M8 38 L 16 34 M 8 38 L 7 26" stroke="var(--ink-primary)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Standalone Character Wave Visual using /assets/character/wave.png directly */}
      <div
        id="hero-character-slot"
        style={{
          position: 'absolute',
          left: 'clamp(70px, 18vw, 20vw)',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(120px, 18vw, 300px)',
          height: 'clamp(260px, 52vh, 540px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 26,
          overflow: 'visible'
        }}
      >
        <img
          src="/assets/character/wave.png"
          alt="Eswar waving"
          style={{
            height: '64.8vh',
            width: 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            objectFit: 'contain',
            filter: 'grayscale(100%) drop-shadow(2px 6px 14px rgba(0,0,0,0.12))',
            display: 'block'
          }}
        />
      </div>

      {/* Main Hero Content — Positioned on the right side with guaranteed character clearance */}
      <div
        className="hero-content-column"
        style={{
          marginLeft: 'clamp(36%, 46vw, 52%)',
          maxWidth: '680px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 30
        }}
      >
        {/* Editorial Subtitle / Role Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span className="tech-tag" style={{ background: '#fff', borderColor: 'var(--ink-primary)' }}>
            <span className="status-dot" /> {developer.role}
          </span>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
            STATUS: {developer.status}
          </span>
        </div>

        {/* Primary Typography */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.6rem, 5.8vw, 5.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: 'var(--ink-primary)'
          }}
        >
          HI, I'M ESWAR.
        </h1>

        {/* Action Callout: LET'S BUILD SOMETHING. */}
        <div
          className="font-display"
          style={{
            fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--ink-primary)',
            lineHeight: 1.15
          }}
        >
          LET'S BUILD SOMETHING.
        </div>

        {/* Supporting stack line */}
        <p
          className="font-mono"
          style={{
            fontSize: 'clamp(0.78rem, 1.1vw, 0.92rem)',
            color: 'var(--ink-secondary)',
            letterSpacing: '0.08em',
            lineHeight: 1.6,
            borderLeft: '2px solid var(--ink-primary)',
            paddingLeft: '14px'
          }}
        >
          {developer.coreStack.join(' • ')}
        </p>

        {/* Narrative bio headline */}
        <p
          className="font-sans"
          style={{
            fontSize: 'clamp(0.88rem, 1.25vw, 1.02rem)',
            color: 'var(--ink-secondary)',
            lineHeight: 1.6,
            maxWidth: '540px'
          }}
        >
          {developer.headline}
        </p>

        {/* Hero Quick Connect Links: GitHub, LinkedIn, Email */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '4px'
          }}
        >
          <a
            href={developer.social.github}
            target="_blank"
            rel="noreferrer"
            className="paper-button interactive"
            style={{ padding: '7px 14px', fontSize: '0.78rem' }}
          >
            <GithubIcon size={14} /> GITHUB
          </a>
          <a
            href={developer.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="paper-button interactive"
            style={{ padding: '7px 14px', fontSize: '0.78rem' }}
          >
            <LinkedinIcon size={14} /> LINKEDIN
          </a>
          <a
            href={`mailto:${developer.social.email}`}
            className="paper-button interactive"
            style={{ padding: '7px 14px', fontSize: '0.78rem' }}
          >
            <Mail size={14} /> EMAIL
          </a>
        </div>

        {/* Technical stats snippet */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            marginTop: '4px'
          }}
        >
          {developer.stats.map((st, i) => (
            <div
              key={i}
              className="sketch-border"
              style={{
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <div className="font-mono" style={{ fontSize: '0.64rem', color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
                {st.label}
              </div>
              <div className="font-sans" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-primary)', marginTop: '2px' }}>
                {st.value}
              </div>
            </div>
          ))}
        </div>

        {/* Natural Fall Transition Prompt */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '12px'
          }}
        >
          <div className="animate-bounce-down font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            SCROLL TO FALL <ArrowDown size={14} />
          </div>
          <div style={{ height: '1px', flex: 1, maxWidth: '120px', background: 'var(--paper-border)' }} />
          <span className="font-hand" style={{ fontSize: '1.15rem', color: 'var(--ink-muted)' }}>
            step off the edge into orbit
          </span>
        </div>
      </div>
    </div>
  );
}
