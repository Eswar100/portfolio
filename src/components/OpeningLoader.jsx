import React, { useEffect, useState } from 'react';
import { frameManager } from '../services/CharacterFrameManager';

export default function OpeningLoader({ progress, onEnterWorld }) {
  const [loadInfo, setLoadInfo] = useState(frameManager.getProgress());

  useEffect(() => {
    return frameManager.subscribeProgress((p) => {
      setLoadInfo(p);
    });
  }, []);

  // When progress > 0.08, the loader has faded out as camera pulls back
  const opacity = Math.max(0, 1 - progress / 0.08);
  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: opacity > 0.6 ? 'auto' : 'none',
        opacity: opacity,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 5vw, 48px)',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Top technical annotations */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span className="tech-tag" style={{ background: '#fff', borderColor: 'var(--ink-primary)' }}>
            <span className="status-dot" /> ESWAR.RUNTIME // v2.6.4
          </span>
          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '6px' }}>
            JVM 21 LTS • SPRING CONTEXT BOOTSTRAP
          </div>
        </div>

        <div className="font-mono" style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
          <div>[INIT_STATE: ALLOCATING]</div>
          <div>MEM_POOL: 512MB / OK</div>
        </div>
      </div>

      {/* Center opening focal caption */}
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto', pointerEvents: 'auto' }}>
        <div
          className="font-hand"
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            color: 'var(--ink-accent)',
            marginBottom: '8px',
            transform: 'rotate(-2deg)'
          }}
        >
          establishing connection with Eswar...
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--ink-primary)',
            marginBottom: '16px'
          }}
        >
          {loadInfo.initialReady ? 'INITIALIZED.' : 'LOADING...'}
        </h1>

        <div
          style={{
            width: '240px',
            height: '3px',
            background: 'var(--paper-border)',
            margin: '0 auto 20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${Math.max(15, loadInfo.percentage)}%`,
              background: 'var(--ink-primary)',
              transition: 'width 0.2s ease'
            }}
          />
        </div>

        <p className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', marginBottom: '24px' }}>
          {loadInfo.initialReady
            ? 'ASSETS LOADED. SCROLL DOWN TO PULL BACK CAMERA.'
            : `STREAMING FRAMES [${loadInfo.loaded}/${loadInfo.total}]`}
        </p>

        {loadInfo.initialReady && (
          <button
            onClick={onEnterWorld}
            className="paper-button interactive"
            style={{ fontSize: '0.82rem', padding: '10px 24px' }}
          >
            ENTER WORLD ↓
          </button>
        )}
      </div>

      {/* Bottom hint */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
          SEC_LEVEL: PUBLIC // PORTFOLIO_JOURNEY
        </div>
        <div className="font-mono animate-bounce-down" style={{ fontSize: '0.75rem', color: 'var(--ink-primary)' }}>
          SCROLL TO EXPLORE ↓
        </div>
      </div>
    </div>
  );
}
