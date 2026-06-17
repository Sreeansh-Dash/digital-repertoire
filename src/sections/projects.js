import { projects } from '../data/content.js';
import { revealOnScroll } from '../animations/scrollReveal.js';
import gsap from 'gsap';

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

  const renderCard = (p) => `
    <article class="project-card project-reveal">
      <div style="position:relative; z-index:6; height: 100%; display: flex; flex-direction: column;">
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

        <p class="project-desc" style="flex-grow: 1;">${p.description}</p>

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
  `;

  // 9 sets of cards for a massive seamless looping buffer
  const cardsHtml = Array(9).fill(projects).flat().map(renderCard).join('');

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
      <div class="projects-header project-reveal">
        <div class="label projects-label">// projects</div>
        <h2>Selected Works</h2>
      </div>
    </div>
    
    <div class="projects-grid-wrapper">
      <div class="projects-grid">
        ${cardsHtml}
      </div>
    </div>
  `;

  // Animate cards on scroll: slight tilt then settles
  revealOnScroll('.project-reveal', { y: 40, opacity: 0, rotation: 1, duration: 0.8, ease: 'back.out(1.2)' });

  // Init Carousel GSAP logic
  setTimeout(() => {
    const grid = section.querySelector('.projects-grid');
    const cards = grid.querySelectorAll('.project-card');
    const numOriginal = projects.length;
    
    if (cards.length === 0 || numOriginal === 0) return;

    const firstCard = cards[0];
    const firstClonedCard = cards[numOriginal];
    const singleSetWidth = firstClonedCard.offsetLeft - firstCard.offsetLeft;
    
    // Start deep inside the buffer (set index 4) to prevent hitting edges during momentum scroll
    grid.scrollLeft = singleSetWidth * 4;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let autoScrollTween;
    const speed = 40; // pixels per second
    let isUserScrolling = false;
    let resumeTimeout;
    
    const startAutoScroll = () => {
      if (prefersReducedMotion || isUserScrolling) return;
      if (autoScrollTween) autoScrollTween.kill();
      
      grid.style.scrollSnapType = 'none';

      const currentScroll = grid.scrollLeft;
      const targetScroll = currentScroll + singleSetWidth;
      const remainingDist = targetScroll - currentScroll;
      
      autoScrollTween = gsap.to(grid, {
        scrollLeft: targetScroll,
        duration: remainingDist / speed,
        ease: "none",
        onComplete: () => {
          grid.scrollLeft -= singleSetWidth;
          startAutoScroll();
        }
      });
    };

    startAutoScroll();

    const pauseAutoScroll = () => {
      if (autoScrollTween && autoScrollTween.isActive()) {
        autoScrollTween.pause();
      }
    };

    const scheduleResume = () => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isUserScrolling = false;
        startAutoScroll();
      }, 800); // Wait long enough for momentum scroll to finish
    };

    grid.addEventListener('pointerenter', pauseAutoScroll);
    grid.addEventListener('pointerleave', scheduleResume);
    
    const handleInteraction = () => {
      isUserScrolling = true;
      grid.style.scrollSnapType = 'x mandatory';
      pauseAutoScroll();
      scheduleResume();
    };

    grid.addEventListener('touchstart', handleInteraction, { passive: true });
    grid.addEventListener('wheel', handleInteraction, { passive: true });

    const updateFocus = () => {
      if (isUserScrolling) {
        scheduleResume(); // keep delaying resume as long as scroll events fire
      }
      const gridCenter = grid.getBoundingClientRect().left + grid.clientWidth / 2;
      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dist = Math.abs(gridCenter - cardCenter);
        
        if (dist < cardRect.width / 2) {
          card.style.transform = 'scale(1.05)';
          card.style.opacity = '1';
        } else {
          card.style.transform = 'scale(1)';
          card.style.opacity = '0.7';
        }
      });

      // Handle seamless looping for manual scroll (huge buffer to prevent hitting edges during swiping)
      if (grid.scrollLeft <= 0) {
        grid.scrollLeft = singleSetWidth * 4;
      } else if (grid.scrollLeft >= singleSetWidth * 8) {
        grid.scrollLeft = singleSetWidth * 4;
      }
    };

    grid.addEventListener('scroll', updateFocus, { passive: true });
    updateFocus(); 
    
  }, 100);
}
