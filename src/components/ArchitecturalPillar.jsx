import React from 'react';

/**
 * ArchitecturalPillar
 * Reusable hand-drawn graphite/pencil stone pillar from the architectural reference drawing.
 * Composed of modular stacked ashlar masonry blocks with characteristic right-edge hatching.
 */
export default function ArchitecturalPillar({ height = 480, width = 72 }) {
  // Number of stacked stone blocks in the pillar shaft
  const blockCount = 8;
  const capHeight = 36;
  const baseHeight = 44;
  const shaftHeight = height - capHeight - baseHeight;
  const blockHeight = shaftHeight / blockCount;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        flexShrink: 0,
        position: 'relative',
        userSelect: 'none',
        pointerEvents: 'none'
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <defs>
          {/* Diagonal pencil hatching pattern for architectural depth on right side of blocks */}
          <pattern id="pillarHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink-secondary)" strokeWidth="1" opacity="0.65" />
          </pattern>
        </defs>

        {/* 1. Capstone Block */}
        <rect
          x="2"
          y="2"
          width={width - 4}
          height={capHeight - 2}
          fill="var(--paper-cream)"
          stroke="var(--ink-primary)"
          strokeWidth="1.8"
        />
        {/* Capstone right hatching */}
        <rect
          x={width - 20}
          y="3"
          width="17"
          height={capHeight - 4}
          fill="url(#pillarHatch)"
        />
        {/* Capstone double accent line */}
        <line x1="6" y1={capHeight - 6} x2={width - 6} y2={capHeight - 6} stroke="var(--ink-secondary)" strokeWidth="1" strokeDasharray="3 2" />

        {/* 2. Stacked Shaft Blocks */}
        {Array.from({ length: blockCount }).map((_, i) => {
          const y = capHeight + i * blockHeight;
          return (
            <g key={i}>
              {/* Stone block body */}
              <rect
                x="6"
                y={y}
                width={width - 12}
                height={blockHeight}
                fill="var(--paper-bg)"
                stroke="var(--ink-primary)"
                strokeWidth="1.5"
              />
              {/* Inner subtle paper texture line */}
              <line x1="8" y1={y + 3} x2={width - 8} y2={y + 3} stroke="var(--paper-border)" strokeWidth="0.8" />
              {/* Right edge shadow hatching */}
              <rect
                x={width - 24}
                y={y + 1}
                width="17"
                height={blockHeight - 2}
                fill="url(#pillarHatch)"
              />
              {/* Subtle graphite brick grain marks */}
              <line
                x1="12"
                y1={y + blockHeight / 2}
                x2="22"
                y2={y + blockHeight / 2}
                stroke="var(--ink-muted)"
                strokeWidth="0.8"
                opacity="0.5"
              />
            </g>
          );
        })}

        {/* 3. Base Plinth Block */}
        <rect
          x="2"
          y={height - baseHeight}
          width={width - 4}
          height={baseHeight - 2}
          fill="var(--paper-cream)"
          stroke="var(--ink-primary)"
          strokeWidth="1.8"
        />
        {/* Base right hatching */}
        <rect
          x={width - 22}
          y={height - baseHeight + 1}
          width="19"
          height={baseHeight - 4}
          fill="url(#pillarHatch)"
        />
        {/* Grounding horizontal lines */}
        <line
          x1="0"
          y1={height - 2}
          x2={width}
          y2={height - 2}
          stroke="var(--ink-primary)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
