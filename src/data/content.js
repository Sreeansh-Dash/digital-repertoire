export const meta = {
  name: "Sreeansh Dash",
  role: "CS Student · AI/ML · VIT Chennai",
  tagline: "Ink in the compiler. Stories in the code.",
  email: "sreeansh786@gmail.com",
  github: "https://github.com/Sreeansh-Dash",
  linkedin: "https://www.linkedin.com/in/sreeansh-dash/",
  leetcode: "https://leetcode.com/u/SreeanshDash/",
  cv: "/Sreeansh_dash_resume_visual.pdf"
};

export const about = {
  bio: [
    "Code is not merely instructions for a machine; it is a modern script written to solve human problems.",
    "I am a student of systems and an author of intelligent software. Currently pursuing my B.Tech in Computer Science & Engineering (AI/ML) at VIT Chennai with a 9.62 CGPA, I view development as a digital craftsmanship. My focus lies at the intersection of data-driven intelligence, elegant backend architecture, and real-world edge deployment."
  ],
  aside: "I like projects small enough to finish and weird enough to talk about.",
  skills: [
    { category: "code", icon: "code", subtopics: "Python • Java • C/C++ • JavaScript" },
    { category: "AI / ML", icon: "brain", subtopics: "Deep Learning • Computer Vision • NLP • YOLOv8 • OpenCV" },
    { category: "backend & dev", icon: "terminal", subtopics: "REST APIs • Backend Development • Agile / Scrum" },
    { category: "hardware & networks", icon: "gear", subtopics: "Embedded Systems • Arduino / ESP32 • IoT Sensors • Cisco Packet Tracer" },
    { category: "data", icon: "data", subtopics: "SQL & Database Management • PCA • K-Means Clustering • Pandas" },
    { category: "tools", icon: "tools", subtopics: "VS Code • Figma • Streamlit • Git & GitHub" },
    { category: "Foundations", icon: "book", subtopics: "Data Structures & Algorithms • Competitive Programming • Network Engineering" }
  ]
};

export const projects = [
  {
    title: "PromptWars Challenge 3",
    status: "SHIPPED",
    description: "Hack2Skill challenge — built entirely with a prompts-only workflow. No hand-written boilerplate, just Gemini Pro/Flash + Stitch MCP. To view the live project <a href=\"https://promptwars-week-3-fimjd3rmq-sreeansh-dashs-projects.vercel.app/\" target=\"_blank\" style=\"text-decoration:underline;\">click here</a>.",
    stack: ["Gemini Pro/Flash", "Stitch MCP", "Prompt Eng."],
    annotation: "every screen here came from a prompt, not a line of code →",
    images: ["/Promptwars_img1.png", "/prompwars_img2.png"],
    link: "https://promptwars-week-3-fimjd3rmq-sreeansh-dashs-projects.vercel.app/"
  },
  {
    title: "Cluster Adaptive Blood Report Analyzer",
    status: "ACADEMIC",
    description: "Multi-label classification on a large patient dataset. KMeans/PCA for preprocessing, XGBoost + LightGBM ensemble. Validated AUC-ROC and Macro-F1. For further details on pipeline and charts <a href=\"https://cluster-adaptive-blood-report-analy.vercel.app/\" target=\"_blank\" style=\"text-decoration:underline;\">click here</a>.",
    stack: ["Python", "XGBoost", "LightGBM", "scikit-learn"],
    annotation: "beat baseline by 12% on Macro-F1 →",
    images: ["/blood_tsne.png", "/blood_ranges.png"],
    link: "https://cluster-adaptive-blood-report-analy.vercel.app/"
  },
  {
    title: "Mobility Assistance System",
    status: "PATENT PENDING",
    description: "ML-based autonomous navigation system for mobility-impaired users. Ackermann steering and terrain adaptive feedback systems were added. Indian patent application filed.",
    stack: ["Embedded ML", "Computer Vision", "IoT"],
    annotation: "filed an Indian patent for this one →",
    image: "/smartcane.png",
    link: "#"
  },
  {
    title: "Cascadex",
    status: "IN DEVELOPMENT",
    description: "An AI powered Neo4j graph-based application that scans medicines and tells which combinations are harmful. It is a mobile application built on EAS.",
    stack: ["Expo", "AuraDB", "FastAPI"],
    annotation: "see the chain reaction before it happens →",
    images: ["/cascadeex-1.jpeg", "/cascadex-2.png"],
    link: "#"
  }
];

export const experience = [
  {
    year: "2024",
    title: "VIT Chennai",
    sub: "B.Tech CSE — AI/ML Specialization",
    note: "3rd year, 9.62 CGPA",
    side: "right"
  },
  {
    year: "Aug 2025 - Apr 2026",
    title: "Head of Operations",
    sub: "Kalingajyoti Club",
    note: "<ul style=\"padding-left:1.2rem; margin:0;\"><li>Head of 20+ dept members responsible for on and before-event operations.</li><li>Experience in leadership and accountability.</li></ul>",
    side: "left"
  },
  {
    year: "Jan 2026 - Mar 2026",
    title: "ysoc",
    sub: "Open Source Contributor",
    note: "<ul style=\"padding-left:1.2rem; margin:0;\"><li>Experience in open source and github.</li></ul>",
    side: "right"
  },
  {
    year: "2026",
    title: "Portfolio Launch",
    sub: "This very site",
    note: "open to remote internship",
    side: "left"
  }
];
