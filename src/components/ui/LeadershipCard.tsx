import { cn } from "@/lib/utils";

export type LeadershipCardData = {
  title: string;
  organization?: string;
  description: string;
};

type LeadershipCardProps = {
  card: LeadershipCardData;
  className?: string;
};

export default function LeadershipCard({ card, className }: LeadershipCardProps) {
  return (
    <article
      className={cn(
        "leadership-card group h-full overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1A1614]",
        "transition-[border-color,transform,box-shadow] duration-[450ms] ease-out",
        "hover:-translate-y-1 hover:border-[rgba(200,155,118,0.22)] hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className="leadership-card__inner flex h-full flex-col">
        <span
          className="leadership-card__accent block h-px w-8 bg-[#C89B76] opacity-40 transition-[width,opacity] duration-[450ms] ease-out group-hover:w-12 group-hover:opacity-70"
          aria-hidden="true"
        />

        <h3 className="mt-5 font-sans text-[1.0625rem] font-medium tracking-[-0.015em] text-[#F5F1EC] transition-colors duration-[450ms] ease-out group-hover:text-[#F5F1EC] md:text-[1.125rem]">
          {card.title}
        </h3>

        {card.organization ? (
          <p className="leadership-card__org mt-3 font-mono text-[10px] tracking-[0.18em] text-[#B8AA9C] uppercase transition-colors duration-[450ms] ease-out group-hover:text-[#C89B76]">
            {card.organization}
          </p>
        ) : null}

        <p className="mt-5 font-sans text-[0.875rem] font-light leading-[1.75] tracking-[0.01em] text-[#B8AA9C] transition-colors duration-[450ms] ease-out group-hover:text-[#C4B8AA] md:mt-6 md:text-[0.9375rem]">
          {card.description}
        </p>
      </div>
    </article>
  );
}
