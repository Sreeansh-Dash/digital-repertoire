import './styles/base.css';
import './styles/timeline.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/projects.css';
import './styles/experience.css';
import './styles/contact.css';

import { initBindingLine } from './animations/bindingLine.js';
import { initHero } from './sections/hero.js';
import { initAbout } from './sections/about.js';
import { initProjects } from './sections/projects.js';
import { initExperience } from './sections/experience.js';
import { initContact } from './sections/contact.js';
import { initDoodlePlacement } from './animations/doodlePlacement.js';
import { initDoodleAnimations } from './animations/marginDoodles.js';

const DOODLES_ENABLED = true;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize sections first so they inject content and lay out
  initHero();
  initAbout();
  initProjects();
  initExperience();
  initContact();

  // Initialize spine once the DOM elements are created
  initBindingLine();
});

// Re-initialize spine when all assets (including images) are fully loaded and layout is stable
window.addEventListener('load', () => {
  initBindingLine();
  if (DOODLES_ENABLED) {
    initDoodlePlacement(DOODLES_ENABLED).then(() => {
      initDoodleAnimations();
    });
  }
});

// Debounced resize handler to recalculate curve points when screen dimensions change
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initBindingLine();
    if (DOODLES_ENABLED) {
      initDoodlePlacement(DOODLES_ENABLED).then(() => {
        initDoodleAnimations();
      });
    }
  }, 250);
});
