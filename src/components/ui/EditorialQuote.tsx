import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type EditorialQuoteProps = {
  quote: string;
  className?: string;
};

const EditorialQuote = forwardRef<HTMLQuoteElement, EditorialQuoteProps>(
  function EditorialQuote({ quote, className }, ref) {
    return (
      <blockquote
        ref={ref}
        className={cn(
          "relative border-l border-[rgba(200,155,118,0.35)] pl-7 md:pl-8",
          className
        )}
      >
        <span
          aria-hidden="true"
          className="mb-4 block font-serif text-[3.5rem] leading-none text-[#C89B76] opacity-30"
        >
          &ldquo;
        </span>
        <p className="max-w-[540px] font-sans text-[clamp(1.0625rem,2vw,1.25rem)] font-light italic leading-[1.75] tracking-[0.01em] text-[#F5F1EC]">
          {quote}
        </p>
      </blockquote>
    );
  }
);

export default EditorialQuote;
