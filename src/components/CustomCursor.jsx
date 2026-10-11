import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (mouse, trackpad)
    if (window.matchMedia('(pointer: fine)').matches) {
      setEnabled(true);
    } else {
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease'
      }}
    >
      <div
        style={{
          width: hovered ? '38px' : '20px',
          height: hovered ? '38px' : '20px',
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? 'var(--ink-accent)' : 'var(--ink-primary)'}`,
          opacity: 0.75,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Center dot */}
        <div
          style={{
            width: hovered ? '6px' : '3px',
            height: hovered ? '6px' : '3px',
            borderRadius: '50%',
            background: hovered ? 'var(--ink-accent)' : 'var(--ink-primary)'
          }}
        />

        {/* Crosshair marks */}
        {!hovered && (
          <>
            <div style={{ position: 'absolute', top: '-4px', width: '1px', height: '3px', background: 'var(--ink-secondary)' }} />
            <div style={{ position: 'absolute', bottom: '-4px', width: '1px', height: '3px', background: 'var(--ink-secondary)' }} />
            <div style={{ position: 'absolute', left: '-4px', width: '3px', height: '1px', background: 'var(--ink-secondary)' }} />
            <div style={{ position: 'absolute', right: '-4px', width: '3px', height: '1px', background: 'var(--ink-secondary)' }} />
          </>
        )}
      </div>
    </div>
  );
}
