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

    title: "Handwritten Medicine-Name Recognition in Bangladeshi Prescriptions",

    type: "Journal Paper",

    role: "First Author",

    status: "Submitted",

  },

  {

    title: "Lightweight CNN Models for Handwritten Hangul Alphabet Classification",

    type: "Journal Paper",

    role: "Contributing Author",

    status: "Submitted",

  },

  {

    title: "BongoBarta: Bengali News Headline Classification",

    type: "Conference Paper",

    role: "Contributing Author",

    status: "Submitted",

  },

];



export const currentResearch: CurrentResearchData[] = [

  {

    title: "Lightweight Vehicle and Number Plate Detection System",

    tags: ["YOLO", "OCR", "Own Dataset", "Thesis Work"],

    note: "Dataset collected from Dhaka, Sylhet and other cities. Model development in progress.",

  },

  {

    title: "Multiclass Skin Disease Lesion Detection",

    tags: ["Medical Image Analysis", "Deep Learning", "Classification"],

  },

  {

    title: "BongoBarta: BiGRU-Attention Model for Bengali News Headlines",

    tags: ["NLP", "BiGRU", "FastText", "Low-Resource Languages"],

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


