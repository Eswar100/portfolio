import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, FileText, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

/**
 * FinalWaveWorld
 * Final Destination / Contact Scene.
 * 
 * Features:
 * - Dedicated Final Character Container prepared for seamless Transparent WebM drop-in.
 * - Stable position, responsive sizing, floor-aligned, zero clipping, transparent background.
 * - Preserved narrative content: "Thanks for visiting!", "See you around!", "END OF RUNTIME JOURNEY",
 *   "EXIT STATUS: 0 (SUCCESS)", social/contact links, and email copy.
 */

export default function FinalWaveWorld({ progress, webmSrc = null }) {
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
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        opacity,
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(20px, 6vw, 80px)',
        overflow: 'hidden',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* ========================================================
          DEDICATED FINAL CHARACTER CONTAINER (READY FOR WEBM)
          ========================================================
          - Stable absolute coordinates aligned with gallery floor.
          - Sized to match 16:9 character proportions.
          - Set `webmSrc="/path/to/character_wave.webm"` to replace anytime.
          - Zero layout shift, no clipping, transparent background.
      */}
      <div
        id="final-character-slot"
        style={{
          position: 'absolute',
          left: 'clamp(6%, 16vw, 24%)',
          bottom: '8vh',
          width: 'clamp(300px, 36vw, 540px)',
          height: '70vh',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 26,
          overflow: 'visible'
        }}
      >
        {webmSrc ? (
          /* When transparent WebM is available, it plays here seamlessly */
          <video
            autoPlay
            loop
            muted
            playsInline
            src={webmSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: 'transparent'
            }}
          />
        ) : (
          /* Fallback standing / waving pose matching character line style */
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            {/* Grounding paper shadow */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                width: '180px',
                height: '18px',
                borderRadius: '50%',
                background: 'rgba(32, 28, 24, 0.18)',
                filter: 'blur(4px)'
              }}
            />
            <img
              src="/assets/character/walk/Timeline 1_00086400.webp"
              alt="Character greeting"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                position: 'relative',
                zIndex: 2
              }}
            />
          </div>
        )}

        {/* Hand-drawn speech bubble pointing to character */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            right: '-15%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            transform: 'rotate(2deg)',
            zIndex: 30
          }}
        >
          <div
            className="sketch-border"
            style={{
              background: '#ffffff',
              padding: '10px 16px',
              borderRadius: '16px 16px 16px 2px',
              boxShadow: 'var(--shadow-paper)',
              whiteSpace: 'nowrap'
            }}
          >
            <div className="font-hand" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', color: 'var(--ink-primary)', fontWeight: 700 }}>
              Thanks for visiting!
            </div>
            <div className="font-hand" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', color: 'var(--ink-accent)' }}>
              See you around! 👋
            </div>
          </div>
        </div>
      </div>

      {/* Main Closing & Contact Dossier — Positioned cleanly on the right side */}
      <div
        style={{
          marginLeft: 'auto',
          maxWidth: '620px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          zIndex: 28
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
            className="paper-button paper-button-blueprint interactive"
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
            {copiedEmail ? <Check size={15} color="#16a34a" /> : <Copy size={15} />}
            {copiedEmail ? 'COPIED!' : 'COPY EMAIL'}
          </button>

          {/* Resume Download */}
          <a
            href={developer.social.resume}
            className="paper-button interactive"
            style={{ justifyContent: 'center', borderColor: 'var(--ink-accent)', color: 'var(--ink-accent)' }}
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
