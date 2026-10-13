import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, FileText, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import DeveloperDoodles from './DeveloperDoodles';

/**
 * FinalWaveWorld
 * Final Destination / Contact Scene.
 * 
 * Uses /assets/character/wave.png directly as requested.
 * No WebM, no video, no animated wave.
 * Strict black & white / grayscale visual identity.
 */

export default function FinalWaveWorld({ progress }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Active in final zone: 0.92 to 1.00
  let opacity = 0;
  if (progress >= 0.92 && progress < 0.95) {
    opacity = (progress - 0.92) / 0.03;
  } else if (progress >= 0.95) {
    opacity = 1;
  }

  if (opacity <= 0.01) return null;

  const { developer } = PORTFOLIO_DATA;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developer.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div
      className="final-world-root"
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
        overflow: 'hidden',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Hand-drawn developer doodles for Final section */}
      <DeveloperDoodles variant="final" />

      {/* ========================================================
          LEFT CHARACTER ZONE — Speech Bubble & wave.png Visual
          ========================================================
      */}
      <div
        className="final-speech-bubble"
        style={{
          position: 'absolute',
          left: 'clamp(70px, 18vw, 20vw)',
          top: 'clamp(60px, 9vh, 105px)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px'
        }}
      >
        {/* Speech bubble */}
        <div
          className="sketch-border"
          style={{
            background: '#ffffff',
            padding: '12px 18px',
            borderRadius: '16px 16px 16px 2px',
            boxShadow: 'var(--shadow-paper)',
            whiteSpace: 'nowrap',
            transform: 'translateX(165px) rotate(2deg)'
          }}
        >
          <div className="font-hand" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', color: 'var(--ink-primary)', fontWeight: 700 }}>
            Thanks for visiting!
          </div>
          <div className="font-hand" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', color: 'var(--ink-secondary)' }}>
            See you around! 👋
          </div>
        </div>
        {/* Dashed arrow pointing down toward the character body */}
        <svg width="30" height="40" viewBox="0 0 30 40" fill="none" style={{ marginLeft: '170px', opacity: 0.6 }}>
          <path d="M15 0 C 10 15, 20 25, 8 38" stroke="var(--ink-primary)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M8 38 L 14 34 M 8 38 L 6 30" stroke="var(--ink-primary)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Standalone Character Wave Visual using /assets/character/wave.png directly */}
      <div
        id="final-character-slot"
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
            maxWidth: '100%',
            height: '64.8vh',
            maxHeight: 'none',
            objectFit: 'contain',
            filter: 'grayscale(100%) drop-shadow(2px 6px 14px rgba(0,0,0,0.12))',
            display: 'block'
          }}
        />
      </div>

      {/* Main Closing & Contact Dossier — Positioned cleanly on the right side */}
      <div
        className="final-content-column"
        style={{
          marginLeft: 'clamp(36%, 46vw, 52%)',
          maxWidth: '620px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          zIndex: 30
        }}
      >
        {/* Runtime Exit Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="tech-tag" style={{ background: '#fff', borderColor: 'var(--ink-primary)' }}>
            <span className="status-dot" /> END OF RUNTIME JOURNEY
          </span>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
            EXIT STATUS: 0 (SUCCESS)
          </span>
        </div>

        {/* Closing Headline */}
        <div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.98,
              color: 'var(--ink-primary)'
            }}
          >
            LET'S BUILD SOMETHING.
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: 'clamp(0.92rem, 1.25vw, 1.05rem)',
              color: 'var(--ink-secondary)',
              marginTop: '12px',
              lineHeight: 1.6
            }}
          >
            Whether you're scaling a high-throughput backend, architecting distributed Spring services, or designing database schemas — my terminal is open.
          </p>
        </div>

        {/* Contact Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '10px',
            marginTop: '4px'
          }}
        >
          {/* GitHub */}
          <a
            href={developer.social.github}
            target="_blank"
            rel="noreferrer"
            className="paper-button interactive"
            style={{ justifyContent: 'center' }}
          >
            <GithubIcon size={15} /> GITHUB
          </a>

          {/* LinkedIn */}
          <a
            href={developer.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="paper-button interactive"
            style={{ justifyContent: 'center' }}
          >
            <LinkedinIcon size={15} /> LINKEDIN
          </a>

          {/* Email button with copy shortcut */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="paper-button interactive"
            style={{ justifyContent: 'center' }}
          >
            {copiedEmail ? <Check size={15} color="var(--ink-primary)" /> : <Copy size={15} />}
            {copiedEmail ? 'COPIED!' : 'COPY EMAIL'}
          </button>

          {/* Resume Download */}
          <a
            href={developer.social.resume}
            className="paper-button interactive"
            style={{ justifyContent: 'center', borderColor: 'var(--ink-primary)', color: 'var(--ink-primary)' }}
          >
            <FileText size={15} /> RESUME PDF
          </a>
        </div>

        {/* Email direct line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
          <Mail size={15} color="var(--ink-muted)" />
          <a
            href={`mailto:${developer.social.email}`}
            className="font-mono interactive"
            style={{ fontSize: '0.82rem', color: 'var(--ink-primary)', textDecoration: 'underline' }}
          >
            {developer.social.email}
          </a>
        </div>

        {/* Bottom Colophon */}
        <div
          style={{
            borderTop: '1px solid var(--paper-border)',
            paddingTop: '12px',
            marginTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--ink-muted)'
          }}
        >
          <div>ESWAR // BACKEND DEVELOPER © {new Date().getFullYear()}</div>
          <div>HAND-CRAFTED MOTION PORTFOLIO</div>
        </div>
      </div>
    </div>
  );
}
