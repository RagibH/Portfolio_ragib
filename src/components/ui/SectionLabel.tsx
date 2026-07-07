import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = React.HTMLAttributes<HTMLParagraphElement> & {
  index?: string;
};

const SectionLabel = forwardRef<HTMLParagraphElement, SectionLabelProps>(
  function SectionLabel({ index, className, children, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.28em] text-[#B8AA9C]",
          className
        )}
        {...props}
      >
        {index ? (
          <>
            <span className="text-[#C89B76]">{index}</span>
            <span className="mx-2.5 text-[#C89B76] opacity-50" aria-hidden="true">
              ·
            </span>
          </>
        ) : null}
        {children}
      </p>
    );
  }
);

export default SectionLabel;
