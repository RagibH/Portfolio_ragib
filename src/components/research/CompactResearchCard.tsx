import { cn } from "@/lib/utils";
import type { CompactResearchData } from "./types";

type CompactResearchCardProps = {
  research: CompactResearchData;
  className?: string;
};

export default function CompactResearchCard({
  research,
  className,
}: CompactResearchCardProps) {
  return (
    <article
      className={cn(
        "compact-research-card group overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#1A1614]",
        "transition-[border-color,transform] duration-[450ms] ease-out",
        "hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.14)]",
        className
      )}
    >
      <div className="compact-research-card__inner">
        <div className="compact-research-card__header">
          <span className="compact-research-card__status">{research.status}</span>
        </div>

        <h3 className="compact-research-card__title">{research.title}</h3>

        <div className="compact-research-card__meta">
          <span>{research.type}</span>
          <span className="compact-research-card__sep" aria-hidden="true">
            ·
          </span>
          <span>{research.role}</span>
        </div>
      </div>
    </article>
  );
}
