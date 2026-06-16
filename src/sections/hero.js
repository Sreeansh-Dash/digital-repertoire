import { meta } from '../data/content.js';
import gsap from 'gsap';

export function initHero() {
  const heroSection = document.getElementById('hero');
  
  heroSection.innerHTML = `
    <div class="content-left" style="position:relative;">
      <div class="label hero-tab" style="margin-bottom: 20px;">// PORTFOLIO_2026</div>
      <h1 style="margin-top:0;">Hi, I'm ${meta.name}.</h1>
      <p class="hand" style="font-size: 1.2rem; max-width: 80%;">${meta.tagline}</p>
      
      <!-- Desk Scene Wrapper -->
      <div style="position:relative; margin-top: 40px; width: 100%;">
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
}
