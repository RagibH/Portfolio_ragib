export type ProjectMediaItem =
  | {
      type: "image";
      src: string;
      alt?: string;
      width?: number;
      height?: number;
      backgroundColor?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
    };

export type FeaturedProjectData = {
  name: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  media: ProjectMediaItem[];
  mediaLink?: string;
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
