import React from 'react';

/**
 * DeveloperDoodles
 * Hand-drawn technical pencil / graphite sketch doodles for Hero and Final sections.
 * 
 * Aesthetic:
 * - Technical editorial notebook
 * - Graphite pencil sketch lines (subtle, imperfect, dashed)
 * - Strict black, white & grayscale
 * - Zero pointer events, positioned in negative space around content
 */

export default function DeveloperDoodles({ variant = 'hero' }) {
  if (variant === 'hero') {
    return (
      <div
        className="developer-doodles-container hero-doodles"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 15
        }}
        aria-hidden="true"
      >
        {/* DOODLE 1 (Far Top Left / Outer Negative Space): Git Flow & Branch Architecture */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(90px, 13vh, 130px)',
            left: 'clamp(8px, 1.8vw, 24px)',
            opacity: 0.35,
            transform: 'rotate(-2deg)'
          }}
        >
          <svg width="190" height="80" viewBox="0 0 210 90" fill="none">
            {/* Git Main Branch Line */}
            <line x1="20" y1="35" x2="190" y2="35" stroke="var(--ink-secondary)" strokeWidth="1.5" strokeDasharray="4 2" />
            
            {/* Main branch commits */}
            <circle cx="40" cy="35" r="4.5" fill="#fff" stroke="var(--ink-primary)" strokeWidth="1.6" />
            <circle cx="95" cy="35" r="4.5" fill="#fff" stroke="var(--ink-primary)" strokeWidth="1.6" />
            <circle cx="170" cy="35" r="4.5" fill="var(--ink-primary)" />
            
            {/* Feature branch arc */}
            <path d="M40 35 C 55 60, 75 65, 95 65 L 135 65 C 150 65, 160 48, 170 35" stroke="var(--ink-secondary)" strokeWidth="1.4" strokeDasharray="3 3" />
            <circle cx="115" cy="65" r="4" fill="#fff" stroke="var(--ink-primary)" strokeWidth="1.5" />
            
            {/* Text annotations */}
            <text x="20" y="22" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-muted)" letterSpacing="0.05em">origin/main</text>
            <text x="100" y="80" fontFamily="var(--font-hand)" fontSize="13" fill="var(--ink-secondary)">git checkout -b feature</text>
            <text x="155" y="24" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-muted)">HEAD</text>
          </svg>
        </div>

        {/* DOODLE 3 (Far Bottom Left / Outer Negative Margin): Linux Terminal Session */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(15px, 3vh, 35px)',
            left: 'clamp(8px, 1.8vw, 24px)',
            opacity: 0.35,
            transform: 'rotate(1deg)'
          }}
        >
          <svg width="210" height="92" viewBox="0 0 240 105" fill="none">
            {/* Terminal Window Frame */}
            <rect x="5" y="5" width="228" height="94" rx="2" stroke="var(--ink-primary)" strokeWidth="1.4" fill="rgba(255,255,255,0.7)" />
            <line x1="5" y1="22" x2="233" y2="22" stroke="var(--ink-primary)" strokeWidth="1.2" />
            
            {/* Window control dots */}
            <circle cx="16" cy="13.5" r="2.5" fill="var(--ink-primary)" />
            <circle cx="26" cy="13.5" r="2.5" fill="none" stroke="var(--ink-secondary)" strokeWidth="1" />
            <circle cx="36" cy="13.5" r="2.5" fill="none" stroke="var(--ink-secondary)" strokeWidth="1" />
            
            <text x="50" y="15" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--ink-muted)">bash — 80x24</text>
            
            {/* Terminal Command Output */}
            <text x="14" y="37" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-primary)">$ ./mvnw spring-boot:run</text>
            <text x="14" y="51" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-muted)">[INFO] Bootstrapping JVM 21...</text>
            <text x="14" y="65" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-secondary)">[INFO] Netty server on :8080</text>
            <text x="14" y="79" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--ink-primary)">$ curl localhost:8080/health</text>
            <text x="14" y="92" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-secondary)">&#123; "status": "UP" &#125; █</text>
          </svg>
        </div>
      </div>
    );
  }

  // Final Scene Doodles (Placed strictly in outer negative periphery)
  return (
    <div
      className="developer-doodles-container final-doodles"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 15
      }}
      aria-hidden="true"
    >
      {/* DOODLE 1 (Far Top Left / Outer Negative Space): Docker Container & Runtime Pod */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(90px, 13vh, 130px)',
          left: 'clamp(8px, 1.8vw, 24px)',
          opacity: 0.35,
          transform: 'rotate(-2deg)'
        }}
      >
        <svg width="200" height="85" viewBox="0 0 230 95" fill="none">
          {/* Container isometric block sketch */}
          <rect x="8" y="18" width="80" height="52" stroke="var(--ink-primary)" strokeWidth="1.4" fill="rgba(255,255,255,0.7)" />
          {/* Internal container partitions */}
          <line x1="28" y1="18" x2="28" y2="70" stroke="var(--ink-secondary)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="48" y1="18" x2="48" y2="70" stroke="var(--ink-secondary)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="68" y1="18" x2="68" y2="70" stroke="var(--ink-secondary)" strokeWidth="1" strokeDasharray="3 2" />
          
          <text x="14" y="34" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--ink-primary)">DOCKER</text>
          <text x="14" y="47" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-muted)">POD: v2</text>
          <text x="14" y="60" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-secondary)">0.0.0.0:8080</text>

          {/* Connected runtime notes */}
          <path d="M88 44 L 125 44" stroke="var(--ink-secondary)" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="127" cy="44" r="3" fill="var(--ink-primary)" />
          <text x="135" y="38" fontFamily="var(--font-hand)" fontSize="13" fill="var(--ink-primary)">docker compose up -d</text>
          <text x="135" y="52" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-muted)">STATUS: HEALTHY</text>
          <text x="135" y="66" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--ink-secondary)">UPTIME: 99.98%</text>
        </svg>
      </div>

      {/* DOODLE 3 (Far Bottom Left / Outer Negative Margin): Database & ACID Transaction Schema */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(15px, 3vh, 35px)',
          left: 'clamp(8px, 1.8vw, 24px)',
          opacity: 0.35,
          transform: 'rotate(1.5deg)'
        }}
      >
        <svg width="200" height="86" viewBox="0 0 220 95" fill="none">
          {/* Cylinder Database Sketch */}
          <ellipse cx="40" cy="22" rx="28" ry="9" stroke="var(--ink-primary)" strokeWidth="1.4" fill="#fff" />
          <path d="M12 22 L12 56 C12 62, 68 62, 68 56 L68 22" stroke="var(--ink-primary)" strokeWidth="1.4" fill="#fff" />
          <ellipse cx="40" cy="56" rx="28" ry="9" stroke="var(--ink-primary)" strokeWidth="1.4" fill="none" />
          <ellipse cx="40" cy="39" rx="28" ry="9" stroke="var(--ink-secondary)" strokeWidth="1" strokeDasharray="2 2" fill="none" />

          <text x="24" y="41" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill="var(--ink-primary)">MySQL</text>

          {/* Relation arrow to table */}
          <path d="M68 38 L 108 38" stroke="var(--ink-primary)" strokeWidth="1.2" strokeDasharray="3 2" />
          
          {/* Table schematic */}
          <rect x="110" y="18" width="98" height="52" stroke="var(--ink-primary)" strokeWidth="1.2" fill="#fff" />
          <line x1="110" y1="32" x2="208" y2="32" stroke="var(--ink-primary)" strokeWidth="1" />
          <text x="115" y="28" fontFamily="var(--font-mono)" fontSize="7" fontWeight="700" fill="var(--ink-primary)">TRANSACTIONS</text>
          <text x="115" y="42" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-muted)">+ tx_id [PK] UUID</text>
          <text x="115" y="52" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-secondary)">+ amount DECIMAL</text>
          <text x="115" y="62" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-muted)">+ status VARCHAR</text>

          <text x="15" y="82" fontFamily="var(--font-hand)" fontSize="12" fill="var(--ink-secondary)">ACID isolation: SERIALIZABLE</text>
        </svg>
      </div>
    </div>
  );
}
