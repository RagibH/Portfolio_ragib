export const siteContact = {
  email: "ragibhasansec@gmail.com",
  emailHref: "mailto:ragibhasansec@gmail.com",
  phone: "+8801903156620",
  phoneHref: "tel:+8801903156620",
  location: "Pallabi, Mirpur-Dhaka",
  resumeHref: "/resume.pdf",
  links: {
    github: "https://github.com/RagibH",
    linkedin: "https://www.linkedin.com/in/ragib-hasan-828316317",
    facebook: "https://www.facebook.com/ragib.hasan.1293",
    googleScholar:
      "https://scholar.google.com/citations?hl=en&user=UMVM2qgAAAAJ",
    orcid: "https://orcid.org/0009-0004-0839-5008",
    researchGate: "https://www.researchgate.net/profile/Md-Hasan-1386",
  },
} as const;

/** Hero background served from `public/images/`. */
export const heroImage = {
  src: "/images/portfolio-hero-new.webp",
  fallbackSrc: "/images/portfolio-hero-new.png",
  version: 2,
} as const;

export const heroImageSrc = `${heroImage.src}?v=${heroImage.version}`;
export const heroImageFallbackSrc = `${heroImage.fallbackSrc}?v=${heroImage.version}`;

/** Navbar + favicon logo served from `public/images/`. */
export const brandLogo = {
  src: "/images/rh-logo.png",
  version: 1,
} as const;

export const brandLogoSrc = `${brandLogo.src}?v=${brandLogo.version}`;

export const footerSocialLinks = [
  { label: "GitHub", href: siteContact.links.github },
  { label: "LinkedIn", href: siteContact.links.linkedin },
  { label: "Facebook", href: siteContact.links.facebook },
  { label: "Google Scholar", href: siteContact.links.googleScholar },
  { label: "Email", href: siteContact.emailHref },
] as const;
