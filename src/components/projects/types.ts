export type FeaturedProjectData = {
  name: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  visitWebsite?: string;
};

export type OtherProjectData = {
  title: string;
  category: string;
  status: string;
  description: string;
  github?: string;
  liveDemo?: string;
};
