import { about } from '../data/content.js';
import { drawPath } from '../animations/svgDraw.js';
import { revealOnScroll } from '../animations/scrollReveal.js';

export function initAbout() {
  const section = document.getElementById('about');

  // SVG strings for icons
  const icons = {
    code: '<path class="draw-skill" d="M18 12 L8 24 L18 36 M30 12 L40 24 L30 36" />',
    brain: '<path class="draw-skill" d="M24 8 C14 8 10 16 14 24 C16 28 20 30 20 36 L28 36 C28 30 32 28 34 24 C38 16 34 8 24 8 Z M20 36 L20 40 M28 36 L28 40 M22 42 L26 42" />',
    terminal: '<path class="draw-skill" d="M6 10 L42 10 L42 38 L6 38 Z M12 18 L18 24 L12 30 M22 30 L30 30" />',
    gear: '<circle class="draw-skill" cx="24" cy="24" r="8" /><path class="draw-skill" d="M24 10 L24 6 M24 38 L24 42 M10 24 L6 24 M42 24 L38 24 M14 14 L11 11 M37 37 L34 34 M14 34 L11 37 M37 11 L34 14" />',
    model: '<circle class="draw-skill" cx="14" cy="16" r="4" /><circle class="draw-skill" cx="14" cy="32" r="4" /><circle class="draw-skill" cx="34" cy="24" r="4" /><path class="draw-skill" d="M18 16 L30 24 M18 32 L30 24" />',
    data: '<path class="draw-skill" d="M10 38 L38 38 M14 38 L14 24 M24 38 L24 14 M34 38 L34 20" />'
  };

  const bioHtml = about.bio.map(p => `<p>${p}</p>`).join('');
  const skillsHtml = about.skills.map(s => `
    <div class="skill skill-reveal">
      <svg viewBox="0 0 48 48">
        ${icons[s.icon] || ''}
      </svg>
      <span class="label">${s.label}</span>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="content-right section-alt" style="position:relative;">
      <div style="position:relative; z-index:6;">
        <!-- Decorative arrows SVG -->
        <svg class="decor decor-about" style="position:absolute; left:-60px; top:10px; width:40px; height:40px; opacity: 0.6" viewBox="0 0 100 100">
          <path d="M10 50 Q 50 10 90 50 M10 70 Q 50 30 90 70" stroke="var(--ink-soft)" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>
        <!-- Coffee mug SVG -->
        <svg class="decor decor-coffee" style="position:absolute; right:10px; bottom:20px; width:50px; height:50px; opacity: 0.7" viewBox="0 0 100 100">
          <!-- Cup -->
          <path d="M20 40 L20 80 C20 95 60 95 60 80 L60 40 Z" fill="none" stroke="var(--rust)" stroke-width="4"/>
          <!-- Handle -->
          <path d="M60 50 C80 50 80 70 60 70" fill="none" stroke="var(--rust)" stroke-width="4"/>
          <!-- Steam -->
          <path d="M30 30 Q35 15 25 0 M40 35 Q45 20 35 5 M50 30 Q55 15 45 0" fill="none" stroke="var(--ink-soft)" stroke-width="2" stroke-dasharray="4 4"/>
        </svg>
        <div class="about-header about-reveal">
          <div class="label about-label">// about</div>
          <h2>What I'm working with</h2>
        </div>

        <div class="about-grid">
          <div class="photo-wrapper about-reveal">
            <div class="photo-tape top-left"></div>
            <div class="photo-placeholder" style="padding:0; overflow:hidden;">
              <img src="/about.jpeg" alt="About" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div class="photo-tape bottom-right"></div>
          </div>

          <div class="about-content">
            <div class="about-bio about-reveal">
              ${bioHtml}
              <div class="hand about-aside">"${about.aside}"</div>
            </div>

            <div class="skills-row">
              ${skillsHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Animations
  revealOnScroll('.about-reveal', { y: 30, opacity: 0, stagger: 0.1 });
  revealOnScroll('.skill-reveal', { y: 20, opacity: 0, stagger: 0.05 });

  // Draw SVG paths when scrolled into view
  const skillPaths = document.querySelectorAll('#about .draw-skill');
  skillPaths.forEach(path => {
    // start hidden
    path.style.strokeDasharray = 1;
    path.style.strokeDashoffset = 1;
    path.setAttribute('pathLength', '1');

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: path,
          start: 'top 85%'
        }
      });
    });
  });
}
