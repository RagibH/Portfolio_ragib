import { cn } from "@/lib/utils";

type ProjectScreenshotPlaceholderProps = {
  label?: string;
  className?: string;
};

export default function ProjectScreenshotPlaceholder({
  label,
  className,
}: ProjectScreenshotPlaceholderProps) {
  return (
    <div
      className={cn("project-screenshot", className)}
      aria-hidden={label ? undefined : true}
    >
      <div className="project-screenshot__surface">
        <div className="project-screenshot__frame" />
        {label ? (
          <span className="project-screenshot__label">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
