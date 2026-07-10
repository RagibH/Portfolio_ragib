import { cn } from "@/lib/utils";
import ReadFullText from "@/components/ui/ReadFullText";
import type { CurrentResearchData } from "./types";

type CurrentResearchCardProps = {
  research: CurrentResearchData;
  className?: string;
};

export default function CurrentResearchCard({
  research,
  className,
}: CurrentResearchCardProps) {
  return (
    <article
      className={cn(
        "current-research-card group h-full overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1A1614]",
        "transition-[border-color,transform,box-shadow] duration-[450ms] ease-out",
        "hover:-translate-y-1 hover:border-[rgba(200,155,118,0.22)] hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className="current-research-card__inner flex h-full flex-col">
        <span
          className="current-research-card__accent block h-px w-8 bg-[#C89B76] opacity-40 transition-[width,opacity] duration-[450ms] ease-out group-hover:w-12 group-hover:opacity-70"
          aria-hidden="true"
        />

        <h3 className="current-research-card__title">{research.title}</h3>

        {research.tags.length > 0 ? (
          <ul className="current-research-card__tags featured-pills mt-5 flex flex-wrap gap-2">
            {research.tags.map((tag) => (
              <li key={tag}>
                <span className="featured-pill">{tag}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {research.note ? (
          <ReadFullText
            className="mt-5"
            bodyClassName="current-research-card__note"
            collapseLines={3}
          >
            {research.note}
          </ReadFullText>
        ) : null}
      </div>
    </article>
  );
}
