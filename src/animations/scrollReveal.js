import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal an element on scroll.
 * @param {Element|string} el
 * @param {object} fromVars — GSAP fromVars
 */
export function revealOnScroll(el, fromVars = {}) {
  const defaults = { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out' };
  
  const target = typeof el === 'string' ? document.querySelectorAll(el) : el;

  if (target instanceof NodeList || Array.isArray(target)) {
    target.forEach(node => {
      gsap.from(node, {
        ...defaults,
        ...fromVars,
        scrollTrigger: { trigger: node, start: 'top 82%' }
      });
    });
  } else if (target) {
    gsap.from(target, {
      ...defaults,
      ...fromVars,
      scrollTrigger: { trigger: target, start: 'top 82%' }
    });
  }
}
