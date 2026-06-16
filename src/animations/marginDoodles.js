import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initDoodleAnimations() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doodleContainers = document.querySelectorAll('.doodle-container');
  
  if (doodleContainers.length === 0) return;

  const idleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const container = entry.target;
      const tween = container._idleTween;
      if (!tween) return;
      
      if (entry.isIntersecting) {
        tween.play();
      } else {
        tween.pause();
      }
    });
  }, { threshold: 0.1 });

  doodleContainers.forEach((container) => {
    const type = container.dataset.type;
    const paths = container.querySelectorAll('.draw-doodle');
    const texts = container.querySelectorAll('.doodle-text');
    
    if (isReducedMotion) {
      paths.forEach(p => {
        p.style.strokeDasharray = 'none';
        p.style.strokeDashoffset = 'none';
      });
      texts.forEach(t => t.style.opacity = '1');
      return;
    }

    paths.forEach(p => {
      p.style.strokeDasharray = 1;
      p.style.strokeDashoffset = 1;
      p.setAttribute('pathLength', '1');
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        once: true
      },
      onComplete: () => {
        setupIdleAnimation(container, type);
      }
    });

    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power2.out'
    });

    if (texts.length > 0) {
      tl.to(texts, { opacity: 1, duration: 0.5 }, "-=0.5");
    }
  });

  function setupIdleAnimation(container, type) {
    let tween;
    if (type === 'washi-tape') {
      const svg = container.querySelector('svg');
      tween = gsap.to(svg, { rotation: "+=1.5", yoyo: true, repeat: -1, duration: 3, ease: 'sine.inOut', paused: true });
    } else if (type === 'compass-rose') {
      const needle = container.querySelector('.compass-needle');
      if (needle) {
        tween = gsap.to(needle, { rotation: 4, transformOrigin: '50px 50px', yoyo: true, repeat: -1, duration: 4, ease: 'sine.inOut', paused: true });
      }
    } else if (type === 'arrow-note') {
      const bob = container.querySelector('.arrow-bob');
      if (bob) {
        tween = gsap.to(bob, { y: 2.5, yoyo: true, repeat: -1, duration: 2.5, ease: 'sine.inOut', paused: true });
      }
    } else if (type === 'magnifying-glass') {
      const svg = container.querySelector('svg');
      tween = gsap.to(svg, { rotation: "+=5", yoyo: true, repeat: -1, duration: 3, ease: 'sine.inOut', paused: true });
    } else if (type === 'lightbulb') {
      const filament = container.querySelector('.lightbulb-filament');
      if (filament) {
        tween = gsap.to(filament, { opacity: 0.3, yoyo: true, repeat: -1, duration: 1.5, ease: 'power1.inOut', paused: true });
      }
    }
    
    if (tween) {
      container._idleTween = tween;
      idleObserver.observe(container);
      
      // If it's already in view right after setup, start playing
      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        tween.play();
      }
    }
  }
}
