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
          zIndex: 22
        }}
        aria-hidden="true"
      >
        {/* DOODLE 1 (Top Left / Negative Space): Git Flow & Branch Architecture */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(50px, 9vh, 90px)',
            left: 'clamp(20px, 4vw, 70px)',
            opacity: 0.65,
            transform: 'rotate(-2deg)'
          }}
        >
          <svg width="210" height="90" viewBox="0 0 210 90" fill="none">
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

        {/* DOODLE 2 (Top Right / Above Content): Code Brackets & Class Annotation */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(40px, 7vh, 80px)',
            right: 'clamp(30px, 5vw, 90px)',
            opacity: 0.6,
            transform: 'rotate(1.5deg)'
          }}
        >
          <svg width="220" height="85" viewBox="0 0 220 85" fill="none">
            {/* Code symbol brackets */}
            <path d="M25 15 L12 28 L25 41" stroke="var(--ink-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M37 15 L50 28 L37 41" stroke="var(--ink-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="33" y1="12" x2="29" y2="44" stroke="var(--ink-muted)" strokeWidth="1.2" />
            
            {/* Technical class sketch */}
            <text x="62" y="25" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink-secondary)" fontWeight="600">@Service</text>
            <text x="62" y="39" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-muted)">public class RuntimeEngine &#123;</text>
            <text x="75" y="53" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--ink-secondary)">return ResponseEntity.ok();</text>
            <text x="62" y="67" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-muted)">&#125;</text>
            
            {/* Sketch underline */}
            <path d="M60 74 C 95 72, 140 76, 190 73" stroke="var(--ink-muted)" strokeWidth="0.9" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* DOODLE 3 (Bottom Left / Far Below Character): Linux Terminal Session */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(30px, 6vh, 65px)',
            left: 'clamp(20px, 4vw, 60px)',
            opacity: 0.65,
            transform: 'rotate(1deg)'
          }}
        >
          <svg width="240" height="105" viewBox="0 0 240 105" fill="none">
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

        {/* DOODLE 4 (Bottom Right / Under Hero Content): API & HTTP Wireflow */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(25px, 5vh, 50px)',
            right: 'clamp(30px, 6vw, 100px)',
            opacity: 0.6,
            transform: 'rotate(-1.5deg)'
          }}
        >
          <svg width="250" height="90" viewBox="0 0 250 90" fill="none">
            {/* Box 1: Client */}
            <rect x="8" y="24" width="56" height="30" stroke="var(--ink-primary)" strokeWidth="1.3" fill="#fff" />
            <text x="17" y="42" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--ink-primary)">CLIENT</text>
            
            {/* HTTP Arrow */}
            <path d="M64 34 L114 34" stroke="var(--ink-primary)" strokeWidth="1.3" strokeDasharray="3 2" />
            <path d="M108 30 L115 34 L108 38" stroke="var(--ink-primary)" strokeWidth="1.3" strokeLinecap="round" />
            <text x="68" y="28" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-muted)">HTTP/2</text>
            
            {/* Box 2: API Gateway */}
            <rect x="116" y="16" width="68" height="46" stroke="var(--ink-primary)" strokeWidth="1.4" fill="#fff" />
            <text x="124" y="34" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill="var(--ink-primary)">GATEWAY</text>
            <text x="127" y="46" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-muted)">:8080</text>
            <text x="122" y="55" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-secondary)">ROUTER</text>

            {/* Service arrow */}
            <path d="M184 39 L216 39" stroke="var(--ink-primary)" strokeWidth="1.3" />
            <path d="M211 36 L217 39 L211 42" stroke="var(--ink-primary)" strokeWidth="1.3" strokeLinecap="round" />
            <text x="195" y="52" fontFamily="var(--font-hand)" fontSize="12" fill="var(--ink-secondary)">200 OK</text>

            {/* Return Arc */}
            <path d="M116 54 C 95 68, 80 66, 64 54" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="76" y="76" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--ink-muted)">payload: JSON</text>
          </svg>
        </div>
      </div>
    );
  }

  // Final Scene Doodles (Distinctly Different Technical Arrangement)
  return (
    <div
      className="developer-doodles-container final-doodles"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 22
      }}
      aria-hidden="true"
    >
      {/* DOODLE 1 (Top Left / Negative Space): Docker Container & Runtime Pod */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(50px, 10vh, 100px)',
          left: 'clamp(20px, 5vw, 80px)',
          opacity: 0.62,
          transform: 'rotate(-2deg)'
        }}
      >
        <svg width="230" height="95" viewBox="0 0 230 95" fill="none">
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

      {/* DOODLE 2 (Top Right / Above Contact Dossier): CI/CD Delivery Pipeline */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(40px, 8vh, 85px)',
          right: 'clamp(30px, 6vw, 110px)',
          opacity: 0.65,
          transform: 'rotate(1deg)'
        }}
      >
        <svg width="260" height="75" viewBox="0 0 260 75" fill="none">
          {/* Stage 1: Build */}
          <rect x="8" y="16" width="54" height="28" stroke="var(--ink-primary)" strokeWidth="1.3" fill="#fff" />
          <text x="18" y="33" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill="var(--ink-primary)">BUILD</text>

          <line x1="62" y1="30" x2="82" y2="30" stroke="var(--ink-secondary)" strokeWidth="1.2" />
          <path d="M78 27 L83 30 L78 33" stroke="var(--ink-secondary)" strokeWidth="1.2" />

          {/* Stage 2: Test */}
          <rect x="84" y="16" width="50" height="28" stroke="var(--ink-primary)" strokeWidth="1.3" fill="#fff" />
          <text x="96" y="33" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill="var(--ink-primary)">TEST</text>

          <line x1="134" y1="30" x2="154" y2="30" stroke="var(--ink-secondary)" strokeWidth="1.2" />
          <path d="M150 27 L155 30 L150 33" stroke="var(--ink-secondary)" strokeWidth="1.2" />

          {/* Stage 3: Deploy */}
          <rect x="156" y="16" width="58" height="28" stroke="var(--ink-primary)" strokeWidth="1.4" fill="#fff" />
          <text x="166" y="33" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill="var(--ink-primary)">DEPLOY</text>

          {/* Checkmark badge */}
          <circle cx="232" cy="30" r="10" stroke="var(--ink-primary)" strokeWidth="1.4" fill="#fff" />
          <path d="M228 30 L231 33 L237 27" stroke="var(--ink-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

          <text x="10" y="58" fontFamily="var(--font-hand)" fontSize="12" fill="var(--ink-muted)">pipeline passed • 0 failures</text>
        </svg>
      </div>

      {/* DOODLE 3 (Bottom Left / Under Character Slot): Database & ACID Transaction Schema */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(25px, 5vh, 60px)',
          left: 'clamp(20px, 4vw, 70px)',
          opacity: 0.65,
          transform: 'rotate(1.5deg)'
        }}
      >
        <svg width="220" height="95" viewBox="0 0 220 95" fill="none">
          {/* Cylinder Database Sketch */}
          <ellipse cx="40" cy="22" rx="28" ry="9" stroke="var(--ink-primary)" strokeWidth="1.4" fill="#fff" />
          <path d="M12 22 L12 56 C12 62, 68 62, 68 56 L68 22" stroke="var(--ink-primary)" strokeWidth="1.4" fill="#fff" />
          <ellipse cx="40" cy="56" rx="28" ry="9" stroke="var(--ink-primary)" strokeWidth="1.4" fill="none" />
          <ellipse cx="40" cy="39" rx="28" ry="9" stroke="var(--ink-secondary)" strokeWidth="1" strokeDasharray="2 2" fill="none" />

          <text x="24" y="41" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill="var(--ink-primary)">MySQL</text>

          {/* Relation arrow to table */}
          <path d="M68 38 L108 38" stroke="var(--ink-primary)" strokeWidth="1.2" strokeDasharray="3 2" />
          
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

      {/* DOODLE 4 (Bottom Right / Colophon Area): Process Termination & Clean Exit */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 4vh, 50px)',
          right: 'clamp(25px, 5vw, 85px)',
          opacity: 0.6,
          transform: 'rotate(-1deg)'
        }}
      >
        <svg width="220" height="75" viewBox="0 0 220 75" fill="none">
          <rect x="6" y="8" width="206" height="54" stroke="var(--ink-secondary)" strokeWidth="1.2" strokeDasharray="4 3" fill="rgba(255,255,255,0.6)" />
          <text x="16" y="24" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-muted)">$ kill -SIGTERM 1024</text>
          <text x="16" y="37" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" fill="var(--ink-primary)">EXIT_STATUS: 0 (OK)</text>
          <text x="16" y="50" fontFamily="var(--font-hand)" fontSize="13" fill="var(--ink-secondary)">runtime memory freed • connection closed</text>
        </svg>
      </div>
    </div>
  );
}
