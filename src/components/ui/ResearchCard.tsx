import { cn } from "@/lib/utils";

type ResearchCardProps = {
  title: string;
  items: string[];
  className?: string;
};

export default function ResearchCard({
  title,
  items,
  className,
}: ResearchCardProps) {
  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#1A1614]",
        "transition-[border-color,transform] duration-[450ms] ease-out",
        "hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.14)]",
        className
      )}
    >
      <div className="research-card__inner">
        <h3 className="font-sans text-[0.875rem] font-medium tracking-[-0.01em] text-[#F5F1EC] md:text-[0.9375rem]">
          {title}
        </h3>
        <ul className="mt-3.5 flex list-none flex-col gap-2 md:mt-4">
          {items.map((item) => (
            <li
              key={item}
              className="font-sans text-[0.75rem] font-light leading-[1.6] tracking-[0.01em] text-[#B8AA9C] md:text-[0.8125rem]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
