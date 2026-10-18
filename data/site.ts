// All the site's words and links live here, so content can change without touching the layout.

export const profile = {
  name: "Tejas Badhe",
  firstName: "Tejas",
  role: "Software Developer",
  location: "Pune, India",
  email: "tejasbadhe@gmail.com",
  resume: "/resume.pdf",
  roles: ["Full-stack developer", "AI/ML engineer", "Product builder", "Computer vision tinkerer"],
  intro:
    "I build web platforms and machine learning systems end to end, from the database and APIs to the interface people actually use.",
  about: [
    "I'm a software developer working across Python, Flask, React, Next.js and JavaScript. I like owning a product from the first schema to the last pixel: scalable backends, clean REST APIs, and deployments on AWS and Render with automated pipelines.",
    "On the machine learning side I work with TensorFlow, Pandas, NumPy and OpenCV, turning raw data into models and models into features people can use. Right now I'm building HostTerrace, a platform for holiday-property businesses.",
  ],
  socials: {
    github: "https://github.com/TejasBadhe07",
    linkedin: "https://www.linkedin.com/in/tejasbadhe07/",
    instagram: "https://www.instagram.com/tejasbadhe07",
    x: "https://x.com/TejasBadhe07",
  },
};

export type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  points: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    title: "Software Developer",
    company: "Sci-Com Software India Pvt. Ltd.",
    location: "Pune, India",
    period: "Jan 2025 – Present · May 2023 – Sep 2023",
    summary:
      "Building and maintaining full-stack applications, integrating machine learning models, and optimising data pipelines.",
    points: [
      "Analysed diverse datasets with Pandas and NumPy to pull out the insights that shaped product decisions.",
      "Built end-to-end machine learning platforms in Python and TensorFlow, from data preparation to deployment.",
      "Made models easier to understand with clear Matplotlib and Seaborn visualisations.",
      "Tuned TensorFlow models for better accuracy and speed.",
    ],
    tech: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "AWS", "Pandas"],
  },
  {
    title: "Software Developer Intern",
    company: "Anyu Biomedical LLP",
    location: "Pune, India",
    period: "Oct 2022 – May 2023",
    summary:
      "Analysed time-series medical data and built computer vision models on top of it.",
    points: [
      "Ran statistical analysis and visualisation with Matplotlib and Seaborn.",
      "Turned time-series signals into images with OpenCV for ML training.",
      "Built and tuned predictive models with TensorFlow and Keras.",
      "Owned the full workflow: preprocessing, feature engineering, training, validation and deployment.",
    ],
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "PyTorch"],
  },
];

export const education = {
  degree: "Bachelor of Computer Engineering",
  period: "2018 – 2022",
  location: "Mumbai, India",
};

export type SkillGroup = { title: string; blurb: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "Fast, accessible interfaces",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Three.js"],
  },
  {
    title: "Backend",
    blurb: "APIs, data and auth",
    skills: ["Python", "Flask", "Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    title: "AI & Data",
    blurb: "From raw data to models",
    skills: ["TensorFlow", "Keras", "PyTorch", "OpenCV", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    title: "Shipping",
    blurb: "Getting it live and keeping it there",
    skills: ["Git", "AWS", "Render", "Vercel", "CI/CD", "Playwright"],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "Web" | "AI / ML" | "Computer Vision";
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
  status?: string;
  featured?: boolean;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "hostterrace",
    title: "HostTerrace",
    tagline: "OTA platform for holiday-property businesses",
    description:
      "One shared platform for companies that run several holiday properties. Each company gets its own booking website, an admin area for villas, bookings and team, and a channel manager that keeps prices and open or closed nights in sync with Airbnb and MakeMyTrip through Beds24.",
    category: "Web",
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Playwright"],
    status: "In progress",
    featured: true,
    highlights: [
      "Separate website and admin area for every company",
      "Channel manager syncing prices and availability with Airbnb and MakeMyTrip",
      "Strict per-company data separation, tested in the browser",
      "Passwordless email sign-in and per-company branding",
    ],
  },
  {
    slug: "quiz-master",
    title: "Quiz Master",
    tagline: "Daily quizzes with streaks and leaderboards",
    description:
      "An interactive quiz app with daily quizzes, leaderboards and streak tracking to keep people coming back.",
    category: "Web",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: "/images/projects/quiz-master.webp",
    github: "https://github.com/TejasBadhe07/Quiz-Master",
    demo: "https://quiz-master-tawny-pi.vercel.app/",
  },
  {
    slug: "creator-studio",
    title: "Creator Studio",
    tagline: "Workflow hub for content creators",
    description:
      "A web app that helps content creators plan, schedule and track their content in one place.",
    category: "Web",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/creator-studio.webp",
    github: "https://github.com/TejasBadhe07/CreatorStudio",
    demo: "https://content-creator-studio.vercel.app/",
  },
  {
    slug: "library-management",
    title: "Library Management System",
    tagline: "Books, members and loans in one dashboard",
    description:
      "Helps librarians manage books, members and borrowing, with search, fines and reports.",
    category: "Web",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: "/images/projects/library-management.webp",
    github: "https://github.com/TejasBadhe07/Library-Management-System",
  },
  {
    slug: "object-detection-car",
    title: "Object Detection Car",
    tagline: "Real-time vehicle detection and tracking",
    description:
      "Detects, classifies and tracks vehicles in video streams in real time using computer vision.",
    category: "Computer Vision",
    tech: ["Python", "OpenCV", "YOLO", "TensorFlow"],
    image: "/images/projects/object-detection.webp",
    github: "https://github.com/TejasBadhe07/Object-Detection-Car",
  },
  {
    slug: "digit-recognition",
    title: "Handwritten Digit Recognition",
    tagline: "Neural networks on MNIST",
    description:
      "Recognises handwritten digits with high accuracy, comparing several neural network designs.",
    category: "AI / ML",
    tech: ["Python", "TensorFlow", "Keras", "NumPy"],
    image: "/images/projects/digit-recognition.webp",
    github: "https://github.com/TejasBadhe07/Handwritten-Digit-Recognization",
  },
  {
    slug: "image-classification",
    title: "CNN Image Classification",
    tagline: "Custom CNNs and transfer learning",
    description:
      "Convolutional neural networks for image classification, with a custom architecture and transfer learning.",
    category: "AI / ML",
    tech: ["Python", "PyTorch", "TensorFlow", "OpenCV"],
    image: "/images/projects/image-classification.webp",
    github: "https://github.com/TejasBadhe07/CNN-for-Image-Classification",
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];
