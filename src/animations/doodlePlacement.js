import { doodles } from '../svgs/margin-doodles/doodles.js';

// Seeded PRNG to keep placements consistent
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export function initDoodlePlacement(enabled) {
  if (!enabled) return Promise.resolve();

  // Wait a tick to ensure layout is somewhat settled
  return new Promise(resolve => {
    setTimeout(() => {
      placeDoodles();
      resolve();
    }, 100);
  });
}

function placeDoodles() {
  // Mobile check
  if (window.innerWidth < 768) return;

  // Clear existing doodles if re-initialized
  document.querySelectorAll('.doodle-container').forEach(el => el.remove());

  const scrollHeight = document.body.scrollHeight;
  const viewportHeight = window.innerHeight;
  
  // Max 1 doodle per 250px of scroll, capped at 30
  const maxAllowed = Math.min(30, Math.floor(scrollHeight / 250));
  if (maxAllowed <= 0) return;

  // Use a fixed seed for consistency
  const random = mulberry32(8888);

  const center = window.innerWidth / 2;
  const contentWidth = 880; 
  const safePadding = 20;
  
  const leftMarginEnd = center - (contentWidth / 2) - safePadding;
  const rightMarginStart = center + (contentWidth / 2) + safePadding;

  // We want them somewhat distributed from top to bottom
  // Skip the very top (hero) and very bottom (footer)
  const minY = viewportHeight * 0.4;
  const maxY = scrollHeight - viewportHeight * 0.5;
  const usableHeight = maxY - minY;
  
  if (usableHeight < 0) return;

  const chunkHeight = usableHeight / maxAllowed;

  // Shuffle available doodles (repeat 3 times to allow up to 36 items, accommodating the 30 limit)
  let available = [...doodles, ...doodles, ...doodles];
  for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
  }

  const placed = available.slice(0, maxAllowed);

  placed.forEach((doodle, i) => {
    // Generate Y within this chunk
    const yMin = minY + (i * chunkHeight);
    const yMax = Math.min(maxY, yMin + chunkHeight - 100);
    const y = yMin + (random() * Math.max(0, yMax - yMin));

    // Choose left or right side
    let side = random() > 0.5 ? 'left' : 'right';

    // Verify side has space for this doodle
    if (side === 'left' && leftMarginEnd < doodle.defaultWidth + 10) side = 'right';
    if (side === 'right' && (window.innerWidth - rightMarginStart) < doodle.defaultWidth + 10) side = 'left';

    // If both sides too tight, skip this doodle
    if (side === 'left' && leftMarginEnd < doodle.defaultWidth + 10) return;
    if (side === 'right' && (window.innerWidth - rightMarginStart) < doodle.defaultWidth + 10) return;

    let x;
    if (side === 'left') {
      const maxX = leftMarginEnd - doodle.defaultWidth;
      const minX = 10;
      x = minX + (random() * Math.max(0, maxX - minX));
    } else {
      const minX = rightMarginStart;
      const maxX = window.innerWidth - doodle.defaultWidth - 10;
      x = minX + (random() * Math.max(0, maxX - minX));
    }

    const container = document.createElement('div');
    container.className = 'doodle-container';
    container.dataset.type = doodle.type;
    container.style.position = 'absolute';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    container.style.zIndex = '1';
    container.style.pointerEvents = 'none'; // click-through
    container.innerHTML = doodle.svgString;

    document.body.appendChild(container);
  });
}
