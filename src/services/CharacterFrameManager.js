/**
 * CharacterFrameManager
 * High-performance frame-by-frame animation asset manager for ESWAR's portfolio.
 * 
 * Features:
 * - Priority-based lazy & progressive frame preloading
 * - Smooth fallback to closest loaded frame during high-velocity scrolling (zero flicker)
 * - Hardware canvas caching & frame retrieval
 * - Sequence progress tracking & event subscriptions
 */

import { getAssetUrl } from '../utils/assetHelper';

class CharacterFrameManager {
  constructor() {
    this.sequences = {
      fallLand: {
        folder: getAssetUrl('assets/character/fall-land'),
        count: 76,
        prefix: 'Timeline 1_000864',
        cache: new Map(),
        loadedCount: 0
      },
      walk: {
        folder: getAssetUrl('assets/character/walk'),
        count: 116,
        prefix: 'Timeline 1_000864',
        cache: new Map(),
        loadedCount: 0
      },
      wave: {
        folder: getAssetUrl('assets/character/wave'),
        count: 120,
        prefix: 'Timeline 1_000864',
        cache: new Map(),
        loadedCount: 0
      }
    };

    this.listeners = new Set();
    this.initialReady = false;
    this.totalLoaded = 0;
    this.totalFrames = 76 + 116 + 120;
    this.isPreloading = false;
  }

  getFrameUrl(sequenceName, index) {
    const seq = this.sequences[sequenceName];
    if (!seq) return null;
    const clampedIndex = Math.max(0, Math.min(seq.count - 1, Math.floor(index)));
    const frameNumber = 86400 + clampedIndex;
    const formattedNum = String(frameNumber).padStart(8, '0');
    const folder = seq.folder.endsWith('/') ? seq.folder.slice(0, -1) : seq.folder;
    return getAssetUrl(`${folder}/Timeline 1_${formattedNum}.webp`);
  }

  loadSingleImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => {
        // Fallback or retry
        resolve(null);
      };
      img.src = url;
    });
  }

  async preloadInitial() {
    if (this.initialReady) return;

    // Load initial critical frames needed for Hero & initial view
    // Hero uses walk[0] as standing idle and fallLand[0]
    const critical = [
      { seq: 'walk', idx: 0 },
      { seq: 'walk', idx: 1 },
      { seq: 'walk', idx: 2 },
      { seq: 'fallLand', idx: 0 },
      { seq: 'fallLand', idx: 75 },
      { seq: 'wave', idx: 0 }
    ];

    const promises = critical.map(async ({ seq, idx }) => {
      const url = this.getFrameUrl(seq, idx);
      const img = await this.loadSingleImage(url);
      if (img) {
        this.sequences[seq].cache.set(idx, img);
        this.sequences[seq].loadedCount++;
        this.totalLoaded++;
      }
    });

    await Promise.all(promises);
    this.initialReady = true;
    this.notifyProgress();

    // Start background progressive loading without blocking UI
    this.startBackgroundPreload();
  }

  startBackgroundPreload() {
    if (this.isPreloading) return;
    this.isPreloading = true;

    // Load sequence by chronological story progression:
    // 1. fallLand (Transition 1)
    // 2. walk (Projects & Tech Stack)
    // 3. wave (Final Scene)
    const queue = [];

    // Add fallLand frames
    for (let i = 0; i < this.sequences.fallLand.count; i++) {
      if (!this.sequences.fallLand.cache.has(i)) {
        queue.push({ seq: 'fallLand', idx: i });
      }
    }
    // Add walk frames
    for (let i = 0; i < this.sequences.walk.count; i++) {
      if (!this.sequences.walk.cache.has(i)) {
        queue.push({ seq: 'walk', idx: i });
      }
    }
    // Add wave frames
    for (let i = 0; i < this.sequences.wave.count; i++) {
      if (!this.sequences.wave.cache.has(i)) {
        queue.push({ seq: 'wave', idx: i });
      }
    }

    // Process queue in concurrency-limited batches (6 at a time for fast & non-blocking downloads)
    const BATCH_SIZE = 6;
    let cursor = 0;

    const processNextBatch = async () => {
      if (cursor >= queue.length) {
        this.isPreloading = false;
        return;
      }

      const batch = queue.slice(cursor, cursor + BATCH_SIZE);
      cursor += BATCH_SIZE;

      await Promise.all(
        batch.map(async ({ seq, idx }) => {
          const url = this.getFrameUrl(seq, idx);
          const img = await this.loadSingleImage(url);
          if (img) {
            this.sequences[seq].cache.set(idx, img);
            this.sequences[seq].loadedCount++;
            this.totalLoaded++;
          }
        })
      );

      this.notifyProgress();

      // Yield slightly to keep browser 60fps responsive
      if (typeof window !== 'undefined' && window.requestIdleCallback) {
        window.requestIdleCallback(processNextBatch, { timeout: 80 });
      } else {
        setTimeout(processNextBatch, 30);
      }
    };

    processNextBatch();
  }

  /**
   * Retrieves image for given sequence and index.
   * If exact frame is loading, smoothly falls back to closest loaded frame in the same sequence.
   */
  getFrame(sequenceName, index) {
    const seq = this.sequences[sequenceName];
    if (!seq) return null;

    const clampedIndex = Math.max(0, Math.min(seq.count - 1, Math.floor(index)));
    
    // Direct cache hit
    if (seq.cache.has(clampedIndex)) {
      return seq.cache.get(clampedIndex);
    }

    // Fallback: search outward for closest cached frame
    for (let offset = 1; offset < seq.count; offset++) {
      const lower = clampedIndex - offset;
      const upper = clampedIndex + offset;
      if (lower >= 0 && seq.cache.has(lower)) {
        return seq.cache.get(lower);
      }
      if (upper < seq.count && seq.cache.has(upper)) {
        return seq.cache.get(upper);
      }
    }

    // Ultimate fallback: check walk frame 0
    return this.sequences.walk.cache.get(0) || null;
  }

  subscribeProgress(callback) {
    this.listeners.add(callback);
    callback(this.getProgress());
    return () => this.listeners.delete(callback);
  }

  notifyProgress() {
    const progress = this.getProgress();
    for (const cb of this.listeners) {
      cb(progress);
    }
  }

  getProgress() {
    return {
      total: this.totalFrames,
      loaded: this.totalLoaded,
      percentage: Math.round((this.totalLoaded / this.totalFrames) * 100),
      initialReady: this.initialReady
    };
  }
}

export const frameManager = new CharacterFrameManager();
