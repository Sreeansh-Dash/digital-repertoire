import { about } from '../data/content.js';
import { drawPath } from '../animations/svgDraw.js';
import { revealOnScroll } from '../animations/scrollReveal.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shuffle } from '../animations/shuffle.js';

gsap.registerPlugin(ScrollTrigger);

export function initAbout() {
  const section = document.getElementById('about');

  // SVG strings for icons
  const icons = {
    code: '<path class="draw-skill" d="M18 12 L8 24 L18 36 M30 12 L40 24 L30 36" />',
    brain: '<path class="draw-skill" d="M24 8 C14 8 10 16 14 24 C16 28 20 30 20 36 L28 36 C28 30 32 28 34 24 C38 16 34 8 24 8 Z M20 36 L20 40 M28 36 L28 40 M22 42 L26 42" />',
    terminal: '<path class="draw-skill" d="M6 10 L42 10 L42 38 L6 38 Z M12 18 L18 24 L12 30 M22 30 L30 30" />',
    gear: '<circle class="draw-skill" cx="24" cy="24" r="8" /><path class="draw-skill" d="M24 10 L24 6 M24 38 L24 42 M10 24 L6 24 M42 24 L38 24 M14 14 L11 11 M37 37 L34 34 M14 34 L11 37 M37 11 L34 14" />',
    model: '<circle class="draw-skill" cx="14" cy="16" r="4" /><circle class="draw-skill" cx="14" cy="32" r="4" /><circle class="draw-skill" cx="34" cy="24" r="4" /><path class="draw-skill" d="M18 16 L30 24 M18 32 L30 24" />',
    data: '<path class="draw-skill" d="M10 38 L38 38 M14 38 L14 24 M24 38 L24 14 M34 38 L34 20" />',
    tools: '<path class="draw-skill" d="M14 34 L34 14 M30 8 C33 5 39 7 40 10 L34 16 L38 20 L44 14 C45 17 43 23 40 26 Z M8 36 L12 40" />',
    book: '<path class="draw-skill" d="M12 14 L24 16 L36 14 L36 36 L24 38 L12 36 Z M24 16 L24 38 M12 36 C18 36 24 34 24 38 M36 36 C30 34 24 32 24 38" />'
  };

  const bioHtml = about.bio.map(p => `<p>${p}</p>`).join('');
  const skillsHtml = about.skills.map((s, index) => `
    <div class="skill-item skill-reveal">
      <div class="skill-subtopics-wrapper">
        <div class="skill-subtopics" id="shuffle-skill-${index}">
          ${s.subtopics}
        </div>
      </div>
      <div class="skill-category-wrapper">
        <h3 class="skill-category">${s.category}</h3>
      </div>
      <div class="skill-icon-wrapper">
        <svg viewBox="0 0 48 48" class="skill-svg">
          ${icons[s.icon] || ''}
        </svg>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="about-container" style="position:relative; width: 100%; max-width: 1100px; margin: 0 auto;">
      <!-- The beige background box acting as split boundary -->
      <div class="about-split-bg"></div>

      <div style="position:relative; z-index:6; padding: 60px 0;">
        <div class="about-right-content">
          <!-- Decorative arrows SVG -->
          <svg class="decor decor-about" style="position:absolute; left:-60px; top:10px; width:40px; height:40px; opacity: 0.6" viewBox="0 0 100 100">
            <path d="M10 50 Q 50 10 90 50 M10 70 Q 50 30 90 70" stroke="var(--ink-soft)" stroke-width="4" fill="none" stroke-linecap="round"/>
          </svg>
          <!-- Coffee mug SVG -->
          <svg class="decor decor-coffee" style="position:absolute; right:10px; bottom:20px; width:50px; height:50px; opacity: 0.7" viewBox="0 0 100 100">
            <path d="M20 40 L20 80 C20 95 60 95 60 80 L60 40 Z" fill="none" stroke="var(--rust)" stroke-width="4"/>
            <path d="M60 50 C80 50 80 70 60 70" fill="none" stroke="var(--rust)" stroke-width="4"/>
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

            <div class="about-bio about-reveal">
              ${bioHtml}
              <div class="hand about-aside">"${about.aside}"</div>
            </div>
          </div>
        </div>

        <div class="skills-overhaul">
          ${skillsHtml}
        </div>
      </div>
    </div>
  `;

  // Initialize Shuffle text animation on each subtopics list
  about.skills.forEach((s, index) => {
    const el = document.getElementById(`shuffle-skill-${index}`);
    if (el) {
      new Shuffle(el, {
        text: s.subtopics,
        shuffleDirection: "right",
        duration: 0.35,
        animationMode: "evenodd",
        shuffleTimes: 1,
        ease: "power3.out",
        stagger: 0.03,
        threshold: 0.1,
        triggerOnce: false,
        triggerOnHover: true,
        respectReducedMotion: true
      });
    }
  });

  // Animations
  revealOnScroll('.about-reveal', { y: 30, opacity: 0, stagger: 0.1 });
  revealOnScroll('.skill-reveal', { y: 20, opacity: 0, stagger: 0.05 });

  // Draw SVG paths when scrolled into view
  const skillItems = document.querySelectorAll('#about .skill-item');
  skillItems.forEach(item => {
    const paths = item.querySelectorAll('.draw-skill');
    paths.forEach(path => {
      // start hidden
      path.style.strokeDasharray = 1;
      path.style.strokeDashoffset = 1;
      path.setAttribute('pathLength', '1');

      gsap.fromTo(path, 
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item, // Use the layout element as trigger
            start: 'top 85%',
            toggleActions: "restart none none reset"
          }
        }
      );
    });
  });
}
