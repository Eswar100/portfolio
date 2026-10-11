import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="blueprint-card"
        style={{
          maxWidth: '740px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          padding: 'clamp(24px, 4vw, 40px)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="interactive"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--paper-cream)',
            border: '1px solid var(--paper-border)',
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span className="tech-tag" style={{ background: 'var(--paper-cream)', color: project.accent }}>
            {project.category}
          </span>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
            ARCHITECTURAL DOSSIER
          </span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--ink-primary)',
            marginBottom: '4px'
          }}
        >
          {project.title}
        </h2>
        <p className="font-hand" style={{ fontSize: '1.25rem', color: 'var(--ink-secondary)', marginBottom: '16px' }}>
          {project.tagline}
        </p>

        {/* Stack */}
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
            borderLeft: `4px solid ${project.accent}`,
            padding: '12px 16px',
            marginBottom: '24px'
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
          <div style={{ marginBottom: '24px' }}>
            <div className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '8px' }}>
              <Terminal size={14} style={{ display: 'inline', marginRight: '6px' }} />
              REST API ENDPOINTS SPECIFICATION
            </div>
            <div
              style={{
                background: '#121316',
                color: '#f1f1f1',
                padding: '14px 18px',
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
                      color: ep.method === 'POST' ? '#38bdf8' : ep.method === 'GET' ? '#4ade80' : ep.method === 'PUT' ? '#fbbf24' : '#f87171',
                      fontWeight: 700
                    }}
                  >
                    {ep.method}
                  </span>
                  <span style={{ color: '#ffffff' }}>{ep.path}</span>
                  <span style={{ color: '#94a3b8' }}>— {ep.desc}</span>
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
            gap: '12px',
            marginBottom: '28px'
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="paper-button interactive"
          >
            <GithubIcon size={15} /> VIEW CODE ON GITHUB
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="paper-button paper-button-blueprint interactive"
          >
            <ExternalLink size={15} /> LAUNCH DEMO
          </a>
        </div>
      </div>
    </div>
  );
}
