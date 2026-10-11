import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../services/SoundManager';

/**
 * FloatingNav
 * Clean tactile floating header and sound engine controls.
 * Updated with Architecture and Timeline removed, reflecting the streamlined continuous journey.
 */
export default function FloatingNav({ progress, onNavigate }) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleToggleSound = () => {
    const isNowOn = soundManager.toggle();
    setSoundEnabled(isNowOn);
  };

  const navItems = [
    { label: 'HERO', target: 0.10 },
    { label: 'PROJECTS', target: 0.38 },
    { label: 'STACK', target: 0.72 },
    { label: 'CONTACT', target: 0.96 }
  ];

  const pct = Math.round(progress * 100);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 'clamp(14px, 2.5vh, 24px)',
        left: 0,
        width: '100vw',
        padding: '0 clamp(16px, 4vw, 40px)',
        zIndex: 60,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Brand Identity / Home trigger */}
      <div
        className="interactive"
        onClick={() => onNavigate(0)}
        style={{
          pointerEvents: 'auto',
          cursor: 'pointer',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1px solid var(--paper-border)',
          padding: '6px 14px',
          boxShadow: 'var(--shadow-paper)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(6px)'
        }}
      >
        <div style={{ width: '8px', height: '8px', background: 'var(--ink-primary)' }} />
        <span className="font-display" style={{ fontSize: '0.86rem', fontWeight: 800, letterSpacing: '0.04em', color: 'var(--ink-primary)' }}>
          ESWAR
        </span>
        <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
          // DEV
        </span>
      </div>

      {/* Center Nav items */}
      <div
        style={{
          pointerEvents: 'auto',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1px solid var(--paper-border)',
          padding: '4px 10px',
          boxShadow: 'var(--shadow-paper)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backdropFilter: 'blur(6px)'
        }}
        className="nav-bar-center"
      >
        {navItems.map((item) => {
          const isActive = Math.abs(progress - item.target) < 0.12;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.target)}
              className="interactive"
              style={{
                background: isActive ? 'var(--paper-cream)' : 'transparent',
                border: isActive ? '1px solid var(--paper-border)' : '1px solid transparent',
                padding: '4px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right controls: Sound & Progress */}
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* Sound toggle button */}
        <button
          onClick={handleToggleSound}
          className="interactive"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid var(--paper-border)',
            padding: '6px 12px',
            boxShadow: 'var(--shadow-paper)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: soundEnabled ? 'var(--ink-accent)' : 'var(--ink-muted)',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)'
          }}
          title={soundEnabled ? 'Mute sound' : 'Enable tactile audio'}
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{soundEnabled ? 'AUDIO: ON' : 'AUDIO: OFF'}</span>
        </button>

        {/* Master Progress Indicator */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid var(--paper-border)',
            padding: '6px 12px',
            boxShadow: 'var(--shadow-paper)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--ink-primary)',
            backdropFilter: 'blur(6px)'
          }}
        >
          <span>{pct}%</span>
          <div
            style={{
              width: '42px',
              height: '3px',
              background: 'var(--paper-border)',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${pct}%`,
                background: 'var(--ink-primary)',
                transition: 'width 0.1s linear'
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
