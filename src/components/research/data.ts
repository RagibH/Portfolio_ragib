import type {
  CompactResearchData,
  CurrentResearchData,
  PublicationData,
} from "./types";

export const philosophyParagraph =
  "My research focuses on developing machine learning systems that solve practical real-world problems while maintaining scientific rigor and reproducibility. I am particularly interested in computer vision, image processing, intelligent healthcare and document understanding, with the long-term goal of contributing to impactful academic research.";

export const featuredPublications: PublicationData[] = [
  {
    title:
      "ChakmaCNN: A Pronunciation-Aware CNN for Handwritten Chakma Script Recognition",
    authors: "Md. Ragib Hasan, et al.",
    venue: "IEEE Conference",
    status: "Published",
    year: "2025",
    role: "First Author",
    description:
      "A pronunciation-aware convolutional neural network for handwritten Chakma script recognition, designed to capture script-specific visual and phonetic patterns.",
    href: "https://ieeexplore.ieee.org/abstract/document/11491110",
  },
  {
    title:
      "DateFNet: From Pixels to Plates, Attention Based Multi-Stream CNN for Date Fruit Classification",
    authors: "Md. Ragib Hasan, et al.",
    venue: "IEEE Conference",
    status: "Published",
    year: "2025",
    role: "Third Author",
    description:
      "An attention-based multi-stream CNN framework for classifying date fruits from image data, combining spatial feature extraction with attention mechanisms.",
    href: "https://ieeexplore.ieee.org/abstract/document/11491249",
  },
  {
    title:
      "Towards Secure Digital Communication: Deep Learning-Based Automated Classification of Malicious Bangla Messages",
    authors: "Md. Ragib Hasan, et al.",
    venue: "IEEE Conference",
    status: "Published",
    year: "2026",
    role: "Fifth Author",
    description:
      "A deep learning approach for automatically detecting and classifying malicious Bangla text messages to support safer digital communication.",
    href: "https://ieeexplore.ieee.org/abstract/document/11545989",
  },
];

export const moreResearch: CompactResearchData[] = [
  {
    title:
      "Performance and Generalization Analysis of CNN and Hybrid Deep Learning Models for Handwritten Medicine-Name Recognition in Bangladeshi Prescriptions",
    type: "Intelligence-Based Medicine, Elsevier · Jul 2026",
    role: "First Author",
    status: "Under Review",
  },
  {
    title:
      "RGCF-YOLO11: Region-Gated Context Fusion for Tiny PCB Defect Detection on Periodic Textures",
    type: "ICCIT 2026 Conference Submission",
    role: "First Author",
    status: "Under Review",
  },
  {
    title:
      "Content-Adaptive Multi-Scale Tokenization for Lightweight ViTs in Remote Sensing",
    type: "ICCIT 2026 Conference Submission",
    role: "First Author",
    status: "Under Review",
  },
  {
    title:
      "BongoBarta: A GRU-Attention Model with FastText Embeddings for Bengali News Headline Classification",
    type: "ICCIT 2026 Conference Submission",
    role: "Second Author",
    status: "Under Review",
  },
  {
    title:
      "YGP-Net: A Lightweight P6-Enhanced YOLO11 Network for Efficient Obstacle Detection",
    type: "ICCIT 2026 Conference Submission",
    role: "Second Author",
    status: "Under Review",
  },
  {
    title: "Two additional ICCIT 2026 conference submissions",
    type: "ICCIT 2026 Conference Submission",
    role: "Third Author",
    status: "Under Review",
  },
];

export const currentResearch: CurrentResearchData[] = [
  {
    title:
      "From Traffic Scenes to Registration Strings: A Field Study of Vehicle Detection and Bangla License Plate Recognition in Bangladesh",
    tags: ["Completed Thesis", "First Author", "YOLO", "OCR", "Bangla LPR"],
    note:
      "Supervisor: Md. Abu Naser Mojumder, Associate Professor and Head, Department of CSE, Sylhet Engineering College.\n\n• Collected and curated real-world traffic video data from five locations across Dhaka and Sylhet, building a field-derived dataset for vehicle detection and Bangla license plate recognition under unconstrained conditions.\n\n• Investigated small-object localization, degraded plate imagery, and complete Bangla registration-string recognition through a systematic evaluation of 13 detection and 9 OCR configurations; YOLO11n-SOEN achieved 0.6142 mAP@0.50:0.95, while BPNet achieved 82.36% test accuracy and 67.07% unseen-string accuracy.\n\n• Developed an end-to-end video inference pipeline integrating vehicle detection and plate recognition.\n\nI plan to continue further work on this topic.",
  },
  {
    title: "Lightweight CNN Models for Handwritten Hangul Alphabet Classification",
    tags: ["Research in Progress", "CNN", "Handwritten Script Recognition"],
    note:
      "Investigating lightweight handwritten-script recognition with CNN-based models for efficient recognition in low-resource settings.",
  },
];

export const researchInterests = [
  "Computer Vision",
  "Machine Learning",
  "Deep Learning",
  "Image Processing",
  "Medical AI",
  "OCR",
  "Object Detection",
  "Natural Language Processing",
  "Pattern Recognition",
];
