/**
 * characterTimeline.js
 * 
 * Master deterministic state engine for Eswar's continuous motion journey.
 * Computes character animation sequence, frame index, X/Y screen coordinates,
 * camera zoom scale, horizontal flip, and grounding shadow for any scroll progress (0 to 1).
 * 
 * Works 100% identically in forward and reverse scrolling.
 */

export function getCharacterState(progress, viewportWidth = 1920, viewportHeight = 1080) {
  const p = Math.max(0, Math.min(1, progress));
  const isMobile = viewportWidth < 768;

  // Base output structure
  let sequence = 'walk';
  let frameIndex = 0;
  let posX = 0.5; // normalized 0 to 1 (screen center)
  let posY = 0.5; // normalized 0 to 1 (screen center)
  let scale = isMobile ? 0.75 : 0.95;
  let flipX = false;
  let shadowOpacity = 0.25;
  let shadowScale = 1.0;
  let sceneName = 'loading';

  // -------------------------------------------------------------
  // 1. SCENE 1 & 2: LOADING & HERO (p: 0.00 -> 0.20)
  // -------------------------------------------------------------
  if (p < 0.20) {
    sceneName = p < 0.08 ? 'loading' : 'hero';
    sequence = 'walk';
    frameIndex = 0; // Standing idle pose
    flipX = false;

    if (p < 0.08) {
      // Camera Zoomed in on character's chest/face, pulling back
      const zoomProgress = p / 0.08; // 0 -> 1
      const currentZoom = 2.4 - zoomProgress * 1.4; // 2.4 down to 1.0
      scale = (isMobile ? 0.9 : 1.15) * currentZoom;
      // Focus on character's face when zoomed in
      posY = 0.42 + (1 - zoomProgress) * 0.18;
      posX = 0.5;
      shadowOpacity = 0.15 + zoomProgress * 0.1;
    } else {
      // Settled in Hero composition
      scale = isMobile ? 0.78 : 0.98;
      posX = isMobile ? 0.5 : 0.32; // Character on left, hero typography on right
      posY = 0.52;
      shadowOpacity = 0.25;
    }
  }

  // -------------------------------------------------------------
  // 2. TRANSITION 1: FIRST FALL & LAND (p: 0.20 -> 0.30)
  // -------------------------------------------------------------
  else if (p < 0.30) {
    sceneName = 'transition-1';
    sequence = 'fallLand';
    const localP = (p - 0.20) / 0.10; // 0 -> 1
    // 76 frames total
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;
    scale = isMobile ? 0.75 : 0.92;

    // Character falls from hero platform to project floor
    if (localP < 0.5) {
      // Falling
      const fallFrac = localP / 0.5;
      posX = isMobile ? 0.5 : 0.32 + fallFrac * 0.08;
      posY = 0.52 - Math.sin(fallFrac * Math.PI) * 0.06 + fallFrac * 0.06;
      shadowOpacity = Math.max(0.05, 0.25 - fallFrac * 0.15);
      shadowScale = 0.6;
    } else {
      // Impact and spring up
      const landFrac = (localP - 0.5) / 0.5;
      posX = isMobile ? 0.5 : 0.40;
      posY = 0.58;
      shadowOpacity = 0.25 + (1 - landFrac) * 0.15; // strong shadow on impact
      shadowScale = 1.0 + (1 - landFrac) * 0.4;
    }
  }

  // -------------------------------------------------------------
  // 3. SCENE 3: PROJECTS GALLERY WALK (p: 0.30 -> 0.52)
  // -------------------------------------------------------------
  else if (p < 0.52) {
    sceneName = 'projects';
    sequence = 'walk';
    const localP = (p - 0.30) / 0.22; // 0 -> 1
    // Loops walk cycle across distance (116 frames per cycle, ~3 cycles)
    const totalFrames = 116 * 3;
    frameIndex = Math.floor(localP * totalFrames) % 116;
    flipX = false; // Walking forward (facing right)
    scale = isMobile ? 0.72 : 0.88;

    // Character walks across screen from left to right as projects enter
    // Moves across screen: 0.25 to 0.75
    posX = isMobile ? 0.45 : 0.22 + localP * 0.52;
    posY = 0.56;
    shadowOpacity = 0.25;
    shadowScale = 1.0;
  }

  // -------------------------------------------------------------
  // 4. TRANSITION 2: SECOND FALL & LAND (p: 0.52 -> 0.60)
  // -------------------------------------------------------------
  else if (p < 0.60) {
    sceneName = 'transition-2';
    sequence = 'fallLand';
    const localP = (p - 0.52) / 0.08; // 0 -> 1
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;
    scale = isMobile ? 0.72 : 0.88;

    if (localP < 0.5) {
      const fallFrac = localP / 0.5;
      posX = isMobile ? 0.5 : 0.74;
      posY = 0.56 + fallFrac * 0.08;
      shadowOpacity = 0.1;
      shadowScale = 0.7;
    } else {
      posX = isMobile ? 0.5 : 0.74;
      posY = 0.64;
      shadowOpacity = 0.3;
      shadowScale = 1.1;
    }
  }

  // -------------------------------------------------------------
  // 5. SCENE 4: TECH STACK & BACKEND ARCHITECTURE (OPPOSITE JOURNEY) (p: 0.60 -> 0.78)
  // -------------------------------------------------------------
  else if (p < 0.78) {
    sceneName = 'techStack';
    sequence = 'walk';
    const localP = (p - 0.60) / 0.18; // 0 -> 1
    // Character walks to the LEFT!
    const totalFrames = 116 * 2.5;
    frameIndex = Math.floor(localP * totalFrames) % 116;
    flipX = true; // WALKING LEFT (opposite direction!)
    scale = isMobile ? 0.72 : 0.88;

    // Moves across screen from right to left: 0.75 down to 0.22
    posX = isMobile ? 0.5 : 0.74 - localP * 0.50;
    posY = 0.58;
    shadowOpacity = 0.25;
    shadowScale = 1.0;
  }

  // -------------------------------------------------------------
  // 6. SCENE 5: EXPERIENCE / TIMELINE (p: 0.78 -> 0.86)
  // -------------------------------------------------------------
  else if (p < 0.86) {
    sceneName = 'timeline';
    sequence = 'walk';
    const localP = (p - 0.78) / 0.08; // 0 -> 1
    const totalFrames = 116 * 1.5;
    frameIndex = Math.floor(localP * totalFrames) % 116;
    flipX = false; // Walking forward again along timeline
    scale = isMobile ? 0.72 : 0.88;

    posX = isMobile ? 0.5 : 0.24 + localP * 0.38;
    posY = 0.58;
    shadowOpacity = 0.25;
    shadowScale = 1.0;
  }

  // -------------------------------------------------------------
  // 7. TRANSITION 3: FINAL FALL & LAND (p: 0.86 -> 0.92)
  // -------------------------------------------------------------
  else if (p < 0.92) {
    sceneName = 'transition-3';
    sequence = 'fallLand';
    const localP = (p - 0.86) / 0.06; // 0 -> 1
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;
    scale = isMobile ? 0.76 : 0.92;

    if (localP < 0.5) {
      const fallFrac = localP / 0.5;
      posX = isMobile ? 0.5 : 0.62;
      posY = 0.58 + fallFrac * 0.06;
      shadowOpacity = 0.12;
      shadowScale = 0.7;
    } else {
      posX = isMobile ? 0.5 : 0.62;
      posY = 0.64;
      shadowOpacity = 0.32;
      shadowScale = 1.1;
    }
  }

  // -------------------------------------------------------------
  // 8. SCENE 6: FINAL SCENE (WAVE & CONNECT) (p: 0.92 -> 1.00)
  // -------------------------------------------------------------
  else {
    sceneName = 'final';
    sequence = 'wave';
    const localP = (p - 0.92) / 0.08; // 0 -> 1
    // 120 frames total
    frameIndex = Math.min(119, Math.floor(localP * 120));
    flipX = false; // Facing front / visitor
    scale = isMobile ? 0.80 : 0.98;

    // Character stands proudly centered on left/center, contact cards on right
    posX = isMobile ? 0.5 : 0.35;
    posY = 0.54;
    shadowOpacity = 0.28;
    shadowScale = 1.0;
  }

  return {
    sequence,
    frameIndex,
    posX,
    posY,
    scale,
    flipX,
    shadowOpacity,
    shadowScale,
    sceneName,
    progress: p
  };
}
