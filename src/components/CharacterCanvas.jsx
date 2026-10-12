import React, { useEffect, useRef } from 'react';
import { frameManager } from '../services/CharacterFrameManager';
import { getCharacterState } from '../services/characterTimeline';

export default function CharacterCanvas({ progressRef }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
    });

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* =====================================================
       RESIZE
    ===================================================== */
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* =====================================================
       RENDER LOOP
    ===================================================== */
    const render = () => {
      const p = progressRef ? progressRef.current : 0;
      const state = getCharacterState(p, width, height);
      stateRef.current = state;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Check visibility (e.g. final section hides canvas character since wave.png is shown)
      if (state.isVisible === false) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const img = frameManager.getFrame(state.sequence, state.frameIndex);

      if (img && img.complete && img.naturalWidth > 0) {
        /* ===================================================
           LOADING CAMERA PULL-BACK CALCULATION
           Matches reference image at p = 0:
           - Close-up framing on character face
           - Hair top touches viewport top
           - Ears comfortably framed
           - Eyes & nose centered
           - Chin sits above loading UI stats
           - Smooth camera pull-back as p advances 0.00 -> 0.08
        =================================================== */
        const isMobile = width < 768;
        const loadingPhase = p < 0.08;

        // Reference close-up scale at p = 0
        const closeUpCharHeight = Math.max(
          height * (isMobile ? 1.55 : 1.72),
          (width * (isMobile ? 0.95 : 0.65) / 0.375) / (1920 / 1080)
        );

        // Standard world scale for hero
        const heroCharHeight = height * 0.72 * state.scale;
        const heroTargetX = width * state.posX;
        const heroTargetY = height * state.posY;

        let charHeight;
        let charWidth;
        let targetX;
        let targetY;
        let anchorY;
        let effectiveShadowOpacity;

        if (loadingPhase) {
          const t = Math.max(0, Math.min(1, p / 0.08));
          // Smooth step easing for automatic camera pullback
          const ease = t * t * (3 - 2 * t);

          charHeight = closeUpCharHeight + (heroCharHeight - closeUpCharHeight) * ease;
          charWidth = charHeight * (1920 / 1080);

          // Interpolate vertical anchor: from face center (0.35) to full-body center (0.50)
          anchorY = 0.35 + (0.50 - 0.35) * ease;

          // Interpolate position: from viewport center (0.5, 0.46) to hero position
          targetX = (width * 0.5) + (heroTargetX - width * 0.5) * ease;
          targetY = (height * 0.46) + (heroTargetY - height * 0.46) * ease;

          // Shadow fades in as camera pulls back and ground becomes visible
          effectiveShadowOpacity = ease * state.shadowOpacity;
        } else {
          charHeight = heroCharHeight;
          charWidth = charHeight * (1920 / 1080);
          anchorY = 0.50;
          targetX = heroTargetX;
          targetY = heroTargetY;
          effectiveShadowOpacity = state.shadowOpacity;
        }

        ctx.save();
        ctx.translate(targetX, targetY);

        if (state.flipX) {
          ctx.scale(-1, 1);
        }

        /* ===================================================
           GROUND SHADOW (Smoothly fades in during pullback)
        =================================================== */
        if (effectiveShadowOpacity > 0.02) {
          const shadowWidth = charHeight * 0.38 * state.shadowScale;
          const shadowHeight = charHeight * 0.05 * state.shadowScale;
          const shadowY = charHeight * (1 - anchorY) - 10;

          // Outer soft graphite shadow
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(0, shadowY, shadowWidth / 2, shadowHeight / 2, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(20, 20, 22, ${effectiveShadowOpacity * 0.45})`;
          ctx.filter = 'blur(6px)';
          ctx.fill();
          ctx.restore();

          // Inner contact shadow
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(0, shadowY - 2, (shadowWidth * 0.55) / 2, (shadowHeight * 0.5) / 2, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10, 10, 12, ${effectiveShadowOpacity * 0.65})`;
          ctx.filter = 'blur(2px)';
          ctx.fill();
          ctx.restore();
        }

        /* ===================================================
           CHARACTER DRAW
           Strict aspect ratio preserved (1920/1080), no distortion
           Monochrome / Grayscale strictly applied to canvas rendering
        =================================================== */
        ctx.save();
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(
          img,
          -charWidth / 2,
          -charHeight * anchorY,
          charWidth,
          charHeight
        );
        ctx.filter = 'none';
        ctx.restore();

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
        zIndex: 25,
        filter: 'grayscale(100%)',
      }}
    />
  );
}