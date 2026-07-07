"use client";

import PageTransition from "@/providers/PageTransitionProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
