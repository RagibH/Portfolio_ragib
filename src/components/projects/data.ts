import type { FeaturedProjectData, OtherProjectData } from "./types";



export const featuredProjectsIntro =

  "Each project represents a different stage of my journey, from AI-powered healthcare systems and research prototypes to production-ready web platforms built for real clients.";



export const featuredProjects: FeaturedProjectData[] = [

  {

    name: "BloBax",

    category: "AI Healthcare Platform",

    status: "Active Development",

    description:

      "A Django-based AI healthcare platform with health predictions, a Gemini-powered emergency guidance chatbot, handwritten medicine-name recognition from prescriptions, and a doctor directory for Bangladesh.",

    technologies: [

      "Python",

      "Django",

      "Gemini API",

      "Machine Learning",

      "MySQL",

    ],

    github: "https://github.com/RagibH/BloBax",

  },

  {

    name: "BioEnclave",

    category: "Official Company Website",

    status: "Live",

    description:

      "Official website developed for BioEnclave with a focus on editorial design, responsiveness and performance. Built as a paid client project using modern frontend technologies.",

    technologies: [

      "Next.js",

      "TypeScript",

      "Tailwind CSS",

      "Cloudflare",

      "Vercel",

    ],

    visitWebsite: "https://bioenclave.com",

  },

  {

    name: "BizTrade Venture",

    category: "Business Management Platform",

    status: "Completed",

    description:

      "Product management and admin management web application developed for BizTrade Venture, providing structured workflows for daily business operations.",

    technologies: ["Next.js", "React", "Node.js", "Tailwind CSS"],

  },

  {

    name: "Baymax",

    category: "AI Medical Assistant",

    status: "Research Prototype",

    description:

      "An AI-powered desktop medical assistant with first-aid chatbot, handwritten prescription recognition, disease risk predictions (diabetes, heart, liver, BMI), and an emergency hospital directory for Bangladesh.",

    technologies: ["Python", "TensorFlow", "Scikit-learn", "MySQL"],

    github:

      "https://github.com/RagibH/Baymax--Your-personal-AI-powered-medical-assistant",

  },

];



export const otherProjects: OtherProjectData[] = [

  {

    title: "Online Book Shop",

    category: "PHP Web Application",

    status: "Completed",

    description:

      "Full online book shop with product browsing, cart, checkout, user accounts, and an admin panel. Built with PHP, MySQL, and Bootstrap.",

    github: "https://github.com/RagibH/Book-Shop",

  },

  {

    title: "Pharmacy Management System",

    category: "Java Desktop Application",

    status: "Completed",

    description:

      "Java Swing desktop application for managing medicines, customers, billing, and stock with MySQL database integration.",

    github: "https://github.com/RagibH/pharmacy-management-system",

  },

  {

    title: "Digital Image Processing Toolkit",

    category: "Python / Streamlit",

    status: "Live",

    description:

      "Interactive Streamlit application for applying and visualizing a wide range of digital image processing techniques.",

    github: "https://github.com/RagibH/DIP_Project",

    liveDemo: "https://dip-project-01kq.onrender.com/",

  },

];



export const developmentPhilosophyParagraph =

  "I believe software should be useful before it is impressive. Whether developing AI systems or modern web applications, I focus on creating solutions that are reliable, maintainable and meaningful for real users.";


