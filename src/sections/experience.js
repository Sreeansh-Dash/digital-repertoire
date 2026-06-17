import { experience, meta } from '../data/content.js';
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

  const certificates = [
    "/certificates/Screenshot 2026-06-17 161509.png",
    "/certificates/Screenshot 2026-06-17 161519.png",
    "/certificates/Screenshot 2026-06-17 161530.png",
    "/certificates/Screenshot 2026-06-17 161544.png",
    "/certificates/Screenshot 2026-06-17 161617.png"
  ];

  section.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; width: 100%;">
      <div class="content-left">
        <div class="experience-header" style="margin-bottom: 20px;">
          <div class="label experience-label">// credentials</div>
          <h2>Certificates</h2>
        </div>
        <div style="position:relative; width: 100%; max-width: 450px; aspect-ratio: 4/3; overflow: hidden; border-radius: 8px; border: 2px solid var(--ink); box-shadow: 4px 4px 0 rgba(0,0,0,0.05); background: var(--paper-alt);">
          ${certificates.map((c, i) => `<img src="${c}" class="cert-slide" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; opacity:${i===0?1:0}; transition: opacity 0.5s ease; background: var(--ink);" />`).join('')}
        </div>
        
        <!-- Contact Section merged here -->
        <div style="margin-top: 60px; position:relative;" id="contact-inner">
          <div class="label contact-label" style="color: var(--green); margin-bottom: 0.5rem;">// say hi</div>
          <h2 style="margin-bottom: 2rem;">Open to remote work</h2>

          <div class="envelope-wrapper" id="contact-envelope" style="margin-bottom: 2rem; cursor: pointer; perspective: 800px; display: inline-block;">
            <div class="envelope" style="position: relative; width: 150px; height: 110px; transform-style: preserve-3d;">
              <div class="env-back" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: var(--paper-alt); border: 2px solid var(--ink); z-index: 1;"></div>
              <div class="env-paper" style="position: absolute; top: 10px; left: 10px; width: 130px; height: 90px; background-color: var(--paper); border: 1px dashed var(--ink-soft); z-index: 2; display: flex; align-items: flex-start; justify-content: center; padding-top: 10px; transition: transform 0.4s ease;">
                <span class="hand" style="font-size: 0.9rem; color: var(--ink);">let's build something</span>
              </div>
              <svg class="env-front" viewBox="0 0 150 110" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 4; fill: var(--paper-alt); stroke: var(--ink); stroke-width: 2px; pointer-events: none;">
                <path d="M0 110 L0 0 L75 55 L150 0 L150 110 Z" />
              </svg>
              <svg class="env-flap" viewBox="0 0 150 60" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0; width: 100%; height: 60px; z-index: 5; transform-origin: top; transition: transform 0.4s ease; fill: var(--paper-alt); stroke: var(--ink); stroke-width: 2px;">
                <path d="M0 0 L75 55 L150 0 Z" />
              </svg>
            </div>
            
            <!-- Hidden Questionnaire Form -->
            <form id="contact-form" style="display: none; flex-direction: column; gap: 10px; margin-top: 20px; background: var(--paper-alt); padding: 15px; border: 2px solid var(--ink); border-radius: 8px; width: 100%; min-width: 280px; text-align: left; box-shadow: 4px 4px 0 rgba(0,0,0,0.05);">
              <label style="font-size: 0.9rem; font-family: 'Space Mono', monospace;">Name</label>
              <input type="text" id="cf-name" required style="padding: 8px; border: 1px solid var(--ink); background: var(--paper); color: var(--ink); font-family: inherit;" />
              
              <label style="font-size: 0.9rem; font-family: 'Space Mono', monospace;">Contact / Email</label>
              <input type="text" id="cf-contact" required style="padding: 8px; border: 1px solid var(--ink); background: var(--paper); color: var(--ink); font-family: inherit;" />
              
              <label style="font-size: 0.9rem; font-family: 'Space Mono', monospace;">Message</label>
              <textarea id="cf-message" required rows="3" style="padding: 8px; border: 1px solid var(--ink); background: var(--paper); color: var(--ink); font-family: inherit; resize: vertical;"></textarea>
              
              <button type="submit" class="hand" style="margin-top: 10px; padding: 10px; background: var(--ink); color: var(--paper); border: none; cursor: pointer; font-size: 1.1rem;">Send Mail</button>
            </form>
          </div>

          <div style="margin-bottom: 3rem;">
            <a href="mailto:${meta.email}" class="hand contact-email" style="font-size: 1.5rem; color: var(--ink); text-decoration: underline; text-decoration-style: wavy; text-decoration-color: var(--green); text-underline-offset: 4px; display: inline-block;">${meta.email}</a>
          </div>

          <div class="stamp-links" style="display: flex; gap: 1.5rem; justify-content: flex-start;">
            <a href="${meta.github}" target="_blank" class="stamp-link" aria-label="GitHub" style="display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--ink); background-color: var(--paper); color: var(--ink); font-family: 'Space Mono', monospace; font-weight: 700; font-size: 1.1rem; transition: transform 0.2s ease, background-color 0.2s ease;">GH</a>
            <a href="${meta.linkedin}" target="_blank" class="stamp-link" aria-label="LinkedIn" style="display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--ink); background-color: var(--paper); color: var(--ink); font-family: 'Space Mono', monospace; font-weight: 700; font-size: 1.1rem; transition: transform 0.2s ease, background-color 0.2s ease;">LI</a>
            <a href="${meta.cv}" target="_blank" class="stamp-link" aria-label="Resume" style="display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--ink); background-color: var(--paper); color: var(--ink); font-family: 'Space Mono', monospace; font-weight: 700; font-size: 1.1rem; transition: transform 0.2s ease, background-color 0.2s ease;">CV</a>
          </div>
        </div>
      </div>

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
    </div>
  `;

  // Draw the SVG road after DOM update
  drawTimelineSvg();

  // Carousel logic
  const certSlides = document.querySelectorAll('.cert-slide');
  let currentSlide = 0;
  if (certSlides.length > 0) {
    setInterval(() => {
      certSlides[currentSlide].style.opacity = '0';
      currentSlide = (currentSlide + 1) % certSlides.length;
      certSlides[currentSlide].style.opacity = '1';
    }, 3500);
  }

  // Envelope logic
  const envelope = document.getElementById('contact-envelope');
  const form = document.getElementById('contact-form');
  const envFlap = envelope?.querySelector('.env-flap');
  const envPaper = envelope?.querySelector('.env-paper');
  
  if (envelope && form) {
    envelope.addEventListener('click', (e) => {
      // Ignore clicks if they originated from the form itself
      if (form.contains(e.target)) return;

      // Toggle open state
      const isOpen = envelope.classList.toggle('open');
      if (isOpen) {
        if(envFlap) envFlap.style.transform = 'rotateX(170deg)';
        if(envFlap) envFlap.style.zIndex = '3';
        if(envPaper) envPaper.style.transform = 'translateY(-30px)';
        
        form.style.display = 'flex';
        gsap.fromTo(form, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      } else {
        if(envFlap) envFlap.style.transform = '';
        setTimeout(() => { if(envFlap && !envelope.classList.contains('open')) envFlap.style.zIndex = '5'; }, 400);
        if(envPaper) envPaper.style.transform = '';
        
        gsap.to(form, { opacity: 0, y: -20, duration: 0.3, onComplete: () => { form.style.display = 'none'; }});
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value;
      const contact = document.getElementById('cf-contact').value;
      const message = document.getElementById('cf-message').value;
      
      const subject = encodeURIComponent(`New message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nContact: ${contact}\n\nMessage:\n${message}`);
      
      window.location.href = `mailto:${meta.email}?subject=${subject}&body=${body}`;
      
      // Reset after send
      form.reset();
      envelope.click(); // close it
    });
  }
  
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
