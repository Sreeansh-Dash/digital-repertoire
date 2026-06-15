import { experience } from '../data/content.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initExperience() {
  const section = document.getElementById('experience');

  const milestonesHtml = experience.map((exp, index) => {
    const alignClass = exp.side === 'left' ? 'milestone-left' : 'milestone-right';
    // Just to ensure alternating on mobile somewhat, though css floats right anyway
    return `
      <div class="milestone ${alignClass}" data-side="${exp.side}">
        <div class="milestone-card">
          <div class="milestone-year">${exp.year}</div>
          <h3 class="milestone-title">${exp.title}</h3>
          <div class="milestone-sub">${exp.sub}</div>
          <div class="milestone-note">${exp.note}</div>
        </div>
      </div>
    `;
  }).join('');

  section.innerHTML = `
    <div class="content-right section-alt" style="position:relative;">
      <div style="position:relative; z-index:6;">
        <!-- Decorative dots SVG -->
        <svg class="decor decor-experience" style="position:absolute; left:-40px; top:0; width:30px; height:60px; opacity:0.8;" viewBox="0 0 30 60">
          <circle cx="10" cy="10" r="3" fill="var(--rust)"/>
          <circle cx="20" cy="30" r="3" fill="var(--rust)"/>
          <circle cx="10" cy="50" r="3" fill="var(--rust)"/>
        </svg>
        <div class="experience-header">
          <div class="label experience-label">// timeline</div>
          <h2>The Journey So Far</h2>
        </div>

        <div class="timeline-container" id="timeline-container">
          ${milestonesHtml}
          <div style="clear: both;"></div>
        </div>
      </div>
    </div>
  `;

  // Draw the SVG road after DOM update
  drawTimelineSvg();
  
  // Setup reveal animations
  const milestones = document.querySelectorAll('.milestone');
  milestones.forEach((m) => {
    const side = m.getAttribute('data-side');
    // On mobile we might not want the x-translation as it could cause weird overflow,
    // but the prompt asked for `x: side === 'left' ? -60 : 60`.
    // Let's check viewport width
    const isMobile = window.innerWidth < 640;
    const xOffset = isMobile ? 30 : (side === 'left' ? -60 : 60);
    const rotation = side === 'left' ? -3 : 3;

    gsap.from(m, {
      x: xOffset,
      opacity: 0,
      rotation: isMobile ? 1 : rotation,
      duration: 0.8,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: m,
        start: 'top 85%'
      }
    });
  });
}

function drawTimelineSvg() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  const height = container.offsetHeight;
  const svgNS = "http://www.w3.org/2000/svg";
  
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "timeline-road-svg");
  svg.setAttribute("viewBox", `0 0 200 ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMin slice");

  // Determine path based on mobile vs desktop
  const isMobile = window.innerWidth < 640;
  
  // Generate wobbly sinusoidal path
  // Desktop: centered at 100, wobbles between 50 and 150
  // Mobile: centered at 20, wobbles between 10 and 30
  const centerX = isMobile ? 20 : 100;
  const amplitude = isMobile ? 10 : 50;
  
  let d = `M ${centerX} 0 `;
  
  // Create path segments based on number of milestones
  const milestones = container.querySelectorAll('.milestone');
  const points = [];
  
  milestones.forEach((m, i) => {
    // Get Y offset relative to container
    const mTop = m.offsetTop;
    const yPos = mTop + 50; // Pin roughly at top of card
    
    // Determine X position for the curve to pass through
    const side = m.getAttribute('data-side');
    let targetX = centerX;
    
    if (!isMobile) {
      targetX = side === 'left' ? centerX - amplitude : centerX + amplitude;
    }
    
    points.push({ x: targetX, y: yPos });
  });

  // Build the curve
  let lastY = 0;
  let lastX = centerX;
  
  points.forEach(pt => {
    // control points for smooth curve
    d += `C ${lastX} ${lastY + (pt.y - lastY)/2}, ${pt.x} ${pt.y - (pt.y - lastY)/2}, ${pt.x} ${pt.y} `;
    lastX = pt.x;
    lastY = pt.y;
  });
  
  // Continue path to bottom
  d += `C ${lastX} ${lastY + 50}, ${centerX} ${height - 50}, ${centerX} ${height}`;

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", d);
  path.setAttribute("class", "timeline-path");
  svg.appendChild(path);

  // Add pins
  const pins = [];
  points.forEach(pt => {
    const pin = document.createElementNS(svgNS, "circle");
    pin.setAttribute("cx", pt.x);
    pin.setAttribute("cy", pt.y);
    pin.setAttribute("r", "5");
    pin.setAttribute("class", "timeline-pin");
    pin.style.opacity = "0";
    svg.appendChild(pin);
    pins.push({ el: pin, y: pt.y });
  });

  // Prepend so it's behind cards
  container.insertBefore(svg, container.firstChild);

  // Add a sparkle SVG at the beginning of the timeline
  const sparkle = document.createElementNS(svgNS, "path");
  sparkle.setAttribute("d", "M 0 -15 L 3 -3 L 15 0 L 3 3 L 0 15 L -3 3 L -15 0 L -3 -3 Z");
  sparkle.setAttribute("fill", "var(--ochre)");
  sparkle.setAttribute("transform", `translate(${centerX}, 0) scale(0)`);
  sparkle.setAttribute("class", "timeline-sparkle");
  svg.appendChild(sparkle);

  // Animate path drawing
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      end: "bottom 80%",
      scrub: 1
    }
  });

  // Animate pins popping in
  pins.forEach(pin => {
    gsap.to(pin.el, {
      opacity: 1,
      scale: 1.5, // Start large and shrink to normal, wait, standard scale is 1 in svg
      duration: 0.3,
      scrollTrigger: {
        trigger: container,
        start: () => `top ${-pin.y + window.innerHeight * 0.8}px`
      }
    });
  });

  // Animate sparkle popping in at the start of the line
  gsap.to(sparkle, {
    scale: 1,
    rotation: 180,
    duration: 0.6,
    ease: "back.out(2)",
    scrollTrigger: {
      trigger: container,
      start: "top 80%"
    }
  });
}
