import React from 'react';

/**
 * FallSpaceTransition
 * Reusable hand-drawn space/fall transition world.
 * Seamlessly integrates existing asteroid PNGs, satellite PNG, and lightweight
 * graphite doodles, motion streaks, wind lines, and technical marks with independent parallax.
 */

// Master reusable fall objects configurations for each transition phase
const TRANSITION_CONFIGS = {
  // Transition 1: Hero descent into orbit -> Project Wall
  'hero-to-projects': [
    // Background technical doodles & orbital marks (Layer 2)
    { id: 'tech-orbit-1', type: 'technical', subtype: 'orbit-arc', x: 72, y: 25, speed: 0.35, layer: 'background' },
    { id: 'tech-cross-1', type: 'technical', subtype: 'crosshair', x: 20, y: 35, speed: 0.2, layer: 'background', label: 'LOC: 37°N // ORBIT_ENTRY' },
    { id: 'tech-gravity-1', type: 'technical', subtype: 'gravity-vector', x: 82, y: 60, speed: 0.4, layer: 'background', label: 'g = 9.81 m/s² ↓' },
    { id: 'arrow-down-1', type: 'arrow', x: 15, y: 70, speed: 0.6, layer: 'background' },

    // Distant Asteroid PNGs (Layer 3 - smaller, slower, behind character)
    { id: 'ast-dist-2', type: 'asteroid', src: '/assets/character/doodles/astroid2.png', x: 12, y: 28, scale: 0.55, speed: 0.3, layer: 'distant', rot: 15 },
    { id: 'ast-dist-5', type: 'asteroid', src: '/assets/character/doodles/astroid5.png', x: 88, y: 38, scale: 0.6, speed: 0.45, layer: 'distant', rot: -25 },

    // Distant Satellite PNG (Layer 4 - independent horizontal & vertical drift)
    { id: 'sat-main', type: 'satellite', src: '/assets/character/doodles/satellite.png', x: 78, y: 22, scale: 0.8, speedX: -0.5, speedY: 0.28, layer: 'distant', rot: 8 },

    // Midground Asteroids (Layer 5 - larger, faster, positioned to the sides so character remains hero)
    { id: 'ast-mid-1', type: 'asteroid', src: '/assets/character/doodles/astroid1.png', x: 8, y: 65, scale: 0.85, speed: 0.75, layer: 'midground', rot: 40 },
    { id: 'ast-mid-4', type: 'asteroid', src: '/assets/character/doodles/astroid4.png', x: 85, y: 72, scale: 0.9, speed: 0.85, layer: 'midground', rot: -15 },

    // Floating particles & space debris (Layer 5)
    { id: 'part-1', type: 'particle', x: 28, y: 40, size: 4, speed: 0.5, layer: 'midground' },
    { id: 'part-2', type: 'particle', x: 68, y: 55, size: 6, speed: 0.65, layer: 'midground' },
    { id: 'part-3', type: 'particle', x: 38, y: 80, size: 3, speed: 0.4, layer: 'midground' },
    { id: 'part-4', type: 'particle', x: 75, y: 88, size: 5, speed: 0.7, layer: 'midground' },

    // Foreground motion streaks & wind lines (Layer 7 - fast rushing lines along periphery)
    { id: 'wind-1', type: 'wind', x: 6, y: 15, length: 140, speed: 1.4, layer: 'foreground' },
    { id: 'wind-2', type: 'wind', x: 92, y: 30, length: 180, speed: 1.6, layer: 'foreground' },
    { id: 'streak-1', type: 'streak', x: 18, y: 50, length: 110, speed: 1.3, layer: 'foreground' },
    { id: 'streak-2', type: 'streak', x: 82, y: 45, length: 130, speed: 1.5, layer: 'foreground' }
  ],

  // Transition 2: Projects Wall -> Tech Stack Wall
  'projects-to-tech': [
    { id: 'tech-orbit-2', type: 'technical', subtype: 'orbit-arc', x: 25, y: 30, speed: 0.3, layer: 'background' },
    { id: 'tech-cross-2', type: 'technical', subtype: 'crosshair', x: 80, y: 25, speed: 0.25, layer: 'background', label: 'ALT: 4200M // TRANSIENT' },
    { id: 'tech-gravity-2', type: 'technical', subtype: 'gravity-vector', x: 14, y: 55, speed: 0.45, layer: 'background', label: 'V_REL: -24.0 m/s' },

    { id: 'ast-dist-3', type: 'asteroid', src: '/assets/character/doodles/astroid3.png', x: 82, y: 25, scale: 0.6, speed: 0.35, layer: 'distant', rot: 35 },
    { id: 'ast-dist-1', type: 'asteroid', src: '/assets/character/doodles/astroid1.png', x: 16, y: 40, scale: 0.5, speed: 0.4, layer: 'distant', rot: -20 },

    // Satellite drifting across from left
    { id: 'sat-2', type: 'satellite', src: '/assets/character/doodles/satellite.png', x: 15, y: 20, scale: 0.75, speedX: 0.4, speedY: 0.3, layer: 'distant', rot: -12 },

    { id: 'ast-mid-2', type: 'asteroid', src: '/assets/character/doodles/astroid2.png', x: 86, y: 62, scale: 0.95, speed: 0.8, layer: 'midground', rot: 50 },
    { id: 'ast-mid-5', type: 'asteroid', src: '/assets/character/doodles/astroid5.png', x: 10, y: 70, scale: 0.85, speed: 0.9, layer: 'midground', rot: -40 },

    { id: 'part-2-1', type: 'particle', x: 22, y: 35, size: 5, speed: 0.6, layer: 'midground' },
    { id: 'part-2-2', type: 'particle', x: 78, y: 65, size: 4, speed: 0.5, layer: 'midground' },
    { id: 'part-2-3', type: 'particle', x: 32, y: 75, size: 6, speed: 0.7, layer: 'midground' },

    { id: 'wind-2-1', type: 'wind', x: 8, y: 20, length: 160, speed: 1.5, layer: 'foreground' },
    { id: 'wind-2-2', type: 'wind', x: 90, y: 45, length: 200, speed: 1.7, layer: 'foreground' },
    { id: 'streak-2-1', type: 'streak', x: 22, y: 55, length: 120, speed: 1.4, layer: 'foreground' }
  ],

  // Transition 3: Tech Stack Wall -> Final Section
  'tech-to-final': [
    { id: 'tech-cross-3', type: 'technical', subtype: 'crosshair', x: 75, y: 35, speed: 0.25, layer: 'background', label: 'FINAL DESCENT // BASE REACHED' },
    { id: 'tech-gravity-3', type: 'technical', subtype: 'gravity-vector', x: 20, y: 65, speed: 0.4, layer: 'background', label: 'DECELERATING -> TOUCHDOWN' },

    { id: 'ast-dist-4', type: 'asteroid', src: '/assets/character/doodles/astroid4.png', x: 14, y: 26, scale: 0.55, speed: 0.35, layer: 'distant', rot: 10 },
    { id: 'ast-dist-2b', type: 'asteroid', src: '/assets/character/doodles/astroid2.png', x: 85, y: 32, scale: 0.5, speed: 0.3, layer: 'distant', rot: -15 },

    { id: 'sat-3', type: 'satellite', src: '/assets/character/doodles/satellite.png', x: 68, y: 18, scale: 0.7, speedX: -0.35, speedY: 0.25, layer: 'distant', rot: 14 },

    { id: 'ast-mid-3', type: 'asteroid', src: '/assets/character/doodles/astroid3.png', x: 88, y: 68, scale: 0.9, speed: 0.85, layer: 'midground', rot: -30 },

    { id: 'part-3-1', type: 'particle', x: 25, y: 50, size: 5, speed: 0.5, layer: 'midground' },
    { id: 'part-3-2', type: 'particle', x: 72, y: 60, size: 4, speed: 0.6, layer: 'midground' },

    { id: 'wind-3-1', type: 'wind', x: 5, y: 25, length: 150, speed: 1.6, layer: 'foreground' },
    { id: 'wind-3-2', type: 'wind', x: 94, y: 35, length: 170, speed: 1.5, layer: 'foreground' },
    { id: 'streak-3-1', type: 'streak', x: 82, y: 50, length: 130, speed: 1.3, layer: 'foreground' }
  ]
};

export default function FallSpaceTransition({
  progress,
  startProgress = 0.18,
  endProgress = 0.28,
  variant = 'hero-to-projects'
}) {
  // Check visibility within scroll window with gentle buffer for fade in/out
  if (progress < startProgress - 0.02 || progress > endProgress + 0.02) {
    return null;
  }

  // Normalized local progress (0.0 to 1.0)
  const localP = Math.max(0, Math.min(1, (progress - startProgress) / (endProgress - startProgress)));

  // Calculate overall opacity (smooth fade-in and fade-out at edges)
  let opacity = 0;
  if (localP <= 0.15) {
    opacity = localP / 0.15;
  } else if (localP >= 0.85) {
    opacity = Math.max(0, 1 - (localP - 0.85) / 0.15);
  } else {
    opacity = 1;
  }

  const objects = TRANSITION_CONFIGS[variant] || TRANSITION_CONFIGS['hero-to-projects'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 0.2s ease-out',
        overflow: 'hidden'
      }}
    >
      {/* Fall Telemetry HUD Banner (Subtle graphite annotation) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(20px, 4vh, 40px)',
          left: 'clamp(20px, 4vw, 50px)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          color: 'var(--ink-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 6
        }}
      >
        <span className="tech-tag" style={{ background: '#fff' }}>
          TRAJECTORY // TRANSIT
        </span>
        <span>FALLING VELOCITY: {(localP * 9.8 + 4.2).toFixed(1)} m/s</span>
      </div>

      {objects.map((obj) => {
        // Vertical translation based on speed: objects rush upward relative to descending character
        const translateY = (localP - 0.5) * -400 * (obj.speed || 1);
        const translateX = obj.speedX ? (localP - 0.5) * 200 * obj.speedX : 0;

        // Map layer to z-index (Character is zIndex: 20)
        let zIndex = 8;
        if (obj.layer === 'background') zIndex = 5;
        if (obj.layer === 'distant') zIndex = 8;
        if (obj.layer === 'midground') zIndex = 12;
        if (obj.layer === 'foreground') zIndex = 22; // Peripheral foreground lines

        // 1. ASTEROID PNG (Original asset, untouched, transparent)
        if (obj.type === 'asteroid') {
          return (
            <div
              key={obj.id}
              style={{
                position: 'absolute',
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) rotate(${obj.rot || 0}deg) scale(${obj.scale || 1})`,
                zIndex,
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            >
              <img
                src={obj.src}
                alt="Asteroid sketch"
                style={{
                  display: 'block',
                  maxWidth: '120px',
                  height: 'auto',
                  filter: 'grayscale(100%) drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.15))'
                }}
              />
            </div>
          );
        }

        // 2. SATELLITE PNG (Original asset, untouched, independent drift)
        if (obj.type === 'satellite') {
          return (
            <div
              key={obj.id}
              style={{
                position: 'absolute',
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) rotate(${obj.rot || 0}deg) scale(${obj.scale || 0.8})`,
                zIndex,
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            >
              <img
                src={obj.src}
                alt="Satellite sketch"
                style={{
                  display: 'block',
                  maxWidth: '220px',
                  height: 'auto',
                  filter: 'grayscale(100%) drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.12))'
                }}
              />
              <div
                className="font-mono"
                style={{
                  fontSize: '0.62rem',
                  color: 'var(--ink-secondary)',
                  marginTop: '4px',
                  textAlign: 'center',
                  opacity: 0.85
                }}
              >
                SAT-ORBIT // BEACON
              </div>
            </div>
          );
        }

        // 3. PENCIL WIND / AIR FLOW CURVES (Hand-drawn SVG curves)
        if (obj.type === 'wind') {
          return (
            <div
              key={obj.id}
              style={{
                position: 'absolute',
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: `translate(-50%, -50%) translateY(${translateY * 1.5}px)`,
                zIndex,
                opacity: 0.65
              }}
            >
              <svg width="40" height={obj.length || 140} viewBox="0 0 40 140" fill="none">
                <path
                  d="M20 0 C 15 35, 30 75, 12 110 C 6 125, 22 135, 18 140"
                  stroke="var(--ink-secondary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 3"
                />
              </svg>
            </div>
          );
        }

        // 4. MOTION STREAKS (Graphite pencil speed lines rushing vertically)
        if (obj.type === 'streak') {
          return (
            <div
              key={obj.id}
              style={{
                position: 'absolute',
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: `translate(-50%, -50%) translateY(${translateY * 1.6}px)`,
                zIndex,
                opacity: 0.5
              }}
            >
              <svg width="12" height={obj.length || 120} viewBox="0 0 12 120" fill="none">
                <line
                  x1="6"
                  y1="0"
                  x2="6"
                  y2={obj.length || 120}
                  stroke="var(--ink-primary)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                />
              </svg>
            </div>
          );
        }

        // 5. SMALL PENCIL ARROWS
        if (obj.type === 'arrow') {
          return (
            <div
              key={obj.id}
              style={{
                position: 'absolute',
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: `translate(-50%, -50%) translateY(${translateY}px)`,
                zIndex,
                opacity: 0.7
              }}
            >
              <svg width="24" height="48" viewBox="0 0 24 48" fill="none">
                <line x1="12" y1="2" x2="12" y2="44" stroke="var(--ink-primary)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 3" />
                <path d="M4 36 L12 44 L20 36" stroke="var(--ink-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          );
        }

        // 6. TECHNICAL SKETCH MARKS (Coordinate crosses, orbit arcs, telemetry)
        if (obj.type === 'technical') {
          if (obj.subtype === 'crosshair') {
            return (
              <div
                key={obj.id}
                style={{
                  position: 'absolute',
                  left: `${obj.x}%`,
                  top: `${obj.y}%`,
                  transform: `translate(-50%, -50%) translateY(${translateY * 0.5}px)`,
                  zIndex,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: 0.65
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="8" y1="0" x2="8" y2="16" stroke="var(--ink-secondary)" strokeWidth="1" />
                  <line x1="0" y1="8" x2="16" y2="8" stroke="var(--ink-secondary)" strokeWidth="1" />
                </svg>
                {obj.label && (
                  <span className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--ink-muted)' }}>
                    {obj.label}
                  </span>
                )}
              </div>
            );
          }

          if (obj.subtype === 'orbit-arc') {
            return (
              <div
                key={obj.id}
                style={{
                  position: 'absolute',
                  left: `${obj.x}%`,
                  top: `${obj.y}%`,
                  transform: `translate(-50%, -50%) translateY(${translateY * 0.4}px)`,
                  zIndex,
                  opacity: 0.35
                }}
              >
                <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
                  <path d="M10 80 Q 90 10, 170 80" stroke="var(--ink-secondary)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>
            );
          }

          if (obj.subtype === 'gravity-vector') {
            return (
              <div
                key={obj.id}
                style={{
                  position: 'absolute',
                  left: `${obj.x}%`,
                  top: `${obj.y}%`,
                  transform: `translate(-50%, -50%) translateY(${translateY * 0.6}px)`,
                  zIndex,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--ink-blueprint)',
                  opacity: 0.75
                }}
              >
                {obj.label}
              </div>
            );
          }
        }

        // 7. PARTICLES / SPACE DEBRIS
        if (obj.type === 'particle') {
          return (
            <div
              key={obj.id}
              style={{
                position: 'absolute',
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                width: `${obj.size || 4}px`,
                height: `${obj.size || 4}px`,
                borderRadius: '50%',
                background: 'var(--ink-secondary)',
                opacity: 0.4,
                transform: `translate(-50%, -50%) translateY(${translateY * 0.8}px)`,
                zIndex
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
