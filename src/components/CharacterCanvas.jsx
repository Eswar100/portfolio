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

    let dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    /* =====================================================
       RESIZE
    ===================================================== */

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resize();

    window.addEventListener(
      'resize',
      resize,
      {
        passive: true,
      }
    );

    /* =====================================================
       RENDER
    ===================================================== */

    const render = () => {
      const p = progressRef
        ? progressRef.current
        : 0;

      const state = getCharacterState(
        p,
        width,
        height
      );

      stateRef.current = state;

      /* -----------------------------------------------------
         CLEAR
      ----------------------------------------------------- */

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /* -----------------------------------------------------
         VISIBILITY
      ----------------------------------------------------- */

      if (state.isVisible === false) {
        animationFrameId =
          requestAnimationFrame(render);

        return;
      }

      /* -----------------------------------------------------
         CURRENT FRAME
      ----------------------------------------------------- */

      const img = frameManager.getFrame(
        state.sequence,
        state.frameIndex
      );

      if (
        img &&
        img.complete &&
        img.naturalWidth > 0
      ) {
        /* ===================================================
           LOADING CAMERA PULLBACK
        =================================================== */

        const loadingPhase =
          p < 0.08;

        /*
         * During initial loading:
         *
         * p = 0.00 → 1.65x
         * p = 0.02 → 1.4875x
         * p = 0.04 → 1.325x
         * p = 0.06 → 1.1625x
         * p = 0.08 → 1.00x
         */

        const loadingZoom =
          loadingPhase
            ? 1.65 -
            (p / 0.08) * 0.65
            : 1;

        /* ===================================================
           POSITION
        =================================================== */

        const targetX =
          loadingPhase
            ? width * 0.5
            : width * state.posX;

        const targetY =
          loadingPhase
            ? height * 0.48
            : height * state.posY;

        /* ===================================================
           SIZE
        =================================================== */

        const charHeight =
          height *
          0.72 *
          state.scale *
          loadingZoom;

        const charWidth =
          charHeight *
          (1920 / 1080);

        /* ===================================================
           DRAW
        =================================================== */

        ctx.save();

        /* ---------------------------------------------------
           POSITION
        --------------------------------------------------- */

        ctx.translate(
          targetX,
          targetY
        );

        /* ---------------------------------------------------
           FLIP
        --------------------------------------------------- */

        if (state.flipX) {
          ctx.scale(-1, 1);
        }

        /* ===================================================
           GROUND SHADOW
        =================================================== */

        const shadowWidth =
          charHeight *
          0.38 *
          state.shadowScale;

        const shadowHeight =
          charHeight *
          0.05 *
          state.shadowScale;

        const shadowY =
          charHeight * 0.44;

        /* ---------------------------------------------------
           OUTER SHADOW
        --------------------------------------------------- */

        ctx.save();

        ctx.beginPath();

        ctx.ellipse(
          0,
          shadowY,
          shadowWidth / 2,
          shadowHeight / 2,
          0,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(
            32,
            28,
            24,
            ${state.shadowOpacity * 0.45}
          )`;

        ctx.filter =
          'blur(6px)';

        ctx.fill();

        ctx.restore();

        /* ---------------------------------------------------
           INNER SHADOW
        --------------------------------------------------- */

        ctx.save();

        ctx.beginPath();

        ctx.ellipse(
          0,
          shadowY - 2,
          (shadowWidth * 0.55) / 2,
          (shadowHeight * 0.5) / 2,
          0,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(
            18,
            19,
            22,
            ${state.shadowOpacity * 0.65}
          )`;

        ctx.filter =
          'blur(2px)';

        ctx.fill();

        ctx.restore();

        /* ===================================================
           CHARACTER
        =================================================== */

        ctx.drawImage(
          img,

          -charWidth / 2,
          -charHeight / 2,

          charWidth,
          charHeight
        );

        ctx.restore();
      }

      /* =====================================================
         NEXT FRAME
      ===================================================== */

      animationFrameId =
        requestAnimationFrame(render);
    };

    animationFrameId =
      requestAnimationFrame(render);

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        'resize',
        resize
      );
    };
  }, [progressRef]);

  /* =======================================================
     CANVAS
  ======================================================= */

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
      }}
    />
  );
}