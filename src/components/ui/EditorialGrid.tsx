import { cn } from "@/lib/utils";

type EditorialGridProps = {
  children: React.ReactNode;
  layout?: "text-image" | "image-text";
  className?: string;
};

export default function EditorialGrid({
  children,
  layout = "text-image",
  className,
}: EditorialGridProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-12 lg:gap-[100px]",
        layout === "text-image" &&
          "lg:grid-cols-[58fr_42fr]",
        layout === "image-text" &&
          "lg:grid-cols-[42fr_58fr]",
        className
      )}
    >
      {children}
    </div>
  );
}
