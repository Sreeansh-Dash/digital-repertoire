import gsap from 'gsap';

/**
 * Animate an SVG path's stroke from invisible to fully drawn.
 * @param {SVGPathElement|string} el — the path element or CSS selector
 * @param {object} opts — { duration, delay, ease }
 */
export function drawPath(el, opts = {}) {
  const { duration = 1.2, delay = 0, ease = 'power2.out' } = opts;
  const target = typeof el === 'string' ? document.querySelector(el) : el;
  
  if (!target) return;

  target.style.strokeDasharray = 1;
  target.style.strokeDashoffset = 1;
  target.setAttribute('pathLength', '1');
  
  gsap.to(target, { strokeDashoffset: 0, duration, delay, ease });
}
