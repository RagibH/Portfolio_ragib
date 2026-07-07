import { cn } from "@/lib/utils";

type SectionDividerProps = React.HTMLAttributes<HTMLHRElement> & {
  width?: "sm" | "md" | "full";
};

const widthMap = {
  sm: "w-12",
  md: "w-24",
  full: "w-full",
};

export default function SectionDivider({
  width = "full",
  className,
  ...props
}: SectionDividerProps) {
  return (
    <hr
      className={cn(
        "h-px border-0 bg-[rgba(255,255,255,0.12)]",
        widthMap[width],
        className
      )}
      {...props}
    />
  );
}
