import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type EditorialHeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3";
};

const EditorialHeading = forwardRef<HTMLHeadingElement, EditorialHeadingProps>(
  function EditorialHeading(
    { as: Tag = "h2", className, children, ...props },
    ref
  ) {
    return (
      <Tag
        ref={ref}
        className={cn(
          "max-w-[18ch] font-sans text-[clamp(1.875rem,4.2vw,3rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[#F5F1EC]",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

export default EditorialHeading;
