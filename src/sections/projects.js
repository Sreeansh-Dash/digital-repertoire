import { projects } from '../data/content.js';
import { revealOnScroll } from '../animations/scrollReveal.js';

export function initProjects() {
  const section = document.getElementById('projects');

  const getStatusClass = (status) => {
    switch (status) {
      case 'SHIPPED': return 'status-shipped';
      case 'ACADEMIC': return 'status-academic';
      case 'PATENT PENDING': return 'status-patent-pending';
      default: return 'status-shipped';
    }
  };

  const cardsHtml = projects.map(p => `
    <article class="project-card project-reveal">
      <div style="position:relative; z-index:6;">
        <div class="project-card-header">
          <h3 class="project-title"><a href="${p.link}" target="_blank">${p.title}</a></h3>
          <div class="status-stamp ${getStatusClass(p.status)}">${p.status}</div>
        </div>

        <div class="project-img-placeholder" style="${p.image || p.images ? 'padding: 0; background: transparent; height: auto;' : ''}">
          ${p.images ? 
            `<div style="display: flex; gap: 10px; width: 100%;">
               ${p.images.map(img => `<img src="${img}" alt="${p.title}" style="width: 48%; height: 200px; object-fit: cover; border-radius: 4px; border: 1px solid var(--ink-soft);" />`).join('')}
             </div>` : 
            p.image ? 
            `<img src="${p.image}" alt="${p.title}" style="width: 100%; height: auto; max-height: 250px; object-fit: contain; border-radius: 4px; border: 1px solid var(--ink-soft);" />` : 
            `<span class="label project-img-label">Screenshot pending...</span>`
          }
        </div>

        <p class="project-desc">${p.description}</p>

        <div class="project-stack">
          ${p.stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>

        <div class="project-annotation">
          <svg class="annotation-arrow" viewBox="0 0 40 20">
            <path d="M40 10 L10 10 M15 5 L5 10 L15 15" />
          </svg>
          <span class="hand annotation-text">${p.annotation}</span>
        </div>
      </div>
    </article>
  `).join('');

  section.innerHTML = `
    <div class="content-left" style="position:relative;">
      <!-- Decorative asterisk SVG -->
      <svg class="decor decor-projects" style="position:absolute; right:-40px; top:-20px; width:30px; height:30px; opacity:0.8;" viewBox="0 0 100 100">
        <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M15 85 L85 15" stroke="var(--ochre)" stroke-width="8" stroke-linecap="round"/>
      </svg>
      <!-- Terminal SVG -->
      <svg class="decor decor-terminal" style="position:absolute; left:-30px; bottom:-10px; width:40px; height:30px; opacity:0.6;" viewBox="0 0 100 80">
        <rect x="0" y="0" width="100" height="80" rx="5" fill="none" stroke="var(--ink-soft)" stroke-width="4"/>
        <path d="M10 20 L25 35 L10 50 M35 50 L55 50" stroke="var(--green)" stroke-width="4" stroke-linecap="round" fill="none"/>
      </svg>
      <!-- Additional star -->
      <svg class="decor" style="position:absolute; right:20px; bottom:50px; width:20px; height:20px; opacity:0.5;" viewBox="0 0 100 100">
        <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="var(--rust)"/>
      </svg>
      <div class="projects-header project-reveal">
        <div class="label projects-label">// projects</div>
        <h2>Selected Works</h2>
      </div>

      <div class="projects-grid">
        ${cardsHtml}
      </div>
    </div>
  `;

  // Animate cards on scroll: slight tilt then settles
  revealOnScroll('.project-reveal', { y: 40, opacity: 0, rotation: 1, duration: 0.8, ease: 'back.out(1.2)' });
}
