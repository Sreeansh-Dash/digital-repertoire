import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initBindingLine() {
  const container = document.getElementById('spine-container');
  if (!container) return;

  // Clean up any existing SVG to avoid duplicates
  const existingSvg = container.querySelector('.spine-svg');
  if (existingSvg) {
    existingSvg.remove();
  }
  
  // Kill existing ScrollTriggers for the spine-line and nodes
  const oldTriggers = ScrollTrigger.getAll().filter(t => 
    t.vars && (t.vars.id === 'spine-line-trigger' || t.vars.id?.startsWith('spine-node-trigger-'))
  );
  oldTriggers.forEach(t => t.kill());

  // Return early on mobile AFTER cleanup so the desktop line is removed if resized to mobile
  if (window.innerWidth < 640) return;

  const sections = [
    { id: 'hero', side: 'left' },
    { id: 'about', side: 'right' },
    { id: 'projects', side: 'left' },
    { id: 'experience', side: 'right' },
    { id: 'contact', side: 'left' }
  ];

  // Calculate full document height
  const docHeight = Math.max(
    document.body.scrollHeight, 
    document.documentElement.scrollHeight
  );

  // Set the container height explicitly to docHeight to avoid layout height mismatches
  container.style.height = `${docHeight}px`;

  // We'll draw the SVG natively rather than using a viewBox so it matches 1:1 with pixels
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "spine-svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", `${docHeight}`);

  // Calculate container boundaries relative to the screen width
  const W = window.innerWidth;
  const containerStart = Math.max(20, (W - 1100) / 2);
  const containerEnd = W - containerStart;

  // Timeline boundaries (waving leftX to rightX)
  const leftX = containerStart + 40;
  const rightX = containerEnd - 40;

  // Find actual vertical positions of each section in the document
  const activeSections = [];
  sections.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      // Calculate absolute Y position relative to the document
      const targetY = rect.top + window.scrollY + 100;
      activeSections.push({
        id: sec.id,
        side: sec.side,
        y: targetY,
        el: el
      });
    }
  });

  // Sort them by their Y coordinate
  activeSections.sort((a, b) => a.y - b.y);

  // Build the list of key points for the serpentine path
  const points = [];
  
  // Start point (starts at the top left of the content boundary)
  points.push({ x: leftX, y: 0 });
  
  // Add section targets
  activeSections.forEach(sec => {
    const x = sec.side === 'left' ? leftX : rightX;
    points.push({ x: x, y: sec.y, id: sec.id, side: sec.side, el: sec.el });
  });
  
  // End point (ends at the bottom left of the content boundary)
  points.push({ x: leftX, y: docHeight });

  // Build the SVG path data using cubic Bezier curves
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    
    // Control points for a smooth serpentine curve
    const cy0 = p0.y + (p1.y - p0.y) / 3;
    const cy1 = p1.y - (p1.y - p0.y) / 3;
    const cx0 = p0.x;
    const cx1 = p1.x;
    
    d += `C ${cx0} ${cy0}, ${cx1} ${cy1}, ${p1.x} ${p1.y} `;
  }

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", d);
  path.setAttribute("class", "spine-path");
  svg.appendChild(path);

  // Add node dots and connection lines
  const nodes = [];
  const isMobile = window.innerWidth < 800;

  points.forEach(p => {
    // Only create nodes/connections for actual sections, not the start/end points
    if (p.id) {
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", p.x);
      circle.setAttribute("cy", p.y); 
      circle.setAttribute("r", "6");
      circle.setAttribute("class", "spine-node");
      circle.style.opacity = "0";
      circle.style.transform = "scale(0.5)";
      circle.style.transformOrigin = `${p.x}px ${p.y}px`;
      
      // Connection line target X
      // Left section -> content is to the right. Right section -> content is to the left.
      let lineToX = p.side === 'left' ? p.x + (isMobile ? 20 : 60) : p.x - (isMobile ? 20 : 60);
      let lineToY = p.y;
      
      let pathData = `M ${p.x} ${p.y} L ${lineToX} ${p.y}`;
      
      // Custom connection specifically for the Experience internal timeline
      let sparkle = null;
      if (p.id === 'experience') {
        const tc = p.el.querySelector('#timeline-container');
        if (tc) {
          const tcRect = tc.getBoundingClientRect();
          const localCenterX = isMobile ? 20 : 100;
          lineToX = tcRect.left + localCenterX;
          lineToY = tcRect.top + window.scrollY + 10;
          
          pathData = `M ${p.x} ${p.y} C ${lineToX} ${p.y}, ${p.x} ${lineToY}, ${lineToX} ${lineToY}`;
          
          // Create sparkle
          sparkle = document.createElementNS(svgNS, "path");
          sparkle.setAttribute("d", "M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z");
          sparkle.setAttribute("fill", "var(--ochre)");
          sparkle.setAttribute("class", "spine-sparkle");
          sparkle.style.transform = `translate(${lineToX}px, ${lineToY}px) scale(0)`;
          sparkle.style.transformOrigin = "center";
          svg.appendChild(sparkle);
        }
      }
      
      const connPath = document.createElementNS(svgNS, "path");
      connPath.setAttribute("d", pathData);
      connPath.setAttribute("stroke", "var(--ink-soft)");
      connPath.setAttribute("stroke-width", "2");
      connPath.setAttribute("stroke-dasharray", p.id === 'experience' ? "none" : "4 4");
      connPath.style.opacity = "0";
      
      svg.appendChild(connPath);
      svg.appendChild(circle);
      
      nodes.push({ 
        id: p.id,
        circle, 
        connPath, 
        sparkle,
        y: p.y,
        lineToX,
        lineToY
      });
    }
  });

  container.appendChild(svg);

  // Setup GSAP draw animation
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  const lead = 200; // Draw 200px ahead of the viewport bottom
  const startRatio = Math.min(1, (window.innerHeight + lead) / docHeight);
  const startDashoffset = pathLength * (1 - startRatio);
  const endDashoffset = 0;

  // Animate the line drawing down on scroll
  gsap.fromTo(path, 
    { strokeDashoffset: startDashoffset },
    {
      strokeDashoffset: endDashoffset,
      ease: 'none',
      scrollTrigger: {
        id: 'spine-line-trigger',
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      }
    }
  );

  // Node connection animation triggers
  nodes.forEach(node => {
    // Trigger the node connection when the drawing line reaches node.y
    const triggerStart = Math.max(0, node.y - window.innerHeight - lead);
    const connLength = node.connPath.getTotalLength();
    node.connPath.style.strokeDasharray = connLength;
    node.connPath.style.strokeDashoffset = connLength;
    
    ScrollTrigger.create({
      id: 'spine-node-trigger-' + node.id,
      trigger: document.body,
      start: `top+=${triggerStart} top`,
      onEnter: () => {
        // Pop node circle in
        gsap.to(node.circle, { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          ease: "back.out(2)" 
        });
        
        // Draw connection path
        gsap.to(node.connPath, { 
          opacity: 0.8,
          strokeDashoffset: 0, 
          duration: 0.6, 
          ease: "power2.out",
          onComplete: () => {
            if (node.sparkle) {
              gsap.fromTo(node.sparkle, 
                { transform: `translate(${node.lineToX}px, ${node.lineToY}px) scale(0) rotate(0deg)` },
                { 
                  transform: `translate(${node.lineToX}px, ${node.lineToY}px) scale(1.2) rotate(180deg)`, 
                  duration: 0.5, 
                  ease: "back.out(1.5)" 
                }
              );
            }
          }
        });
      },
      onLeaveBack: () => {
        // Pop node circle out
        gsap.to(node.circle, { 
          opacity: 0, 
          scale: 0.5, 
          duration: 0.3 
        });
        
        // Hide connection path
        gsap.to(node.connPath, { 
          opacity: 0,
          strokeDashoffset: connLength, 
          duration: 0.4, 
          ease: "power2.in" 
        });
        
        // Hide sparkle
        if (node.sparkle) {
          gsap.to(node.sparkle, {
            transform: `translate(${node.lineToX}px, ${node.lineToY}px) scale(0)`,
            duration: 0.3
          });
        }
      }
    });
  });
}
