import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Terminal, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

/**
 * ProjectModal
 * High-Integrity Architectural Dossier Modal.
 * 
 * Scroll Requirements:
 * - Isolated internal vertical scrolling for modal card
 * - Locks background page & stops Lenis scroll engine while open
 * - Restores background scrolling on close & React cleanup
 * - overscroll-behavior: contain to prevent scroll chaining
 * - Mouse-wheel, trackpad, and touch scrolling work smoothly inside
 * - Strict black & white / grayscale visual identity
 */

export default function ProjectModal({ project, onClose }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    // ESC to close
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Save initial overflow values
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    // Lock page background scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      data-lenis-prevent
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(18, 19, 22, 0.72)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(14px, 3vw, 30px)',
        overscrollBehavior: 'contain',
        overflow: 'hidden'
      }}
    >
      <div
        ref={contentRef}
        className="blueprint-card"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          maxWidth: '740px',
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          background: '#ffffff',
          border: '2px solid var(--ink-primary)',
          boxShadow: 'var(--shadow-float)',
          padding: 'clamp(20px, 4vw, 36px)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="interactive"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'var(--paper-cream)',
            border: '1px solid var(--ink-primary)',
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          aria-label="Close modal"
        >
          <X size={18} color="var(--ink-primary)" />
        </button>

        {/* Header Tag */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span className="tech-tag" style={{ background: 'var(--paper-cream)', color: 'var(--ink-primary)', fontWeight: 700 }}>
            {project.category}
          </span>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
            ARCHITECTURAL DOSSIER // MONOCHROME
          </span>
        </div>

        {/* Project Title */}
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--ink-primary)',
            marginBottom: '4px',
            paddingRight: '36px'
          }}
        >
          {project.title}
        </h2>
        <p className="font-hand" style={{ fontSize: '1.25rem', color: 'var(--ink-secondary)', marginBottom: '16px' }}>
          {project.tagline}
        </p>

        {/* Stack Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.stack.map((s, i) => (
            <span key={i} className="tech-tag">
              {s}
            </span>
          ))}
        </div>

        {/* Deep Dive Description */}
        <p
          className="font-sans"
          style={{
            fontSize: '0.92rem',
            color: 'var(--ink-secondary)',
            lineHeight: 1.65,
            marginBottom: '20px'
          }}
        >
          {project.description}
        </p>

        {/* Architecture Highlight Box */}
        <div
          style={{
            background: 'var(--paper-cream)',
            borderLeft: '4px solid var(--ink-primary)',
            padding: '12px 16px',
            marginBottom: '22px'
          }}
        >
          <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '4px' }}>
            <Layers size={14} style={{ display: 'inline', marginRight: '6px' }} />
            SYSTEM ARCHITECTURE & CONCURRENCY
          </div>
          <div className="font-sans" style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
            {project.architectureHighlight}
          </div>
        </div>

        {/* API Endpoints Schematic */}
        {project.endpoints && (
          <div style={{ marginBottom: '22px' }}>
            <div className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '8px' }}>
              <Terminal size={14} style={{ display: 'inline', marginRight: '6px' }} />
              REST API ENDPOINTS SPECIFICATION
            </div>
            <div
              style={{
                background: '#121316',
                color: '#f1f1f1',
                padding: '12px 16px',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {project.endpoints.map((ep, idx) => (
                <div key={idx} className="font-mono" style={{ fontSize: '0.74rem', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <span
                    style={{
                      color: '#ffffff',
                      background: '#2c2c2c',
                      padding: '1px 6px',
                      borderRadius: '2px',
                      fontWeight: 700
                    }}
                  >
                    {ep.method}
                  </span>
                  <span style={{ color: '#ffffff' }}>{ep.path}</span>
                  <span style={{ color: '#888888' }}>— {ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '10px',
            marginBottom: '26px'
          }}
        >
          {Object.entries(project.metrics).map(([k, v], mIdx) => (
            <div
              key={mIdx}
              className="sketch-border"
              style={{ padding: '10px 14px', background: 'var(--paper-cream)' }}
            >
              <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                {k}
              </div>
              <div className="font-sans" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink-primary)', marginTop: '2px' }}>
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-button interactive"
            >
              <GithubIcon size={15} /> VIEW CODE ON GITHUB
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-button interactive"
              style={{ borderColor: 'var(--ink-primary)' }}
            >
              <ExternalLink size={15} /> {project.id === 'illvora-interiors' ? 'VISIT LIVE WEBSITE' : 'LAUNCH DEMO'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
