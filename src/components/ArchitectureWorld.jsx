import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Database, Server, Cpu, Globe, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ArchitectureWorld({ progress }) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(1); // Controller by default

  // Active between 0.58 and 0.78
  let opacity = 0;
  if (progress >= 0.58 && progress < 0.62) {
    opacity = (progress - 0.58) / 0.04;
  } else if (progress >= 0.62 && progress <= 0.74) {
    opacity = 1;
  } else if (progress > 0.74 && progress <= 0.78) {
    opacity = Math.max(0, 1 - (progress - 0.74) / 0.04);
  }

  if (opacity <= 0.01) return null;

  const { backendArchitecture } = PORTFOLIO_DATA;
  const nodes = backendArchitecture.nodes;
  const activeNode = nodes[activeNodeIndex];

  const nodeIcons = [
    <Globe size={18} />,
    <Server size={18} />,
    <Cpu size={18} />,
    <Terminal size={18} />,
    <Database size={18} />
  ];

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
        padding: 'clamp(20px, 5vw, 60px)',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Blueprint Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="tech-tag" style={{ background: '#fff', borderColor: 'var(--ink-blueprint)', color: 'var(--ink-blueprint)' }}>
            CORE SYSTEM INSTALLATION // LEVEL 02
          </span>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
            THREAD POOL: [ACTIVE = 8, QUEUED = 0]
          </span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--ink-primary)',
            marginTop: '8px'
          }}
        >
          {backendArchitecture.title}
        </h2>
        <p className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', marginTop: '2px' }}>
          {backendArchitecture.subtitle}
        </p>
      </div>

      {/* Main Architecture Interactive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Left: Interactive Node Pipeline */}
        <div
          className="sketch-border"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            padding: '20px',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '4px' }}>
            CLICK NODE TO INSPECT SUBSYSTEM INTERNALS:
          </div>

          {nodes.map((node, idx) => {
            const isSelected = idx === activeNodeIndex;
            return (
              <React.Fragment key={node.id}>
                <div
                  className="interactive"
                  onClick={() => setActiveNodeIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: isSelected ? 'var(--paper-cream)' : 'transparent',
                    border: isSelected ? '1.5px solid var(--ink-blueprint)' : '1px solid var(--paper-border)',
                    boxShadow: isSelected ? '3px 3px 0 var(--ink-blueprint)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        color: isSelected ? 'var(--ink-blueprint)' : 'var(--ink-secondary)',
                        display: 'flex'
                      }}
                    >
                      {nodeIcons[idx]}
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)' }}>
                        {node.name}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
                        {node.type}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="status-dot" style={{ background: isSelected ? '#22c55e' : '#94a3b8' }} />
                    <ChevronRight size={16} color={isSelected ? 'var(--ink-blueprint)' : 'var(--ink-muted)'} />
                  </div>
                </div>

                {/* Connecting arrow line between nodes */}
                {idx < nodes.length - 1 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '14px',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: '2px',
                        height: '100%',
                        background: 'var(--ink-blueprint)',
                        opacity: 0.4
                      }}
                    />
                    {/* Animated pulse dot travelling along pipeline */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--ink-accent)'
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Technical Inspector Dossier for Selected Node */}
        <div
          className="blueprint-card"
          style={{
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.95)',
            position: 'relative'
          }}
        >
          <div className="reg-mark" style={{ top: '10px', right: '10px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="tech-tag" style={{ background: 'var(--paper-cream)', color: 'var(--ink-blueprint)' }}>
              NODE INSPECTOR // {activeNode.name}
            </span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} /> 200 OK
            </span>
          </div>

          <h3
            className="font-display"
            style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--ink-primary)',
              marginBottom: '6px'
            }}
          >
            {activeNode.type}
          </h3>

          <div
            className="font-hand"
            style={{
              fontSize: '1.2rem',
              color: 'var(--ink-accent)',
              marginBottom: '16px'
            }}
          >
            {activeNode.annotation}
          </div>

          <p
            className="font-sans"
            style={{
              fontSize: '0.88rem',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6,
              marginBottom: '18px'
            }}
          >
            {activeNode.details}
          </p>

          {/* Technical Specifications */}
          <div
            style={{
              background: '#121316',
              color: '#eaeaea',
              padding: '14px 18px',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              lineHeight: 1.6
            }}
          >
            <div style={{ color: '#94a3b8', marginBottom: '4px', fontSize: '0.68rem' }}>
              $ sys_probe --inspect --target={activeNode.id}
            </div>
            <div style={{ color: '#4ade80' }}>
              {activeNode.specs}
            </div>
            <div style={{ color: '#cbd5e1', marginTop: '6px' }}>
              STATUS: NOMINAL • METRICS REPLICATED • ACID VERIFIED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
