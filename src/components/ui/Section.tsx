import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { sectionSpacing } from "@/lib/spacing";

type SectionProps = React.HTMLAttributes<HTMLElement>;

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { className, children, ...props },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn(sectionSpacing.section, "w-full", className)}
      {...props}
    >
      {children}
    </section>
  );
});

export default Section;
