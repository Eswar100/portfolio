import React, { useEffect, useRef } from 'react';
import { frameManager } from '../services/CharacterFrameManager';
import { getCharacterState } from '../services/characterTimeline';

export default function CharacterCanvas({ progressRef }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Smooth render loop
    const render = () => {
      const p = progressRef ? progressRef.current : 0;
      const state = getCharacterState(p, width, height);
      stateRef.current = state;

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      const img = frameManager.getFrame(state.sequence, state.frameIndex);

      if (img && img.complete && img.naturalWidth > 0) {
        // Calculate rendering position
        const targetX = width * state.posX;
        const targetY = height * state.posY;

        // Base size proportional to screen height
        // Character aspect ratio is 16:9 (1920x1080 canvas)
        const charHeight = height * 0.72 * state.scale;
        const charWidth = charHeight * (1920 / 1080);

        ctx.save();
        ctx.translate(targetX, targetY);

        if (state.flipX) {
          ctx.scale(-1, 1);
        }

        // Draw Soft Grounding Paper Shadow
        const shadowWidth = charHeight * 0.38 * state.shadowScale;
        const shadowHeight = charHeight * 0.05 * state.shadowScale;
        const shadowY = charHeight * 0.44; // Feet position relative to center

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, shadowY, shadowWidth / 2, shadowHeight / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(32, 28, 24, ${state.shadowOpacity * 0.45})`;
        ctx.filter = 'blur(6px)';
        ctx.fill();
        ctx.restore();

        // Inner tighter shadow
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, shadowY - 2, (shadowWidth * 0.55) / 2, (shadowHeight * 0.5) / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(18, 19, 22, ${state.shadowOpacity * 0.65})`;
        ctx.filter = 'blur(2px)';
        ctx.fill();
        ctx.restore();

        // Draw Character Image centered
        ctx.drawImage(
          img,
          -charWidth / 2,
          -charHeight / 2,
          charWidth,
          charHeight
        );

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 20
      }}
    />
  );
}
