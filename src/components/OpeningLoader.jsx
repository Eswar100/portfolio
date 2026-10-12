import React, { useEffect, useState } from 'react';
import { frameManager } from '../services/CharacterFrameManager';

export default function OpeningLoader({ progress, onEnterWorld }) {
  const [loadInfo, setLoadInfo] = useState(
    frameManager.getProgress()
  );

  /* =========================================================
     FRAME LOADING PROGRESS
     ========================================================= */

  useEffect(() => {
    return frameManager.subscribeProgress((p) => {
      setLoadInfo(p);
    });
  }, []);

  /* =========================================================
     AUTOMATIC TRANSITION
     
     Once the initial character/frame assets are ready:
     - show INITIALIZED
     - wait briefly
     - trigger the existing world/camera transition
     ========================================================= */

  useEffect(() => {
    if (!loadInfo.initialReady) {
      return;
    }

    // Only trigger while we are still at the initial position.
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
  }, [
    loadInfo.initialReady,
    progress,
    onEnterWorld,
  ]);

  /* =========================================================
     LOADING PERCENTAGE
     ========================================================= */

  const percentage = Math.min(
    100,
    Math.max(
      0,
      Math.round(loadInfo.percentage || 0)
    )
  );

  const isReady = loadInfo.initialReady;

  /* =========================================================
     FADE OUT AS CAMERA PULLS BACK
     
     Existing behavior:
     0%   → fully visible
     8%   → completely faded
     ========================================================= */

  const opacity = Math.max(
    0,
    1 - progress / 0.08
  );

  if (opacity <= 0.01) {
    return null;
  }

  /* =========================================================
     UI
     ========================================================= */

  return (
    <div
      style={{
        position: 'fixed',

        top: 0,
        left: 0,

        width: '100vw',
        height: '100vh',

        zIndex: 50,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        padding:
          'clamp(24px, 5vw, 48px)',

        background: 'transparent',

        /*
         * No button anymore.
         * Loader is only a visual overlay.
         */
        pointerEvents: 'none',

        overflow: 'hidden',

        opacity,

        transition:
          'opacity 0.2s ease-out',
      }}
    >

      {/* =====================================================
          TOP TECHNICAL INFORMATION
          ===================================================== */}

      <div
        style={{
          display: 'flex',

          justifyContent:
            'space-between',

          alignItems:
            'flex-start',

          gap: '20px',
        }}
      >

        {/* TOP LEFT */}

        <div>

          <span
            className="tech-tag"
            style={{
              background: '#fff',

              borderColor:
                'var(--ink-primary)',
            }}
          >
            <span className="status-dot" />

            ESWAR.RUNTIME // v2.6.4
          </span>

          <div
            className="font-mono"
            style={{
              fontSize: '0.75rem',

              color:
                'var(--ink-muted)',

              marginTop: '6px',
            }}
          >
            JVM 21 LTS • SPRING CONTEXT BOOTSTRAP
          </div>

        </div>


        {/* TOP RIGHT */}

        <div
          className="font-mono"
          style={{
            textAlign: 'right',

            fontSize: '0.75rem',

            color:
              'var(--ink-muted)',
          }}
        >

          <div>
            [INIT_STATE:{' '}
            {isReady
              ? 'READY'
              : 'ALLOCATING'}
            ]
          </div>

          <div>
            MEM_POOL: 512MB / OK
          </div>

        </div>

      </div>


      {/* =====================================================
          CENTER LOADING UI
          ===================================================== */}

      <div
        style={{
          textAlign: 'center',

          width: '100%',

          maxWidth: '640px',

          margin: '0 auto',
        }}
      >

        {/* HANDWRITTEN STATUS */}

        <div
          className="font-hand"
          style={{
            fontSize:
              'clamp(1.5rem, 3.5vw, 2.2rem)',

            color:
              'var(--ink-accent)',

            marginBottom: '8px',

            transform:
              'rotate(-2deg)',
          }}
        >
          {isReady
            ? 'connection established...'
            : 'establishing connection with Eswar...'}
        </div>


        {/* MAIN STATUS */}

        <h1
          className="font-display"
          style={{
            fontSize:
              'clamp(2rem, 5vw, 3.4rem)',

            fontWeight: 700,

            letterSpacing:
              '-0.03em',

            lineHeight: 1.1,

            color:
              'var(--ink-primary)',

            marginBottom: '16px',
          }}
        >
          {isReady
            ? 'INITIALIZED.'
            : 'LOADING...'}
        </h1>


        {/* PROGRESS BAR */}

        <div
          style={{
            width: '240px',

            height: '3px',

            background:
              'var(--paper-border)',

            margin:
              '0 auto 20px',

            position: 'relative',

            overflow: 'hidden',
          }}
        >

          <div
            style={{
              position: 'absolute',

              top: 0,
              left: 0,

              height: '100%',

              width:
                `${Math.max(
                  2,
                  percentage
                )}%`,

              background:
                'var(--ink-primary)',

              transition:
                'width 0.2s ease',
            }}
          />

        </div>


        {/* STATUS TEXT */}

        <p
          className="font-mono"
          style={{
            fontSize: '0.78rem',

            color:
              'var(--ink-secondary)',

            marginBottom: '24px',
          }}
        >
          {isReady
            ? 'ASSETS LOADED. PULLING BACK CAMERA...'
            : `STREAMING FRAMES [${loadInfo.loaded}/${loadInfo.total}]`}
        </p>

      </div>


      {/* =====================================================
          BOTTOM INFORMATION
          ===================================================== */}

      <div
        style={{
          display: 'flex',

          justifyContent:
            'space-between',

          alignItems:
            'flex-end',

          gap: '20px',
        }}
      >

        {/* BOTTOM LEFT */}

        <div
          className="font-mono"
          style={{
            fontSize: '0.72rem',

            color:
              'var(--ink-muted)',
          }}
        >
          SEC_LEVEL: PUBLIC // PORTFOLIO_JOURNEY
        </div>


        {/* BOTTOM RIGHT */}

        <div
          className="font-mono"
          style={{
            fontSize: '0.75rem',

            color:
              'var(--ink-primary)',
          }}
        >
          {isReady
            ? 'CAMERA PULLBACK ↓'
            : 'LOADING SYSTEM...'}
        </div>

      </div>

    </div>
  );
}