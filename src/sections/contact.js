import { meta } from '../data/content.js';
import { revealOnScroll } from '../animations/scrollReveal.js';

export function initContact() {
  const section = document.getElementById('contact');

  section.innerHTML = `
    <div class="content-left" style="position:relative;">
      <!-- Decorative scribble SVG -->
      <svg class="decor decor-contact" style="position:absolute; right:-50px; bottom:20px; width:50px; height:50px; opacity:0.6;" viewBox="0 0 100 100">
        <path d="M10 80 Q 30 10 50 60 T 90 20" stroke="var(--green)" stroke-width="6" fill="none" stroke-linecap="round"/>
      </svg>
      <div class="label contact-label contact-reveal">// say hi</div>
      <h2 class="contact-reveal">Open to remote work</h2>

      <div class="envelope-wrapper contact-reveal">
        <div class="envelope">
          <div class="env-back"></div>
          <div class="env-paper">
            <span class="hand">let's build something</span>
          </div>
          <svg class="env-front" viewBox="0 0 150 110" preserveAspectRatio="none">
            <path d="M0 110 L0 0 L75 55 L150 0 L150 110 Z" />
          </svg>
          <svg class="env-flap" viewBox="0 0 150 60" preserveAspectRatio="none">
            <path d="M0 0 L75 55 L150 0 Z" />
          </svg>
        </div>
      </div>

      <a href="mailto:${meta.email}" class="hand contact-email contact-reveal">${meta.email}</a>

      <div class="stamp-links contact-reveal">
        <a href="${meta.github}" target="_blank" class="stamp-link" aria-label="GitHub">GH</a>
        <a href="${meta.linkedin}" target="_blank" class="stamp-link" aria-label="LinkedIn">LI</a>
        <a href="${meta.cv}" target="_blank" class="stamp-link" aria-label="Resume">CV</a>
      </div>
    </div>
  `;

  revealOnScroll('.contact-reveal', { y: 30, opacity: 0, stagger: 0.1 });
}
