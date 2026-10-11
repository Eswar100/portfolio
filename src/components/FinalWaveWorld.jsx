import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, FileText, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function FinalWaveWorld({ progress }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Active in final zone: 0.90 to 1.00
  let opacity = 0;
  if (progress >= 0.90 && progress < 0.93) {
    opacity = (progress - 0.90) / 0.03;
  } else if (progress >= 0.93) {
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
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Hand-drawn speech bubble pointing to waving character */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(25%, 36vw, 42%)',
          top: 'clamp(20%, 26vh, 32%)',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          transform: 'rotate(2deg)'
        }}
      >
        <div
          className="sketch-border"
          style={{
            background: '#ffffff',
            padding: '10px 16px',
            borderRadius: '16px 16px 16px 2px',
            boxShadow: 'var(--shadow-paper)'
          }}
        >
          <div className="font-hand" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', color: 'var(--ink-primary)', fontWeight: 700 }}>
            Thanks for visiting!
          </div>
          <div className="font-hand" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: 'var(--ink-accent)' }}>
            See you around! 👋
          </div>
        </div>
      </div>

      {/* Main Closing Section — Positioned on the right side */}
      <div
        style={{
          marginLeft: 'auto',
          maxWidth: '620px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
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
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
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
              fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginTop: '8px'
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
            <GithubIcon size={16} /> GITHUB
          </a>

          {/* LinkedIn */}
          <a
            href={developer.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="paper-button paper-button-blueprint interactive"
            style={{ justifyContent: 'center' }}
          >
            <LinkedinIcon size={16} /> LINKEDIN
          </a>

          {/* Email button with copy shortcut */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="paper-button interactive"
            style={{ justifyContent: 'center' }}
          >
            {copiedEmail ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
            {copiedEmail ? 'COPIED!' : 'COPY EMAIL'}
          </button>

          {/* Resume Download */}
          <a
            href={developer.social.resume}
            className="paper-button interactive"
            style={{ justifyContent: 'center', borderColor: 'var(--ink-accent)', color: 'var(--ink-accent)' }}
          >
            <FileText size={16} /> RESUME PDF
          </a>
        </div>

        {/* Email direct line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
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
            paddingTop: '14px',
            marginTop: '12px',
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
