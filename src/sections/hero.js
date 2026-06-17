import { meta } from '../data/content.js';
import gsap from 'gsap';
import { activateTerminalMode } from '../animations/terminalMode.js';

export function initHero() {
  const heroSection = document.getElementById('hero');
  
  heroSection.innerHTML = `
    <div class="content-left" style="position:relative;">
      <div class="label hero-tab" style="margin-bottom: 20px;">// PORTFOLIO_2026</div>
      <h1 style="margin-top:0;">Hi, I'm ${meta.name}.</h1>
      <p class="hand" style="font-size: 1.2rem; max-width: 80%;">${meta.tagline}</p>
      
      <!-- Desk Scene Wrapper -->
      <div style="position:relative; margin-top: 40px; width: 100%;">
        <!-- Hidden Terminal Trigger -->
        <div class="hand terminal-surprise-arrow" style="position: absolute; right: 40px; top: -15px; color: var(--rust); font-size: 0.9rem; transform: rotate(-5deg); white-space: nowrap; pointer-events: none; z-index: 90; opacity: 0.8;">
          click here for a surprise →
        </div>
        <div id="terminal-trigger" tabindex="0" style="position: absolute; right: 20px; top: -10px; width: 12px; height: 12px; background: var(--ink); border-radius: 50%; opacity: 0.2; cursor: pointer; animation: pulse-terminal 2s infinite alternate; z-index: 100;" title="Click me"></div>
        
        <div class="hero-profile" style="position: absolute; right: 0; top: -40px; width:160px; height:190px; background:var(--paper); padding:10px 10px 30px 10px; border:1px solid var(--ink-soft); box-shadow: 4px 4px 0 rgba(0,0,0,0.05); transform: rotate(6deg); z-index: 20;">
          <img src="/profile.jpg" alt="Profile" style="width:100%; height:100%; object-fit:cover;" />
        </div>
        
        <!-- Desk Scene SVG -->
        <svg viewBox="0 0 600 300" class="hero-scene" style="width: 100%; height: auto; display: block;">
          <g stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
          
          <!-- Desk line -->
          <path class="draw-desk" d="M 20 280 L 580 280" />
          
          <!-- Laptop -->
          <path class="draw-laptop" d="M 150 250 L 450 250 L 420 100 L 180 100 Z" />
          <path class="draw-laptop" d="M 120 280 L 480 280 L 450 250 L 150 250 Z" />
          
          <!-- Code lines inside laptop -->
          <path class="draw-code" stroke="var(--green)" stroke-width="4" d="M 200 130 L 350 130" />
          <path class="draw-code" stroke="var(--ochre)" stroke-width="4" d="M 200 150 L 280 150" />
          <path class="draw-code" stroke="var(--green)" stroke-width="4" d="M 220 170 L 380 170" />
          <path class="draw-code" stroke="var(--ink-soft)" stroke-width="4" d="M 200 190 L 300 190" />
          <path class="draw-code" stroke="var(--ochre)" stroke-width="4" d="M 220 210 L 260 210" />

          <!-- Mug -->
          <path class="draw-mug" d="M 70 280 L 70 200 C 70 190 110 190 110 200 L 110 280" />
          <path class="draw-mug" d="M 110 220 C 130 220 130 260 110 260" />
          
          <!-- Steam -->
          <g stroke-width="2" stroke="var(--ink-soft)">
            <path class="steam-wisp" d="M 80 180 Q 75 165 85 150 T 80 120" />
            <path class="steam-wisp" d="M 90 175 Q 95 160 85 145 T 90 115" />
            <path class="steam-wisp" d="M 100 180 Q 95 165 105 150 T 100 120" />
          </g>

          <!-- Plant -->
          <path class="draw-plant" d="M 500 280 L 490 220 L 530 220 L 520 280" />
          <path class="draw-plant" stroke="var(--green)" d="M 510 220 Q 480 180 470 140" />
          <path class="draw-plant" stroke="var(--green)" d="M 510 220 Q 520 170 550 150" />
          <path class="draw-plant" stroke="var(--green)" d="M 510 220 Q 500 150 515 110" />

          <!-- Pencil -->
          <path class="draw-pencil" fill="var(--ochre)" d="M 380 270 L 450 260 L 448 252 L 378 262 Z" />
          <path class="draw-pencil" fill="var(--ink)" d="M 380 270 L 370 275 L 378 262 Z" />

          <!-- Sticky Notes -->
          <path class="draw-sticky" fill="var(--ochre)" d="M 60 80 L 100 70 L 110 110 L 70 120 Z" />
          <path class="draw-sticky-line" stroke-width="2" d="M 75 95 L 95 90" />
          <path class="draw-sticky-line" stroke-width="2" d="M 78 105 L 98 100" />
          
          <path class="draw-sticky" fill="var(--green)" d="M 500 70 L 540 80 L 530 120 L 490 110 Z" />
          <path class="draw-sticky-line" stroke-width="2" d="M 505 90 L 525 95" />
          <path class="draw-sticky-line" stroke-width="2" d="M 502 100 L 522 105" />

        </g>
      </svg>
    </div>

      <!-- Decorative sparkle SVG -->
      <svg class="decor decor-hero" style="position:absolute; right:-50px; top:50px; width:40px; height:40px" viewBox="0 0 100 100">
        <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="var(--ochre)"/>
      </svg>
      <!-- Additional scatter SVGs -->
      <svg class="decor decor-hero-2" style="position:absolute; left:-30px; bottom:150px; width:20px; height:20px; opacity:0.5" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="10" fill="none" stroke="var(--ink-soft)" stroke-width="4" stroke-dasharray="2 4"/>
        <path d="M50 20 L50 80 M20 50 L80 50" stroke="var(--ink-soft)" stroke-width="4"/>
      </svg>
      <svg class="decor decor-hero-3" style="position:absolute; right:10px; bottom:200px; width:30px; height:30px; opacity:0.6" viewBox="0 0 100 100">
        <path d="M10 90 Q 50 10 90 90" fill="none" stroke="var(--green)" stroke-width="4" stroke-linecap="round"/>
      </svg>

      <div class="scroll-cue label">↓ scroll</div>
      </div>
      <div class="hero-cta-right">
        <div style="position: relative;">
          <div class="hand cta-arrow-container">
            contact me here
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M0,10 Q20,0 35,10" />
              <path d="M30,5 L35,10 L30,15" />
            </svg>
          </div>
          <a href="${meta.github}" target="_blank" class="cta-button">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GitHub
          </a>
        </div>
        <div>
          <a href="${meta.linkedin}" target="_blank" class="cta-button">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
        <div>
          <a href="${meta.leetcode}" target="_blank" class="cta-button">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.473 3.835-1.452l2.609-2.636c.514-.514.496-1.365-.039-1.9-.535-.535-1.386-.553-1.9-.038zm-12.71-3.69l3.076-3.111c.14-.14.332-.218.528-.218s.388.078.528.218l3.076 3.111c.14.14.218.332.218.528s-.078.388-.218.528l-3.076 3.11c-.14.14-.332.218-.528.218s-.388-.078-.528-.218l-3.076-3.11c-.14-.14-.218-.332-.218-.528s.078-.388.218-.528z"/>
            </svg>
            LeetCode
          </a>
        </div>
        <div>
          <a href="${meta.cv}" target="_blank" class="cta-button">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Resume
          </a>
        </div>
      </div>
  `;

  // Animation sequence
  const preparePath = (selector) => {
    const paths = document.querySelectorAll(selector);
    paths.forEach(p => {
      // Don't modify pathLength here if we are setting it, just use generic draw
      p.style.strokeDasharray = 1;
      p.style.strokeDashoffset = 1;
      p.setAttribute('pathLength', '1');
    });
  };

  const drawAnim = (selector, delay, duration = 1.2) => {
    preparePath(selector);
    gsap.to(selector, {
      strokeDashoffset: 0,
      duration: duration,
      delay: delay,
      ease: 'power2.out'
    });
  };

  // Fade in for code
  gsap.set('.draw-code', { opacity: 0 });
  gsap.to('.draw-code', { opacity: 1, duration: 0.5, stagger: 0.1, delay: 1.0 });

  // Draw sequence
  drawAnim('.draw-desk', 0.1);
  drawAnim('.draw-laptop', 0.3);
  drawAnim('.draw-mug', 0.7);
  drawAnim('.draw-plant', 1.1);
  drawAnim('.draw-pencil', 1.2);
  drawAnim('.draw-sticky', 1.6);
  drawAnim('.draw-sticky-line', 1.75);

  // Steam animation starts automatically via CSS

  // Terminal Trigger Events
  const trigger = document.getElementById('terminal-trigger');
  if (trigger) {
    trigger.addEventListener('click', activateTerminalMode);
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') activateTerminalMode();
    });
  }
}
