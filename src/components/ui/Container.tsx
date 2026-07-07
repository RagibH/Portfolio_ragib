import { cn } from "@/lib/utils";
import { sectionSpacing } from "@/lib/spacing";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export default function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(sectionSpacing.container, className)} {...props}>
      {children}
    </div>
  );
}
