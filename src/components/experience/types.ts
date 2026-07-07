export type LeadershipRole = {
  title: string;
  organization: string;
  description: string;
};

export type JourneyEntry = {
  year: string;
  title: string;
  description?: string | string[];
};

export type ToolkitGroup = {
  name: string;
  items: string[];
};

export type InfoItem = {
  label: string;
  value: string | string[];
};
