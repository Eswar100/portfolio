import React, { useEffect, useState } from 'react';
import { frameManager } from '../services/CharacterFrameManager';

/**
 * OpeningLoader
 * Loading & Initialization experience matching the user's reference drawing.
 * 
 * Framing & Features:
 * - Bottom-right: ● ESWAR.RUNTIME / BOOT SEQUENCE
 * - Center (over chin/neck): 3-digit percentage, status, and thin progress bar
 * - Sides: faint graphite pencil code snippets & architectural sketch marks
 * - Automatic transition: LOADING -> INITIALIZED -> short pause -> automatic camera pull-back
 * - Strictly black, white & grayscale
 */

export default function OpeningLoader({ progress, onEnterWorld }) {
  const [loadInfo, setLoadInfo] = useState(frameManager.getProgress());

  /* =========================================================
     FRAME LOADING PROGRESS
     ========================================================= */
  useEffect(() => {
    return frameManager.subscribeProgress((p) => {
      setLoadInfo(p);
    });
  }, []);

  /* =========================================================
     AUTOMATIC CAMERA PULL-BACK TRANSITION
     Once initial critical frames are ready:
     - show INITIALIZED.
     - wait briefly
     - trigger automatic camera pull-back smoothly
     ========================================================= */
  useEffect(() => {
    if (!loadInfo.initialReady) {
      return;
    }

    if (progress >= 0.02) {
      return;
    }

    const timer = setTimeout(() => {
      if (onEnterWorld) {
        onEnterWorld();
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [loadInfo.initialReady, progress, onEnterWorld]);

  const percentage = Math.min(100, Math.max(0, Math.round(loadInfo.percentage || 0)));
  const isReady = loadInfo.initialReady;

  // Fade out as camera pulls back (0% fully visible, 8% faded out)
  const opacity = Math.max(0, 1 - progress / 0.08);

  if (opacity <= 0.01) {
    return null;
  }

  const formattedPercentage = String(percentage).padStart(3, '0') + '%';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 4vw, 44px)',
        background: 'transparent',
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* =====================================================
          TOP BAR
          ===================================================== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        {/* TOP LEFT */}
        <div />

        {/* TOP RIGHT TELEMETRY */}
        <div
          className="font-mono"
          style={{
            textAlign: 'right',
            fontSize: '0.72rem',
            color: 'var(--ink-muted)',
            letterSpacing: '0.04em'
          }}
        >
          <div>[INIT_STATE: {isReady ? 'READY' : 'ALLOCATING'}]</div>
          <div>MEM_POOL: 512MB / OK</div>
        </div>
      </div>

      {/* =====================================================
          FAINT SIDE PENCIL SKETCHES (Reference Image)
          ===================================================== */}
      {/* Left side: small graph/box + code annotation */}
      <div
        className="loader-side-annotation"
        style={{
          position: 'absolute',
          top: '32%',
          left: 'clamp(16px, 3vw, 48px)',
          opacity: 0.55,
          pointerEvents: 'none'
        }}
      >
        <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
          <rect x="5" y="10" width="36" height="30" stroke="var(--ink-secondary)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="5" y1="40" x2="60" y2="40" stroke="var(--ink-secondary)" strokeWidth="1" />
          <path d="M5 40 L 25 22 L 35 28 L 55 12" stroke="var(--ink-primary)" strokeWidth="1.2" />
          <text x="5" y="60" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-muted)">order</text>
          <text x="40" y="36" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-muted)">log</text>
        </svg>
        <div className="font-mono" style={{ fontSize: '0.66rem', color: 'var(--ink-muted)', lineHeight: 1.4, marginTop: '2px' }}>
          <div>public class edwarhasloot &#123;</div>
          <div style={{ paddingLeft: '8px' }}>string test memal = nels-person();</div>
          <div style={{ paddingLeft: '8px' }}>if (mem != null) &#123;</div>
          <div>&#125;</div>
        </div>
      </div>

      {/* Right side: faint code snippet */}
      <div
        className="loader-side-annotation"
        style={{
          position: 'absolute',
          top: '30%',
          right: 'clamp(16px, 3vw, 48px)',
          opacity: 0.55,
          textAlign: 'right',
          pointerEvents: 'none'
        }}
      >
        <div className="font-mono" style={{ fontSize: '0.66rem', color: 'var(--ink-muted)', lineHeight: 1.45 }}>
          <div>fac-ched_mn() -&gt; ae-cotme</div>
          <div>// chan (s-em ...</div>
          <div>segssont = (os ...</div>
          <div>prosatentelone ...</div>
          <div>&#125;</div>
        </div>
      </div>

      {/* =====================================================
          CENTER LOADING STATUS (Positioned precisely over chin/neck)
          Matches reference:
          073%
          ESTABLISHING CONNECTION...
          ───────────── (Progress bar)
          ===================================================== */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 'clamp(16%, 22vh, 26%)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '380px',
          pointerEvents: 'none'
        }}
      >
        {/* Percentage: Large clean typography */}
        <div
          className="font-mono"
          style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--ink-primary)',
            marginBottom: '4px',
            textShadow: '0 1px 3px rgba(255,255,255,0.8)'
          }}
        >
          {formattedPercentage}
        </div>

        {/* Status Message */}
        <div
          className="font-mono"
          style={{
            fontSize: 'clamp(0.72rem, 1.1vw, 0.82rem)',
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: 'var(--ink-secondary)',
            marginBottom: '10px',
            textTransform: 'uppercase'
          }}
        >
          {isReady ? 'INITIALIZED.' : 'ESTABLISHING CONNECTION...'}
        </div>

        {/* Clean Minimal Progress Bar */}
        <div
          style={{
            width: '200px',
            height: '2.5px',
            background: 'var(--paper-border)',
            margin: '0 auto',
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
              width: `${Math.max(3, percentage)}%`,
              background: 'var(--ink-primary)',
              transition: 'width 0.2s ease'
            }}
          />
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR (Reference Image: ● ESWAR.RUNTIME / BOOT SEQUENCE)
          ===================================================== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}
      >
        {/* BOTTOM LEFT */}
        <div
          className="font-mono"
          style={{
            fontSize: '0.72rem',
            color: 'var(--ink-muted)'
          }}
        >
          SEC_LEVEL: PUBLIC // PORTFOLIO_JOURNEY
        </div>

        {/* BOTTOM RIGHT (Reference Image) */}
        <div
          style={{
            textAlign: 'right',
            borderRight: '2px solid var(--ink-primary)',
            paddingRight: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
            <span className="status-dot" style={{ width: '6px', height: '6px' }} />
            <span
              className="font-mono"
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--ink-primary)'
              }}
            >
              ESWAR.RUNTIME
            </span>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: '0.68rem',
              color: 'var(--ink-muted)',
              letterSpacing: '0.06em',
              marginTop: '2px'
            }}
          >
            BOOT SEQUENCE
          </div>
        </div>
      </div>
    </div>
  );
}