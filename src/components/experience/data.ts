import type {
  InfoItem,
  JourneyEntry,
  LeadershipRole,
  ToolkitGroup,
} from "./types";

export const educationParagraph =
  "I completed my Bachelor of Science in Computer Science and Engineering at Sylhet Engineering College with a CGPA of 3.97 out of 4.00. I am now serving as a Research Assistant and Adjunct Lecturer in the Department of CSE under Md. Abu Naser Mojumder, where I continue to develop my interests in machine learning, computer vision and intelligent systems.";

export const educationInfo: InfoItem[] = [
  { label: "Degree", value: "Bachelor of Science" },
  { label: "Department", value: "Computer Science and Engineering" },
  { label: "Institution", value: "Sylhet Engineering College" },
  { label: "Final CGPA", value: "3.97 / 4.00" },
  { label: "Status", value: "Graduated" },
  {
    label: "Current Roles",
    value: ["Research Assistant", "Adjunct Lecturer"],
  },
];

export const leadershipParagraph =
  "Beyond academics, I actively contribute to student organizations by organizing technical events, supporting collaborative learning and encouraging research activities among fellow students.";

export const leadershipRoles: LeadershipRole[] = [
  {
    title: "Vice President",
    organization: "SEC CSE Research Club",
    description:
      "Promoting research, organizing research activities and supporting collaborative projects.",
  },
  {
    title: "General Secretary",
    organization: "CSE Society",
    description:
      "Led technical events, seminars, competitions and student initiatives. Oct 2025 – Aug 2026.",
  },
  {
    title: "Organizing Secretary",
    organization: "SEC Programming Club",
    description:
      "Organized programming contests, workshops and technical events. Oct 2025 – Aug 2026.",
  },
];

export const competitiveProgrammingParagraph =
  "My journey into computer science began with competitive programming. During my first two undergraduate years, I focused extensively on algorithms and data structures using C++. This experience strengthened my problem-solving ability and analytical thinking, which later became the foundation for my machine learning research.";

export const competitiveProgrammingInfo: InfoItem[] = [
  { label: "Programming Language", value: "C++" },
  {
    label: "Platforms",
    value: ["Codeforces", "CodeChef", "LightOJ", "UVa"],
  },
  { label: "Solved Problems", value: "1200+" },
  { label: "Highest Rating", value: "Pupil" },
];

export const toolkitParagraph =
  "Over the years I have worked with a variety of technologies across machine learning, software engineering and modern web development.";

export const toolkitGroups: ToolkitGroup[] = [
  {
    name: "Artificial Intelligence",
    items: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "YOLO",
      "Scikit-learn",
    ],
  },
  {
    name: "Programming",
    items: ["C++", "Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    name: "Web Development",
    items: ["Next.js", "React", "Node.js", "Django", "Tailwind CSS"],
  },
  {
    name: "Cloud Platforms",
    items: ["Cloudflare", "Vercel", "Render"],
  },
  {
    name: "Developer Tools",
    items: ["Git", "GitHub", "VS Code", "Cursor", "LaTeX"],
  },
];

export const journeyEntries: JourneyEntry[] = [
  {
    year: "2022",
    title: "Started Computer Science and Engineering",
    description:
      "Focused on programming fundamentals, algorithms, C++ and competitive programming.",
  },
  {
    year: "2023",
    title: "Competitive Programming with C++",
    description:
      "Deepened problem-solving skills through C++ on Codeforces, CodeChef and related platforms.",
  },
  {
    year: "2024",
    title: "Machine Learning, Python and Java Projects",
    description:
      "Started learning machine learning and Python in depth; built Java-based academic projects alongside coursework.",
  },
  {
    year: "2025",
    title: "Research, AI Projects and Client Work",
    description: [
      "Published IEEE conference papers in computer vision and NLP.",
      "Built ML and AI-based projects including BloBax and Baymax.",
      "Delivered paid web project for BizTrade Venture.",
      "Continued student leadership across CSE Society and research clubs.",
    ],
  },
  {
    year: "2026",
    title: "Graduation, academic roles and research",
    description: [
      "Graduated with BSc in Computer Science and Engineering from Sylhet Engineering College.",
      "Joined as Research Assistant and Adjunct Lecturer under Md. Abu Naser Mojumder, Associate Professor and Head of CSE.",
      "Completed undergraduate thesis on vehicle detection and Bangla license plate recognition.",
      "Advancing journal submissions and ICCIT 2026 conference papers.",
    ],
  },
];

export const futureVisionParagraph =
  "My long-term goal is to pursue a PhD in Machine Learning with a focus on Computer Vision, Image Processing and Intelligent Healthcare Systems. I hope to contribute to research that combines scientific innovation with practical real-world impact while developing intelligent technologies that improve everyday life.";
