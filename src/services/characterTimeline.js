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
 * 
 * CONTINUITY RULES:
 * - End position/scale of each scene must exactly match start position/scale of the next.
 * - Scale stays consistent (~0.88 desktop / ~0.72 mobile) across all walking & falling scenes.
 * - posX interpolates smoothly during falls (no hard cuts).
 */

// Smooth easeInOut for position interpolation during falls
function easeInOut(t) {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function getCharacterState(progress, viewportWidth = 1920, viewportHeight = 1080) {
  const p = Math.max(0, Math.min(1, progress));
  const isMobile = viewportWidth < 768;

  // ── Consistent Scale Constants ──
  // Keeping these uniform prevents jarring size jumps between scenes.
  const WALK_SCALE   = isMobile ? 0.72 : 0.88;
  const HERO_SCALE   = isMobile ? 0.76 : 0.90;
  const FINAL_SCALE  = isMobile ? 0.76 : 0.90;

  // ── Position Constants ──
  // Hero & Final: character sits at the left zone, leaving right side clear for content.
  // Walking scenes: character traverses from left to right across the gallery floor.
  const HERO_POSX       = isMobile ? 0.50 : 0.20;
  const HERO_POSY       = isMobile ? 0.44 : 0.50;
  const WALK_START_POSX = isMobile ? 0.25 : 0.20;
  const WALK_END_POSX   = isMobile ? 0.75 : 0.72;
  const WALK_POSY       = 0.54;
  const FINAL_POSX      = isMobile ? 0.50 : 0.20;
  const FINAL_POSY      = 0.52;

  // Base output defaults
  let sequence = 'walk';
  let frameIndex = 0;
  let posX = 0.5;
  let posY = 0.5;
  let scale = WALK_SCALE;
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
      // Settled in Hero composition — character firmly on the LEFT, content on the RIGHT
      // Loading ends at center (0.5), hero settles at HERO_POSX.
      // Interpolate smoothly from 0.5 to HERO_POSX during 0.07-0.10
      if (p < 0.10) {
        const settleFrac = (p - 0.07) / 0.03;
        const easedFrac = easeInOut(settleFrac);
        posX = 0.5 + (HERO_POSX - 0.5) * easedFrac;
        posY = 0.42 + (HERO_POSY - 0.42) * easedFrac;
        // Scale smoothly transitions from loading end to hero scale
        const loadEndScale = isMobile ? 0.88 : 1.12; // zoom=1.0 at end of loading
        scale = loadEndScale + (HERO_SCALE - loadEndScale) * easedFrac;
      } else {
        scale = HERO_SCALE;
        posX = HERO_POSX;
        posY = HERO_POSY;
      }
      shadowOpacity = 0.25;
    }
  }

  // -------------------------------------------------------------
  // 2. TRANSITION 1: FIRST FALL & LAND (HERO -> PROJECTS) (p: 0.18 -> 0.28)
  //
  // Start: (HERO_POSX, HERO_POSY, HERO_SCALE)
  // End:   (WALK_START_POSX, WALK_POSY, WALK_SCALE)
  // -------------------------------------------------------------
  else if (p < 0.28) {
    sceneName = 'transition-1';
    sequence = 'fallLand';
    const localP = (p - 0.18) / 0.10; // 0 -> 1
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;

    // Smooth position & scale interpolation across the entire fall
    const easedP = easeInOut(localP);
    posX = HERO_POSX + (WALK_START_POSX - HERO_POSX) * easedP;
    posY = HERO_POSY + (WALK_POSY - HERO_POSY) * easedP;
    scale = HERO_SCALE + (WALK_SCALE - HERO_SCALE) * easedP;

    // Add vertical wobble during the fall (rise then slam down)
    if (localP < 0.5) {
      const fallFrac = localP / 0.5;
      posY -= Math.sin(fallFrac * Math.PI) * 0.06; // Lift up during free fall
      shadowOpacity = Math.max(0.05, 0.25 - fallFrac * 0.18);
      shadowScale = 0.55;
    } else {
      // Landing impact — shadow expands then settles
      const landFrac = (localP - 0.5) / 0.5;
      shadowOpacity = 0.25 + (1 - landFrac) * 0.18;
      shadowScale = 1.0 + (1 - landFrac) * 0.45;
    }
  }

  // -------------------------------------------------------------
  // 3. SCENE 2: PROJECT WALL WALK (p: 0.28 -> 0.52)
  //
  // Start: (WALK_START_POSX, WALK_POSY, WALK_SCALE)
  // End:   (WALK_END_POSX, WALK_POSY, WALK_SCALE)
  // -------------------------------------------------------------
  else if (p < 0.52) {
    sceneName = 'projects';
    sequence = 'walk';
    const localP = (p - 0.28) / 0.24; // 0 -> 1
    const totalFrames = 116 * 3;
    frameIndex = Math.floor(localP * totalFrames) % 116;
    flipX = false;
    scale = WALK_SCALE;

    posX = WALK_START_POSX + localP * (WALK_END_POSX - WALK_START_POSX);
    posY = WALK_POSY;
    shadowOpacity = 0.26;
    shadowScale = 1.0;
  }

  // -------------------------------------------------------------
  // 4. TRANSITION 2: SECOND FALL & LAND (PROJECTS -> TECH STACK) (p: 0.52 -> 0.62)
  //
  // Start: (WALK_END_POSX, WALK_POSY, WALK_SCALE)
  // End:   (WALK_START_POSX, WALK_POSY, WALK_SCALE)
  // Character drifts from right side back to left side during fall.
  // -------------------------------------------------------------
  else if (p < 0.62) {
    sceneName = 'transition-2';
    sequence = 'fallLand';
    const localP = (p - 0.52) / 0.10; // 0 -> 1
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;
    scale = WALK_SCALE; // No scale change — perfectly continuous

    const easedP = easeInOut(localP);
    posX = WALK_END_POSX + (WALK_START_POSX - WALK_END_POSX) * easedP;
    posY = WALK_POSY;

    if (localP < 0.5) {
      const fallFrac = localP / 0.5;
      posY -= Math.sin(fallFrac * Math.PI) * 0.05;
      shadowOpacity = 0.08;
      shadowScale = 0.55;
    } else {
      const landFrac = (localP - 0.5) / 0.5;
      shadowOpacity = 0.26 + (1 - landFrac) * 0.18;
      shadowScale = 1.0 + (1 - landFrac) * 0.4;
    }
  }

  // -------------------------------------------------------------
  // 5. SCENE 3: TECH STACK WALL WALK (p: 0.62 -> 0.86)
  //
  // Start: (WALK_START_POSX, WALK_POSY, WALK_SCALE)
  // End:   (WALK_END_POSX, WALK_POSY, WALK_SCALE)
  // -------------------------------------------------------------
  else if (p < 0.86) {
    sceneName = 'techStack';
    sequence = 'walk';
    const localP = (p - 0.62) / 0.24; // 0 -> 1
    const totalFrames = 116 * 3;
    frameIndex = Math.floor(localP * totalFrames) % 116;
    flipX = false;
    scale = WALK_SCALE;

    posX = WALK_START_POSX + localP * (WALK_END_POSX - WALK_START_POSX);
    posY = WALK_POSY;
    shadowOpacity = 0.26;
    shadowScale = 1.0;
  }

  // -------------------------------------------------------------
  // 6. TRANSITION 3: FINAL FALL & LAND (TECH STACK -> FINAL) (p: 0.86 -> 0.93)
  //
  // Start: (WALK_END_POSX, WALK_POSY, WALK_SCALE)
  // End:   (FINAL_POSX, FINAL_POSY, FINAL_SCALE)
  // -------------------------------------------------------------
  else if (p < 0.93) {
    sceneName = 'transition-3';
    sequence = 'fallLand';
    const localP = (p - 0.86) / 0.07; // 0 -> 1
    frameIndex = Math.min(75, Math.floor(localP * 76));
    flipX = false;

    const easedP = easeInOut(localP);
    posX = WALK_END_POSX + (FINAL_POSX - WALK_END_POSX) * easedP;
    posY = WALK_POSY + (FINAL_POSY - WALK_POSY) * easedP;
    scale = WALK_SCALE + (FINAL_SCALE - WALK_SCALE) * easedP;

    if (localP < 0.5) {
      const fallFrac = localP / 0.5;
      posY -= Math.sin(fallFrac * Math.PI) * 0.05;
      shadowOpacity = 0.10;
      shadowScale = 0.6;
    } else {
      const landFrac = (localP - 0.5) / 0.5;
      shadowOpacity = 0.28 + (1 - landFrac) * 0.18;
      shadowScale = 1.0 + (1 - landFrac) * 0.4;
    }
  }

  // -------------------------------------------------------------
  // 7. SCENE 4: FINAL DESTINATION (p: 0.93 -> 1.00)
  //
  // Character stays visible on the canvas (wave animation).
  // isVisible = true so CharacterCanvas renders the wave sequence.
  // Positioned at left zone, matching the end of transition-3.
  // -------------------------------------------------------------
  else {
    sceneName = 'final';
    sequence = 'wave';
    const localP = (p - 0.93) / 0.07; // 0 -> 1
    // Cycle through wave animation frames (120 total)
    frameIndex = Math.min(119, Math.floor(localP * 120));
    posX = FINAL_POSX;
    posY = FINAL_POSY;
    scale = FINAL_SCALE;
    flipX = false;
    isVisible = true; // Canvas character renders the wave — no more tiny fallback
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
    isVisible,
    progress: p
  };
}
