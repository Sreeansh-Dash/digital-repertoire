# Digital Repertoire - The Field Notebook Portfolio

A modern, highly interactive personal portfolio designed around a physical "field notebook" aesthetic. Built with Vite, Vanilla CSS, and GSAP (ScrollTrigger), this site features a scroll-bound serpentine binding line that connects content cards dynamically as you scroll.

## 📖 Design Concept & Theme

The portfolio is styled as a **field notebook**:
- **Kraft Paper Texture**: Warm, natural background (`#EAE3D2`) overlaid with a subtle coordinate grid pattern.
- **Hand-Drawn SVG Accents**: Scattered custom SVG icons, including a typewriter/desktop scene, typewriter steam, terminal windows, coffee mugs, and hand-drawn stars.
- **Alternating Layout**: Asymmetric content cards that float left and right down the page.
- **Spine Line**: A custom-generated timeline that mimics a notebook spiral binding thread, dynamically drawing itself and connecting to sections as they enter the viewport.

---

## ✨ Features & Micro-Animations

- **Scroll-Synchronized Serpentine Spine**: A custom SVG Bezier curve path that stretches the full height of the document and draws itself to match the viewport's bottom edge.
- **Pop-in Connection Nodes**: Spine nodes (dots) bounce into view using GSAP's `back` ease exactly when the timeline reaches them, drawing dashed connection paths to the section cards.
- **Journey Timeline Connection & Sparkle**: The timeline curves swoopingly to connect directly with the Experience section's internal timeline, capped with a rotating sparkle animation.
- **Auto-Fading Carousel**: A Vanilla JS driven carousel smoothly transitions between certificates, utilizing custom fading animations.
- **Interactive Envelope Form**: The contact section features a CSS/GSAP interactive envelope that opens on click, revealing a form that dynamically pre-fills system email clients.
- **Hover & Tilt Interactions**: Interactive elements tilt, wiggle, or rotate slightly on scroll and hover to give the notebook a tactile, responsive feel.
- **Responsive Layout**: Designed to collapse into a clean, legible mobile column, with the heavy timeline spine automatically hidden on small screens for optimal performance.

---

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla JavaScript
- **Bundler & Dev Server**: Vite (with TypeScript support)
- **Animations**: GSAP (GreenSock Animation Platform) & ScrollTrigger
- **Styling**: Vanilla CSS (Harmonious curated palettes, warm kraft and ink colors)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your computer.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sreeansh-Dash/digital-repertoire.git
   cd digital-repertoire
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

### Production Build

To compile the TypeScript code and bundle the project assets into a production-ready `dist` folder:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
sree-portfolio/
├── public/                 # Static assets (images, profile pictures)
├── src/
│   ├── animations/         # GSAP ScrollTrigger timeline & reveal setups
│   │   ├── bindingLine.js  # Main scroll-bound serpentine path drawing
│   │   └── scrollReveal.js # Generic scroll-reveal tilt animations
│   ├── data/
│   │   └── content.js      # Centralized copy, links, work experience details
│   ├── sections/           # Modular HTML generation for sections
│   │   ├── hero.js
│   │   ├── about.js
│   │   ├── projects.js
│   │   └── experience.js
│   ├── styles/             # Dedicated CSS stylesheets per section
│   │   ├── base.css        # Base theme variables and grid
│   │   └── timeline.css    # Layout constraints for the spine timeline
│   └── main.js             # Main entry point (init section render & animations)
├── index.html              # Core skeleton markup
├── package.json
└── tsconfig.json
```

---

## 📬 Contact

**Sreeansh Dash**
- Email: [sreeansh786@gmail.com](mailto:sreeansh786@gmail.com)
- GitHub: [Sreeansh-Dash](https://github.com/Sreeansh-Dash)
- LinkedIn: [sreeansh-dash](https://linkedin.com/in/sreeansh-dash)
