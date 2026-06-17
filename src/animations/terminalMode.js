import gsap from 'gsap';

const SECRET_CODE = "sudo";
let keyBuffer = "";
let isTerminalActive = false;
let isTransitioning = false;

export function activateTerminalMode() {
  if (isTerminalActive || isTransitioning) return;
  isTransitioning = true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.documentElement.dataset.theme = 'terminal';
    isTerminalActive = true;
    isTransitioning = false;
    return;
  }

  // 1. Create and append a full-screen canvas
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '9999';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01';
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array.from({ length: columns }).fill(1);

  let animationFrameId;

  const drawRain = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#39FF74';
    ctx.font = `${fontSize}px 'Space Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    animationFrameId = requestAnimationFrame(drawRain);
  };

  drawRain();

  // Run rain for 3000ms
  setTimeout(() => {
    cancelAnimationFrame(animationFrameId);

    // Swap theme under the cover
    document.documentElement.dataset.theme = 'terminal';
    isTerminalActive = true;

    // Create CRT screen overlay
    const crtScreen = document.createElement('div');
    crtScreen.style.position = 'fixed';
    crtScreen.style.top = '0';
    crtScreen.style.left = '0';
    crtScreen.style.width = '100vw';
    crtScreen.style.height = '100vh';
    crtScreen.style.backgroundColor = '#050505';
    crtScreen.style.boxShadow = 'inset 0 0 100px rgba(57, 255, 116, 0.1)';
    crtScreen.style.zIndex = '10000';
    crtScreen.style.transform = 'translateY(-100%)';
    document.body.appendChild(crtScreen);

    // Create scanline sweep
    const scanline = document.createElement('div');
    scanline.style.position = 'absolute';
    scanline.style.top = '0';
    scanline.style.left = '0';
    scanline.style.width = '100%';
    scanline.style.height = '4px';
    scanline.style.backgroundColor = '#fff';
    scanline.style.boxShadow = '0 0 20px #39FF74';
    scanline.style.opacity = '0';
    crtScreen.appendChild(scanline);

    // CRT Drop animation
    gsap.to(crtScreen, {
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        // Pause briefly, then sweep
        setTimeout(() => {
          gsap.to(scanline, {
            opacity: 1,
            duration: 0.05,
            onComplete: () => {
              gsap.to(scanline, {
                y: window.innerHeight,
                duration: 0.15,
                ease: 'none',
                onComplete: () => {
                  gsap.to(scanline, { opacity: 0, duration: 0.05 });
                  // Animate CRT off
                  gsap.to(crtScreen, {
                    y: -window.innerHeight,
                    duration: 0.4,
                    ease: 'power2.in',
                    onComplete: () => {
                      canvas.remove();
                      crtScreen.remove();
                      isTransitioning = false;
                    }
                  });
                }
              });
            }
          });
        }, 200);
      }
    });
  }, 3000);
}

export function toggleTerminalMode(active) {
  if (isTransitioning) return;
  if (!active && isTerminalActive) {
    isTransitioning = true;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.removeAttribute('data-theme');
      isTerminalActive = false;
      isTransitioning = false;
      window.scrollTo(0, 0);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = Array.from({ length: columns }).fill(canvas.height / fontSize);

    let animationFrameId;

    const drawReverseRain = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#39FF74';
      ctx.font = `${fontSize}px 'Space Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize < 0 && Math.random() > 0.975) {
          drops[i] = canvas.height / fontSize;
        }
        drops[i]--;
      }

      animationFrameId = requestAnimationFrame(drawReverseRain);
    };

    drawReverseRain();

    // Run reverse rain for 2500ms
    setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      document.documentElement.removeAttribute('data-theme');
      isTerminalActive = false;
      window.scrollTo(0, 0);
      
      gsap.to(canvas, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          canvas.remove();
          isTransitioning = false;
        }
      });
    }, 2500);
  }
}

export function initTerminalMode() {
  // Global keydown listener for secret code
  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
      return;
    }

    // Accumulate chars
    if (e.key.length === 1) {
      keyBuffer += e.key;
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }

      if (keyBuffer.includes(SECRET_CODE)) {
        activateTerminalMode();
        keyBuffer = ""; // Reset buffer
      }
    }

    if (e.key === 'Escape' && isTerminalActive) {
      toggleTerminalMode(false);
    }
  });

  // Inject ESC button
  const escBtn = document.createElement('button');
  escBtn.id = 'esc-terminal';
  escBtn.innerText = '[ESC] warm mode';
  escBtn.addEventListener('click', () => toggleTerminalMode(false));
  document.body.appendChild(escBtn);
}
