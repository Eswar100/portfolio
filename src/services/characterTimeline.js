/**
 * characterTimeline.js
 *
 * Master deterministic state engine for Eswar's continuous cinematic motion journey.
 * Computes character animation sequence, frame index, X/Y screen coordinates,
 * camera zoom scale, horizontal flip, and grounding shadow for any scroll progress (0 to 1).
 *
 * Journey:
 * LOADING (0.00 -> 0.08)
 *   ↓
 * HERO (0.08 -> 0.18)
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

function easeInOut(t) {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function getCharacterState(
  progress,
  viewportWidth = 1920,
  viewportHeight = 1080
) {
  const p = Math.max(0, Math.min(1, progress));
  const isMobile = viewportWidth < 768;

  // ============================================================
  // GALLERY FLOOR
  // ============================================================
  // ProjectsWorld & TechStackWorld:
  // Wall starts at 12vh and has approximately 520px height.
  // Character feet are aligned to this floor.
  const galleryFloorY = 0.12 * viewportHeight + 520;

  // ============================================================
  // CHARACTER SCALE
  // ============================================================
  // RESTORED TO THE PREVIOUS / ORIGINAL CHARACTER SIZE.
  //
  // These are intentionally larger than the recently reduced
  // values while keeping the new floor-positioning system.
  // ============================================================
  const WALK_SCALE = isMobile ? 0.72 : 0.88;
  const HERO_SCALE = isMobile ? 0.76 : 0.90;
  const FINAL_SCALE = isMobile ? 0.76 : 0.90;

  // ============================================================
  // WALK CHARACTER FLOOR ALIGNMENT
  // ============================================================
  // Walk frame feet are approximately at y = 1066 / 1080.
  //
  // Relative to frame center:
  // (1066 - 540) / 1080 = 0.487037
  //
  // CharacterCanvas renders:
  // height * 0.72 * scale
  //
  // Therefore calculate the target Y dynamically from the actual
  // character size so the feet remain aligned with the gallery floor.
  // ============================================================
  const walkCharHeight =
    viewportHeight * 0.72 * WALK_SCALE;

  const walkTargetY =
    galleryFloorY -
    walkCharHeight * 0.487037;

  const WALK_POSY =
    walkTargetY / viewportHeight;

  // ============================================================
  // POSITION CONSTANTS
  // ============================================================
  const HERO_POSX = isMobile ? 0.50 : 0.20;
  const HERO_POSY = isMobile ? 0.44 : 0.50;

  const WALK_START_POSX =
    isMobile ? 0.25 : 0.20;

  const WALK_END_POSX =
    isMobile ? 0.75 : 0.72;

  const FINAL_POSX =
    isMobile ? 0.50 : 0.20;

  const FINAL_POSY =
    isMobile ? 0.52 : 0.52;

  // ============================================================
  // FALL LANDING FLOOR CORRECTION
  // ============================================================
  // fallLand frame 75 floor contact is approximately y = 989.
  //
  // Walk frame floor contact = y = 1066.
  //
  // Difference:
  // (1066 - 989) / 1080 = 77 / 1080
  //
  // This keeps the landing frame visually aligned with the
  // walking character's floor.
  // ============================================================
  const landingFloorDelta =
    (77 / 1080) * 0.72;

  // ============================================================
  // DEFAULT STATE
  // ============================================================
  let sequence = 'walk';
  let frameIndex = 0;

  let posX = HERO_POSX;
  let posY = HERO_POSY;

  let scale = HERO_SCALE;

  let flipX = false;

  let shadowOpacity = 0.25;
  let shadowScale = 1.0;

  let sceneName = 'loading';

  let isVisible = true;

  // ============================================================
  // 1. LOADING
  // 0.00 -> 0.08
  // ============================================================
  if (p < 0.08) {
    sceneName = 'loading';

    sequence = 'walk';
    frameIndex = 0;

    flipX = false;

    scale = HERO_SCALE;

    posX = HERO_POSX;
    posY = HERO_POSY;

    shadowOpacity = 0.25;
    shadowScale = 1.0;

    isVisible = true;
  }

  // ============================================================
  // 2. HERO
  // 0.08 -> 0.18
  // ============================================================
  else if (p < 0.18) {
    sceneName = 'hero';

    sequence = 'walk';
    frameIndex = 0;

    flipX = false;

    scale = HERO_SCALE;

    posX = HERO_POSX;
    posY = HERO_POSY;

    shadowOpacity = 0.25;
    shadowScale = 1.0;

    // Hero uses wave.png directly.
    // Prevent duplicate canvas character.
    isVisible = false;
  }

  // ============================================================
  // 3. FIRST FALL + LAND
  // HERO -> PROJECTS
  // 0.18 -> 0.28
  // ============================================================
  else if (p < 0.28) {
    sceneName = 'transition-1';

    sequence = 'fallLand';

    const localP =
      (p - 0.18) / 0.10;

    frameIndex =
      Math.min(
        75,
        Math.floor(localP * 76)
      );

    flipX = false;

    const easedP =
      easeInOut(localP);

    // Horizontal movement
    posX =
      HERO_POSX +
      (WALK_START_POSX - HERO_POSX) *
      easedP;

    // Character scale transitions from
    // large HERO size to large WALK size.
    scale =
      HERO_SCALE +
      (WALK_SCALE - HERO_SCALE) *
      easedP;

    // Vertical movement follows the calculated
    // gallery floor position.
    const basePosY =
      HERO_POSY +
      (WALK_POSY - HERO_POSY) *
      easedP;

    // FALL
    if (localP < 0.5) {
      const fallFrac =
        localP / 0.5;

      posY =
        basePosY -
        Math.sin(fallFrac * Math.PI) *
        0.05;

      shadowOpacity =
        Math.max(
          0.05,
          0.25 - fallFrac * 0.18
        );

      shadowScale = 0.55;
    }

    // LAND
    else {
      const landFrac =
        (localP - 0.5) / 0.5;

      const landOffset =
        landFrac *
        landingFloorDelta *
        WALK_SCALE;

      posY =
        basePosY +
        landOffset;

      shadowOpacity =
        0.25 +
        landFrac * 0.15;

      shadowScale =
        0.70 +
        landFrac * 0.30;
    }
  }

  // ============================================================
  // 4. PROJECT WALL WALK
  // 0.28 -> 0.52
  // ============================================================
  else if (p < 0.52) {
    sceneName = 'projects';

    sequence = 'walk';

    const localP =
      (p - 0.28) / 0.24;

    const totalFrames =
      116 * 3;

    frameIndex =
      Math.floor(
        localP * totalFrames
      ) % 116;

    flipX = false;

    scale = WALK_SCALE;

    posX =
      WALK_START_POSX +
      localP *
      (WALK_END_POSX -
        WALK_START_POSX);

    posY = WALK_POSY;

    shadowOpacity = 0.26;
    shadowScale = 1.0;
  }

  // ============================================================
  // 5. SECOND FALL + LAND
  // PROJECTS -> TECH STACK
  // 0.52 -> 0.62
  // ============================================================
  else if (p < 0.62) {
    sceneName = 'transition-2';

    sequence = 'fallLand';

    const localP =
      (p - 0.52) / 0.10;

    frameIndex =
      Math.min(
        75,
        Math.floor(localP * 76)
      );

    flipX = false;

    scale = WALK_SCALE;

    const easedP =
      easeInOut(localP);

    posX =
      WALK_END_POSX +
      (WALK_START_POSX -
        WALK_END_POSX) *
      easedP;

    // FALL
    if (localP < 0.5) {
      const fallFrac =
        localP / 0.5;

      posY =
        WALK_POSY -
        Math.sin(fallFrac * Math.PI) *
        0.05;

      shadowOpacity =
        Math.max(
          0.05,
          0.26 - fallFrac * 0.18
        );

      shadowScale = 0.55;
    }

    // LAND
    else {
      const landFrac =
        (localP - 0.5) / 0.5;

      const landOffset =
        landFrac *
        landingFloorDelta *
        WALK_SCALE;

      posY =
        WALK_POSY +
        landOffset;

      shadowOpacity =
        0.25 +
        landFrac * 0.15;

      shadowScale =
        0.70 +
        landFrac * 0.30;
    }
  }

  // ============================================================
  // 6. TECH STACK WALL WALK
  // 0.62 -> 0.86
  // ============================================================
  else if (p < 0.86) {
    sceneName = 'techStack';

    sequence = 'walk';

    const localP =
      (p - 0.62) / 0.24;

    const totalFrames =
      116 * 3;

    frameIndex =
      Math.floor(
        localP * totalFrames
      ) % 116;

    flipX = false;

    scale = WALK_SCALE;

    posX =
      WALK_START_POSX +
      localP *
      (WALK_END_POSX -
        WALK_START_POSX);

    posY = WALK_POSY;

    shadowOpacity = 0.26;
    shadowScale = 1.0;
  }

  // ============================================================
  // 7. THIRD FALL + LAND
  // TECH STACK -> FINAL
  // 0.86 -> 0.93
  // ============================================================
  else if (p < 0.93) {
    sceneName = 'transition-3';

    sequence = 'fallLand';

    const localP =
      (p - 0.86) / 0.07;

    frameIndex =
      Math.min(
        75,
        Math.floor(localP * 76)
      );

    flipX = false;

    const easedP =
      easeInOut(localP);

    posX =
      WALK_END_POSX +
      (FINAL_POSX -
        WALK_END_POSX) *
      easedP;

    scale =
      WALK_SCALE +
      (FINAL_SCALE -
        WALK_SCALE) *
      easedP;

    const basePosY =
      WALK_POSY +
      (FINAL_POSY -
        WALK_POSY) *
      easedP;

    // FALL
    if (localP < 0.5) {
      const fallFrac =
        localP / 0.5;

      posY =
        basePosY -
        Math.sin(fallFrac * Math.PI) *
        0.05;

      shadowOpacity =
        Math.max(
          0.05,
          0.26 - fallFrac * 0.18
        );

      shadowScale = 0.55;
    }

    // LAND
    else {
      const landFrac =
        (localP - 0.5) / 0.5;

      const landOffset =
        landFrac *
        landingFloorDelta *
        FINAL_SCALE;

      posY =
        basePosY +
        landOffset;

      shadowOpacity =
        0.25 +
        landFrac * 0.15;

      shadowScale =
        0.70 +
        landFrac * 0.30;
    }
  }

  // ============================================================
  // 8. FINAL / CONTACT
  // 0.93 -> 1.00
  // ============================================================
  else {
    sceneName = 'final';

    sequence = 'walk';
    frameIndex = 0;

    posX = FINAL_POSX;
    posY = FINAL_POSY;

    scale = FINAL_SCALE;

    flipX = false;

    // Final uses wave.png directly.
    // Prevent duplicate canvas character.
    isVisible = false;

    shadowOpacity = 0.28;
    shadowScale = 1.0;
  }

  // ============================================================
  // RETURN STATE
  // ============================================================
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