export type ContactStaticDetail = {
  label: string;
  value: string;
};

export type ContactActionLink = {
  label: string;
  href: string;
  external?: boolean;
  hideOnMobile?: boolean;
};

export type AvailabilityItem = {
  label: string;
  description: string;
};
