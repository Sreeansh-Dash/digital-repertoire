export function initClickSpark() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let sparks = [];
  let animationId = null;

  const sparkColor = '#00ff41'; // Terminal green
  const sparkSize = 10;
  const sparkRadius = 15;
  const sparkCount = 8;
  const duration = 400;
  const easing = 'ease-out';
  const extraScale = 1.0;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const easeFunc = (t) => {
    switch (easing) {
      case 'linear': return t;
      case 'ease-in': return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t);
    }
  };

  const draw = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparks = sparks.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;

      const progress = elapsed / duration;
      const eased = easeFunc(progress);

      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      // Use the actual theme color if possible, fallback to green
      const color = getComputedStyle(document.documentElement).getPropertyValue('--green').trim() || sparkColor;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true;
    });

    if (sparks.length > 0) {
      animationId = requestAnimationFrame(draw);
    } else {
      animationId = null;
    }
  };

  document.addEventListener('click', (e) => {
    // Only fire if terminal mode is active
    if (document.documentElement.getAttribute('data-theme') !== 'terminal') return;

    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();

    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      });
    }

    if (!animationId) {
      animationId = requestAnimationFrame(draw);
    }
  });
}
