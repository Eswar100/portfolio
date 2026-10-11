/**
 * characterTimeline.js
 * 
 * Master deterministic state engine for Eswar's continuous cinematic motion journey.
 * Computes character animation sequence, frame index, X/Y screen coordinates,
 * camera zoom scale, horizontal flip, and grounding shadow for any scroll progress (0 to 1).
 * 
 * Journey:
 * LOADING (0.00 -> 0.07)
 *   ↓
 * HERO (0.07 -> 0.18)
 *   ↓
 * FALL TRANSITION 1 (0.18 -> 0.28)
 *   ↓
 * PROJECT WALL (0.28 -> 0.52)
 *   ↓
 * FALL TRANSITION 2 (0.52 -> 0.62)
 *   ↓
 * TECH STACK WALL (0.62 -> 0.86)
 *   ↓
 * FALL TRANSITION 3 (0.86 -> 0.93)
 *   ↓
 * FINAL / CONTACT (0.93 -> 1.00)
 */

export function getCharacterState(progress, viewportWidth = 1920, viewportHeight = 1080) {
  const p = Math.max(0, Math.min(1, progress));
  const isMobile = viewportWidth < 768;

  // Base output defaults
  let sequence = 'walk';
  let frameIndex = 0;
  let posX = 0.5;
  let posY = 0.5;
  let scale = isMobile ? 0.75 : 0.95;
  let flipX = false;
  let shadowOpacity = 0.25;
  let shadowScale = 1.0;
  let sceneName = 'loading';
  let isVisible = true;

  // -------------------------------------------------------------
  // 1. SCENE 1: LOADING & HERO (p: 0.00 -> 0.18)
  // -------------------------------------------------------------
  if (p < 0.18) {
    sceneName = p < 0.07 ? 'loading' : 'hero';
    sequence = 'walk';
    frameIndex = 0; // Standing idle pose
    flipX = false;

    if (p < 0.07) {
      // Camera Zoomed in on character's chest/face, pulling back cinematically
      const zoomProgress = p / 0.07; // 0 -> 1
      const currentZoom = 2.4 - zoomProgress * 1.4; // 2.4 down to 1.0
      scale = (isMobile ? 0.88 : 1.12) * currentZoom;
      posY = 0.42 + (1 - zoomProgress) * 0.18;
      posX = 0.5;
      shadowOpacity = 0.15 + zoomProgress * 0.1;
    } else {
      // Settled in Hero composition (character on left, typography on right)
      scale = isMobile ? 0.78 : 0.96;
      posX = isMobile ? 0.5 : 0.30;
      posY = 0.52;
      shadowOpacity = 0.25;
    }
  }

  // -------------------------------------------------------------
  // 2. TRANSITION 1: FIRST FALL & LAND (HERO -> PROJECTS) (p: 0.18 -> 0.28)
  // -------------------------------------------------------------
  else if (p < 0.28) {
    sceneName = 'transition-1';
    sequence = 'fallLand';
    const localP = (p - 0.18) / 0.10; // 0 -> 1
    // 76 frames total
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;
    scale = isMobile ? 0.74 : 0.92;

    if (localP < 0.5) {
      // Falling through hand-drawn space
      const fallFrac = localP / 0.5;
      posX = isMobile ? 0.5 : 0.30 + fallFrac * 0.08;
      posY = 0.52 - Math.sin(fallFrac * Math.PI) * 0.05 + fallFrac * 0.06;
      shadowOpacity = Math.max(0.05, 0.25 - fallFrac * 0.16);
      shadowScale = 0.6;
    } else {
      // Impact and spring up on project gallery floor
      const landFrac = (localP - 0.5) / 0.5;
      posX = isMobile ? 0.5 : 0.38;
      posY = 0.56;
      shadowOpacity = 0.25 + (1 - landFrac) * 0.16;
      shadowScale = 1.0 + (1 - landFrac) * 0.4;
    }
  }

  // -------------------------------------------------------------
  // 3. SCENE 2: PROJECT WALL WALK (p: 0.28 -> 0.52)
  // -------------------------------------------------------------
  else if (p < 0.52) {
    sceneName = 'projects';
    sequence = 'walk';
    const localP = (p - 0.28) / 0.24; // 0 -> 1
    // Loops walk cycle across gallery distance (116 frames per cycle, ~3 cycles)
    const totalFrames = 116 * 3;
    frameIndex = Math.floor(localP * totalFrames) % 116;
    flipX = false; // Walking forward (facing right)
    scale = isMobile ? 0.72 : 0.88;

    // Character walks in foreground across the open floor in front of the wall
    posX = isMobile ? 0.45 : 0.24 + localP * 0.48;
    posY = 0.56;
    shadowOpacity = 0.26;
    shadowScale = 1.0;
  }

  // -------------------------------------------------------------
  // 4. TRANSITION 2: SECOND FALL & LAND (PROJECTS -> TECH STACK) (p: 0.52 -> 0.62)
  // -------------------------------------------------------------
  else if (p < 0.62) {
    sceneName = 'transition-2';
    sequence = 'fallLand';
    const localP = (p - 0.52) / 0.10; // 0 -> 1
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;
    scale = isMobile ? 0.74 : 0.90;

    if (localP < 0.5) {
      const fallFrac = localP / 0.5;
      posX = isMobile ? 0.5 : 0.68 - fallFrac * 0.15;
      posY = 0.56 + fallFrac * 0.06;
      shadowOpacity = 0.1;
      shadowScale = 0.65;
    } else {
      posX = isMobile ? 0.5 : 0.53;
      posY = 0.56;
      shadowOpacity = 0.32;
      shadowScale = 1.1;
    }
  }

  // -------------------------------------------------------------
  // 5. SCENE 3: TECH STACK WALL WALK (p: 0.62 -> 0.86)
  // -------------------------------------------------------------
  else if (p < 0.86) {
    sceneName = 'techStack';
    sequence = 'walk';
    const localP = (p - 0.62) / 0.24; // 0 -> 1
    const totalFrames = 116 * 3;
    frameIndex = Math.floor(localP * totalFrames) % 116;
    flipX = false; // Walking forward across the tech stack gallery
    scale = isMobile ? 0.72 : 0.88;

    // Walks across open floor in front of the hand-drawn tech wall
    posX = isMobile ? 0.45 : 0.24 + localP * 0.48;
    posY = 0.56;
    shadowOpacity = 0.26;
    shadowScale = 1.0;
  }

  // -------------------------------------------------------------
  // 6. TRANSITION 3: FINAL FALL & LAND (TECH STACK -> FINAL) (p: 0.86 -> 0.93)
  // -------------------------------------------------------------
  else if (p < 0.93) {
    sceneName = 'transition-3';
    sequence = 'fallLand';
    const localP = (p - 0.86) / 0.07; // 0 -> 1
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;
    scale = isMobile ? 0.76 : 0.92;

    if (localP < 0.5) {
      const fallFrac = localP / 0.5;
      posX = isMobile ? 0.5 : 0.65 - fallFrac * 0.25;
      posY = 0.56 + fallFrac * 0.06;
      shadowOpacity = 0.12;
      shadowScale = 0.7;
    } else {
      posX = isMobile ? 0.5 : 0.36;
      posY = 0.56;
      shadowOpacity = 0.32;
      shadowScale = 1.1;
    }
  }

  // -------------------------------------------------------------
  // 7. SCENE 4: FINAL DESTINATION (p: 0.93 -> 1.00)
  // -------------------------------------------------------------
  else {
    sceneName = 'final';
    sequence = 'wave';
    frameIndex = 0;
    posX = isMobile ? 0.5 : 0.32;
    posY = 0.54;
    scale = isMobile ? 0.80 : 0.96;
    // Suppress canvas rendering in final scene to give 100% control to the dedicated WebM container slot
    isVisible = false;
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
    isVisible,
    progress: p
  };
}
