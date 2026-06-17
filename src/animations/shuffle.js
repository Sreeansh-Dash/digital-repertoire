import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class Shuffle {
  constructor(element, props = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.el) return;

    this.text = props.text || this.el.textContent || "";
    this.shuffleDirection = props.shuffleDirection || 'right';
    this.duration = props.duration !== undefined ? props.duration : 0.35;
    this.maxDelay = props.maxDelay !== undefined ? props.maxDelay : 0;
    this.ease = props.ease || 'power3.out';
    this.threshold = props.threshold !== undefined ? props.threshold : 0.1;
    this.rootMargin = props.rootMargin || '-100px';
    this.textAlign = props.textAlign || 'left';
    this.shuffleTimes = props.shuffleTimes !== undefined ? props.shuffleTimes : 1;
    this.animationMode = props.animationMode || 'evenodd';
    this.loop = props.loop !== undefined ? props.loop : false;
    this.loopDelay = props.loopDelay !== undefined ? props.loopDelay : 0;
    this.stagger = props.stagger !== undefined ? props.stagger : 0.03;
    this.scrambleCharset = props.scrambleCharset || '';
    this.colorFrom = props.colorFrom;
    this.colorTo = props.colorTo;
    this.triggerOnce = props.triggerOnce !== undefined ? props.triggerOnce : true;
    this.respectReducedMotion = props.respectReducedMotion !== undefined ? props.respectReducedMotion : true;
    this.triggerOnHover = props.triggerOnHover !== undefined ? props.triggerOnHover : true;
    this.onShuffleComplete = props.onShuffleComplete;

    this.wrappers = [];
    this.tl = null;
    this.playing = false;
    this.fontsLoaded = false;
    this.ready = false;
    this.hoverHandler = null;
    this.scrollTrigger = null;

    this.init();
  }

  init() {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') {
        this.fontsLoaded = true;
        this.setupScrollTrigger();
      } else {
        document.fonts.ready.then(() => {
          this.fontsLoaded = true;
          this.setupScrollTrigger();
        });
      }
    } else {
      this.fontsLoaded = true;
      this.setupScrollTrigger();
    }
  }

  get scrollTriggerStart() {
    const startPct = (1 - this.threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(this.rootMargin || '');
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || 'px' : 'px';
    const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }

  teardown() {
    if (this.tl) {
      this.tl.kill();
      this.tl = null;
    }
    if (this.wrappers.length) {
      this.wrappers.forEach(wrap => {
        const inner = wrap.firstElementChild;
        const orig = inner ? inner.querySelector('[data-orig="1"]') : null;
        if (orig && wrap.parentNode) {
          wrap.parentNode.replaceChild(orig, wrap);
        }
      });
      this.wrappers = [];
    }
    this.playing = false;
  }

  build() {
    this.teardown();

    // Set text content to original so we can split it
    this.el.textContent = this.text;

    const computedFont = getComputedStyle(this.el).fontFamily;
    const textStr = this.text;
    this.el.innerHTML = '';

    const chars = [];

    for (let i = 0; i < textStr.length; i++) {
      const char = textStr.charAt(i);
      const span = document.createElement('span');
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      span.className = 'shuffle-char inline-block';
      this.el.appendChild(span);
      chars.push(span);
    }

    this.wrappers = [];
    const rolls = Math.max(1, Math.floor(this.shuffleTimes));
    const rand = (set) => set.charAt(Math.floor(Math.random() * set.length)) || '';

    chars.forEach(ch => {
      const parent = ch.parentElement;
      if (!parent) return;

      const w = ch.getBoundingClientRect().width;
      const h = ch.getBoundingClientRect().height;
      if (!w) return;

      const wrap = document.createElement('span');
      wrap.className = 'shuffle-wrap';
      Object.assign(wrap.style, {
        display: 'inline-block',
        overflow: 'hidden',
        textAlign: 'left',
        width: w + 'px',
        height: this.shuffleDirection === 'up' || this.shuffleDirection === 'down' ? h + 'px' : 'auto',
        verticalAlign: 'bottom'
      });

      const inner = document.createElement('span');
      inner.className = 'shuffle-inner';
      Object.assign(inner.style, {
        display: 'inline-block',
        willChange: 'transform',
        transformOrigin: 'left',
        verticalAlign: 'bottom',
        whiteSpace: 'nowrap'
      });

      parent.insertBefore(wrap, ch);
      wrap.appendChild(inner);

      const firstOrig = ch.cloneNode(true);
      Object.assign(firstOrig.style, {
        display: this.shuffleDirection === 'up' || this.shuffleDirection === 'down' ? 'block' : 'inline-block',
        width: w + 'px',
        fontFamily: computedFont
      });

      ch.setAttribute('data-orig', '1');
      Object.assign(ch.style, {
        display: this.shuffleDirection === 'up' || this.shuffleDirection === 'down' ? 'block' : 'inline-block',
        width: w + 'px',
        fontFamily: computedFont
      });

      inner.appendChild(firstOrig);
      for (let k = 0; k < rolls; k++) {
        const c = ch.cloneNode(true);
        if (this.scrambleCharset) c.textContent = rand(this.scrambleCharset);
        Object.assign(c.style, {
          display: this.shuffleDirection === 'up' || this.shuffleDirection === 'down' ? 'block' : 'inline-block',
          width: w + 'px',
          fontFamily: computedFont
        });
        inner.appendChild(c);
      }
      inner.appendChild(ch);

      const steps = rolls + 1;

      let startX = 0, finalX = 0, startY = 0, finalY = 0;

      if (this.shuffleDirection === 'right' || this.shuffleDirection === 'down') {
        const firstCopy = inner.firstElementChild;
        const real = inner.lastElementChild;
        if (real) inner.insertBefore(real, inner.firstChild);
        if (firstCopy) inner.appendChild(firstCopy);
      }

      if (this.shuffleDirection === 'right') {
        startX = -steps * w;
        finalX = 0;
      } else if (this.shuffleDirection === 'left') {
        startX = 0;
        finalX = -steps * w;
      } else if (this.shuffleDirection === 'down') {
        startY = -steps * h;
        finalY = 0;
      } else if (this.shuffleDirection === 'up') {
        startY = 0;
        finalY = -steps * h;
      }

      if (this.shuffleDirection === 'left' || this.shuffleDirection === 'right') {
        gsap.set(inner, { x: startX, y: 0, force3D: true });
        inner.setAttribute('data-start-x', String(startX));
        inner.setAttribute('data-final-x', String(finalX));
      } else {
        gsap.set(inner, { x: 0, y: startY, force3D: true });
        inner.setAttribute('data-start-y', String(startY));
        inner.setAttribute('data-final-y', String(finalY));
      }

      if (this.colorFrom) inner.style.color = this.colorFrom;
      this.wrappers.push(wrap);
    });
  }

  randomizeScrambles() {
    if (!this.scrambleCharset) return;
    this.wrappers.forEach(w => {
      const strip = w.firstElementChild;
      if (!strip) return;
      const kids = Array.from(strip.children);
      for (let i = 1; i < kids.length - 1; i++) {
        kids[i].textContent = this.scrambleCharset.charAt(Math.floor(Math.random() * this.scrambleCharset.length));
      }
    });
  }

  cleanupToStill() {
    this.wrappers.forEach(w => {
      const strip = w.firstElementChild;
      if (!strip) return;
      const real = strip.querySelector('[data-orig="1"]');
      if (!real) return;
      strip.replaceChildren(real);
      strip.style.transform = 'none';
      strip.style.willChange = 'auto';
    });
  }

  play() {
    const strips = this.wrappers.map(w => w.firstElementChild);
    if (!strips.length) return;

    this.playing = true;
    const isVertical = this.shuffleDirection === 'up' || this.shuffleDirection === 'down';

    const tl = gsap.timeline({
      smoothChildTiming: true,
      repeat: this.loop ? -1 : 0,
      repeatDelay: this.loop ? this.loopDelay : 0,
      onRepeat: () => {
        if (this.scrambleCharset) this.randomizeScrambles();
        if (isVertical) {
          gsap.set(strips, { y: (i, t) => parseFloat(t.getAttribute('data-start-y') || '0') });
        } else {
          gsap.set(strips, { x: (i, t) => parseFloat(t.getAttribute('data-start-x') || '0') });
        }
        if (this.onShuffleComplete) this.onShuffleComplete();
      },
      onComplete: () => {
        this.playing = false;
        if (!this.loop) {
          this.cleanupToStill();
          if (this.colorTo) gsap.set(strips, { color: this.colorTo });
          if (this.onShuffleComplete) this.onShuffleComplete();
          this.armHover();
        }
      }
    });

    const addTween = (targets, at) => {
      const vars = {
        duration: this.duration,
        ease: this.ease,
        force3D: true,
        stagger: this.animationMode === 'evenodd' ? this.stagger : 0
      };
      if (isVertical) {
        vars.y = (i, t) => parseFloat(t.getAttribute('data-final-y') || '0');
      } else {
        vars.x = (i, t) => parseFloat(t.getAttribute('data-final-x') || '0');
      }

      tl.to(targets, vars, at);

      if (this.colorFrom && this.colorTo) {
        tl.to(targets, { color: this.colorTo, duration: this.duration, ease: this.ease }, at);
      }
    };

    if (this.animationMode === 'evenodd') {
      const odd = strips.filter((_, i) => i % 2 === 1);
      const even = strips.filter((_, i) => i % 2 === 0);
      const oddTotal = this.duration + Math.max(0, odd.length - 1) * this.stagger;
      const evenStart = odd.length ? oddTotal * 0.7 : 0;
      if (odd.length) addTween(odd, 0);
      if (even.length) addTween(even, evenStart);
    } else {
      strips.forEach(strip => {
        const d = Math.random() * this.maxDelay;
        const vars = {
          duration: this.duration,
          ease: this.ease,
          force3D: true
        };
        if (isVertical) {
          vars.y = parseFloat(strip.getAttribute('data-final-y') || '0');
        } else {
          vars.x = parseFloat(strip.getAttribute('data-final-x') || '0');
        }
        tl.to(strip, vars, d);
        if (this.colorFrom && this.colorTo) {
          tl.fromTo(strip, { color: this.colorFrom }, { color: this.colorTo, duration: this.duration, ease: this.ease }, d);
        }
      });
    }

    this.tl = tl;
  }

  armHover() {
    if (!this.triggerOnHover) return;
    this.removeHover();
    this.hoverHandler = () => {
      if (this.playing) return;
      this.build();
      if (this.scrambleCharset) this.randomizeScrambles();
      this.play();
    };
    this.el.addEventListener('mouseenter', this.hoverHandler);
  }

  removeHover() {
    if (this.hoverHandler) {
      this.el.removeEventListener('mouseenter', this.hoverHandler);
      this.hoverHandler = null;
    }
  }

  setupScrollTrigger() {
    if (this.respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (this.onShuffleComplete) this.onShuffleComplete();
      return;
    }

    const createAnimation = () => {
      this.build();
      if (this.scrambleCharset) this.randomizeScrambles();
      this.play();
      this.armHover();
      this.ready = true;
      this.el.style.visibility = 'visible';
    };

    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.el,
      start: this.scrollTriggerStart,
      once: this.triggerOnce,
      onEnter: createAnimation,
      onEnterBack: () => {
        if (!this.triggerOnce) {
          createAnimation();
        }
      }
    });
  }

  destroy() {
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
    this.removeHover();
    this.teardown();
  }
}
