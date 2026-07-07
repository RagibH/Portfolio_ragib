export type PublicationData = {
  title: string;
  authors: string;
  venue: string;
  status: string;
  year: string;
  role?: string;
  description: string;
  doi?: string;
  href?: string;
};

export type CompactResearchData = {
  title: string;
  type: string;
  role: string;
  status: string;
};

export type CurrentResearchData = {
  title: string;
  tags: string[];
  note?: string;
};
