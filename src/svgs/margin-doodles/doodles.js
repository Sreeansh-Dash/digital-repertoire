export const doodles = [
  {
    id: "coffee-ring",
    type: "static",
    defaultWidth: 80,
    svgString: `
      <svg viewBox="0 0 100 100" class="doodle-svg" style="width: 80px; height: 80px; transform: rotate(15deg); opacity: 0.8; overflow: visible;">
        <path class="draw-doodle" d="M50,10 C75,8 90,25 88,50 C85,78 65,92 40,88 C15,84 8,60 12,35 C15,15 30,12 50,10 Z" fill="none" stroke="var(--rust)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="draw-doodle" d="M45,20 C60,18 75,30 73,48 C70,68 55,75 38,72 C22,68 18,50 20,38 C22,25 32,22 45,20" fill="none" stroke="var(--rust)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 4" />
        <circle class="draw-doodle" cx="80" cy="20" r="1.5" fill="none" stroke="var(--rust)" stroke-width="1.5" />
        <circle class="draw-doodle" cx="20" cy="80" r="1" fill="none" stroke="var(--rust)" stroke-width="1.5" />
      </svg>
    `
  },
  {
    id: "paperclip",
    type: "static",
    defaultWidth: 40,
    svgString: `
      <svg viewBox="0 0 60 100" class="doodle-svg" style="width: 40px; height: 65px; transform: rotate(-10deg); overflow: visible;">
        <path class="draw-doodle" d="M20,80 L20,30 C20,15 40,15 40,30 L40,85 C40,95 10,95 10,85 L10,20 C10,5 50,5 50,20 L50,70" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    id: "washi-tape",
    type: "washi-tape", // will sway
    defaultWidth: 100,
    svgString: `
      <svg viewBox="0 0 120 40" class="doodle-svg" style="width: 100px; height: 35px; transform-origin: center; opacity: 0.85; overflow: visible;">
        <path class="draw-doodle" d="M5,5 L115,2 L118,35 L2,38 Z" fill="var(--paper-alt)" stroke="var(--ink-soft)" stroke-width="1" stroke-dasharray="2 4"/>
        <path class="draw-doodle" d="M15,4 L5,37 M30,3 L20,37 M45,3 L35,37 M60,2 L50,37 M75,2 L65,37 M90,2 L80,36 M105,2 L95,36 M115,10 L110,35" fill="none" stroke="var(--ochre)" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: "compass-rose",
    type: "compass-rose", // needle will wobble
    defaultWidth: 70,
    svgString: `
      <svg viewBox="0 0 100 100" class="doodle-svg" style="width: 70px; height: 70px; overflow: visible;">
        <circle class="draw-doodle" cx="50" cy="50" r="40" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="4 6"/>
        <path class="draw-doodle" d="M50,5 L50,95 M5,50 L95,50" fill="none" stroke="var(--ink-soft)" stroke-width="1.5"/>
        <g class="compass-needle" style="transform-origin: 50px 50px;">
          <path class="draw-doodle" d="M50,15 L58,50 L50,85 L42,50 Z" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
          <path class="draw-doodle" d="M50,15 L50,85" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
        </g>
      </svg>
    `
  },
  {
    id: "arrow-note",
    type: "arrow-note", // arrow will bob
    defaultWidth: 100,
    svgString: `
      <svg viewBox="0 0 120 80" class="doodle-svg" style="width: 100px; height: 65px; overflow: visible;">
        <g class="arrow-bob">
          <path class="draw-doodle" d="M10,20 Q40,-10 70,30 T110,50 M100,35 L110,50 L95,55" fill="none" stroke="var(--green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text class="doodle-text hand" x="15" y="65" fill="var(--ink)" font-size="18" style="opacity: 0;">look here</text>
      </svg>
    `
  },
  {
    id: "asterisk-cluster",
    type: "static",
    defaultWidth: 60,
    svgString: `
      <svg viewBox="0 0 80 80" class="doodle-svg" style="width: 60px; height: 60px; overflow: visible;">
        <path class="draw-doodle" d="M30,10 L30,40 M15,18 L45,32 M15,32 L45,18" fill="none" stroke="var(--ochre)" stroke-width="2.5" stroke-linecap="round"/>
        <path class="draw-doodle" d="M60,40 L60,60 M50,45 L70,55 M50,55 L70,45" fill="none" stroke="var(--ochre)" stroke-width="2" stroke-linecap="round"/>
        <path class="draw-doodle" d="M20,60 L20,70 M15,62 L25,68 M15,68 L25,62" fill="none" stroke="var(--ochre)" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: "pencil",
    type: "static",
    defaultWidth: 100,
    svgString: `
      <svg viewBox="0 0 140 56" class="doodle-svg" style="width: 100px; height: 40px; transform: rotate(-5deg); overflow: visible;">
        <path class="draw-doodle" d="M20 42 L110 16" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
        <path class="draw-doodle" d="M110 16 L127 11 L119 25 Z" fill="var(--ink)"/>
        <path class="draw-doodle" d="M8 46 L24 40 L29 49 L13 55 Z" fill="var(--rust)" stroke="var(--ink)" stroke-width="1.5"/>
        <path class="draw-doodle" d="M22 41 L26.5 49" stroke="var(--ink)" stroke-width="1.2" fill="none"/>
      </svg>
    `
  },
  {
    id: "magnifying-glass",
    type: "magnifying-glass",
    defaultWidth: 70,
    svgString: `
      <svg viewBox="0 0 80 80" class="doodle-svg" style="width: 70px; height: 70px; transform-origin: 32px 32px; overflow: visible;">
        <circle class="draw-doodle" cx="32" cy="32" r="20" fill="none" stroke="var(--ink)" stroke-width="3"/>
        <path class="draw-doodle" d="M46 46 L68 68" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
        <path class="draw-doodle" d="M23 21 Q30 16 39 19" fill="none" stroke="var(--paper)" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: "terminal-window",
    type: "static",
    defaultWidth: 100,
    svgString: `
      <svg viewBox="0 0 110 76" class="doodle-svg" style="width: 100px; height: 70px; transform: rotate(2deg); overflow: visible;">
        <rect class="draw-doodle" x="4" y="4" width="102" height="68" rx="6" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
        <line class="draw-doodle" x1="4" y1="20" x2="106" y2="20" stroke="var(--ink)" stroke-width="2"/>
        <circle class="draw-doodle" cx="14" cy="12" r="2.6" fill="var(--rust)"/>
        <circle class="draw-doodle" cx="23" cy="12" r="2.6" fill="var(--ochre)"/>
        <circle class="draw-doodle" cx="32" cy="12" r="2.6" fill="var(--green)"/>
        <path class="draw-doodle" d="M16 36 L28 44 L16 52" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <line class="draw-doodle" x1="34" y1="52" x2="58" y2="52" stroke="var(--green)" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: "neural-doodle",
    type: "static",
    defaultWidth: 100,
    svgString: `
      <svg viewBox="0 0 120 76" class="doodle-svg" style="width: 100px; height: 60px; transform: rotate(-3deg); overflow: visible;">
        <g stroke="var(--ink)" stroke-width="1.6" fill="none">
          <line class="draw-doodle" x1="20" y1="14" x2="86" y2="22"/>
          <line class="draw-doodle" x1="20" y1="14" x2="86" y2="54"/>
          <line class="draw-doodle" x1="20" y1="38" x2="86" y2="22"/>
          <line class="draw-doodle" x1="20" y1="38" x2="86" y2="54"/>
          <line class="draw-doodle" x1="20" y1="62" x2="86" y2="22"/>
          <line class="draw-doodle" x1="20" y1="62" x2="86" y2="54"/>
        </g>
        <g stroke="var(--ink)" stroke-width="2">
          <circle class="draw-doodle" cx="20" cy="14" r="6" fill="var(--paper)"/>
          <circle class="draw-doodle" cx="20" cy="38" r="6" fill="var(--paper)"/>
          <circle class="draw-doodle" cx="20" cy="62" r="6" fill="var(--paper)"/>
          <circle class="draw-doodle" cx="86" cy="22" r="6" fill="var(--ochre)"/>
          <circle class="draw-doodle" cx="86" cy="54" r="6" fill="var(--ochre)"/>
        </g>
      </svg>
    `
  },
  {
    id: "lightbulb",
    type: "lightbulb",
    defaultWidth: 60,
    svgString: `
      <svg viewBox="0 0 70 100" class="doodle-svg" style="width: 50px; height: 75px; overflow: visible;">
        <path class="draw-doodle" d="M35 6 C 50 6, 58 18, 58 32 C 58 44, 50 50, 46 58 L24 58 C 20 50, 12 44, 12 32 C 12 18, 20 6, 35 6 Z" fill="none" stroke="var(--ink)" stroke-width="2.6"/>
        <path class="draw-doodle lightbulb-filament" d="M28 38 Q35 26 42 38" fill="none" stroke="var(--ochre)" stroke-width="2.2" stroke-linecap="round"/>
        <rect class="draw-doodle" x="24" y="58" width="22" height="8" fill="none" stroke="var(--ink)" stroke-width="2"/>
        <line class="draw-doodle" x1="24" y1="64" x2="46" y2="64" stroke="var(--ink)" stroke-width="2"/>
        <line class="draw-doodle" x1="6" y1="20" x2="14" y2="24" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>
        <line class="draw-doodle" x1="64" y1="20" x2="56" y2="24" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>
        <line class="draw-doodle" x1="35" y1="0" x2="35" y2="6" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: "pushpin",
    type: "static",
    defaultWidth: 50,
    svgString: `
      <svg viewBox="0 0 50 64" class="doodle-svg" style="width: 40px; height: 50px; transform: rotate(15deg); overflow: visible;">
        <circle class="draw-doodle" cx="25" cy="18" r="15" fill="var(--rust)" stroke="var(--ink)" stroke-width="2.4"/>
        <path class="draw-doodle" d="M14 10 L20 16 M18 8 L24 14 M28 6 L34 12" stroke="var(--paper)" stroke-width="1.6" stroke-linecap="round"/>
        <path class="draw-doodle" d="M25 32 L25 50" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round"/>
        <ellipse class="draw-doodle" cx="25" cy="54" rx="6" ry="2.2" fill="var(--ink)" opacity="0.18"/>
      </svg>
    `
  }
];
