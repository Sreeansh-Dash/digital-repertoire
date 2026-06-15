export const meta = {
  name: "Sreeansh Dash",
  role: "CS Student · AI/ML · VIT Chennai",
  tagline: "sketching side projects & chasing a remote internship",
  email: "sreeansh786@gmail.com",
  github: "https://github.com/Sreeansh-Dash",
  linkedin: "https://www.linkedin.com/in/sreeansh-dash/",
  cv: "/Sreeansh_dash_resume_visual.pdf"
};

export const about = {
  bio: [
    "I build small, working things. Most recently I shipped PromptWars Challenge 3 using Gemini Pro/Flash — a prompts-only workflow with zero hand-written boilerplate.",
    "Also working on a patent application for a mobility assistance system with embedded ML, and keeping a decent CGPA while doing all of it."
  ],
  aside: "I like projects small enough to finish and weird enough to talk about.",
  skills: [
    { label: "code",     icon: "code"     },
    { label: "ML/AI",    icon: "brain"    },
    { label: "terminal", icon: "terminal" },
    { label: "systems",  icon: "gear"     },
    { label: "models",   icon: "model"    },
    { label: "data",     icon: "data"     }
  ]
};

export const projects = [
  {
    title: "PromptWars Challenge 3",
    status: "SHIPPED",
    description: "Hack2Skill challenge — built entirely with a prompts-only workflow. No hand-written boilerplate, just Gemini Pro/Flash + Stitch MCP.",
    stack: ["Gemini Pro/Flash", "Stitch MCP", "Prompt Eng."],
    annotation: "every screen here came from a prompt, not a line of code →",
    link: "#"
  },
  {
    title: "ML Classification Pipeline",
    status: "ACADEMIC",
    description: "Multi-label classification on a large patient dataset. KMeans/PCA for preprocessing, XGBoost + LightGBM ensemble. Validated AUC-ROC and Macro-F1.",
    stack: ["Python", "XGBoost", "LightGBM", "scikit-learn"],
    annotation: "beat baseline by 12% on Macro-F1 →",
    images: ["/blood_tsne.png", "/blood_ranges.png"],
    link: "#"
  },
  {
    title: "Mobility Assistance System",
    status: "PATENT PENDING",
    description: "ML-based autonomous navigation system for mobility-impaired users. Indian patent application filed (Form 2).",
    stack: ["Embedded ML", "Computer Vision", "IoT"],
    annotation: "filed an Indian patent for this one →",
    image: "/smartcane.png",
    link: "#"
  }
];

export const experience = [
  {
    year: "2024",
    title: "VIT Chennai",
    sub: "B.Tech CSE — AI/ML Specialization",
    note: "3rd year, strong CGPA",
    side: "right"
  },
  {
    year: "2024",
    title: "Amazon ML Summer School",
    sub: "Applied",
    note: "ML theory + applied track",
    side: "left"
  },
  {
    year: "2025",
    title: "PromptWars Ch.3",
    sub: "Hack2Skill Challenge",
    note: "prompts-only, shipped live",
    side: "right"
  },
  {
    year: "2025",
    title: "Indian Patent Filing",
    sub: "Mobility Assistance System",
    note: "Form 2 filed",
    side: "left"
  },
  {
    year: "2026",
    title: "Portfolio Launch",
    sub: "This very site",
    note: "open to remote internship",
    side: "right"
  }
];
