import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  variant?: "portrait" | "artistic";
  label?: string;
  className?: string;
};

const variantStyles = {
  portrait: "aspect-[3/4]",
  artistic: "aspect-[4/5]",
};

export default function ImagePlaceholder({
  variant = "portrait",
  label,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative w-full max-h-[700px] overflow-hidden rounded-[28px]",
        "border border-[rgba(255,255,255,0.08)]",
        "bg-[#151210]",
        "shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]",
        variantStyles[variant],
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 30% 20%, rgba(200,155,118,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 80% 70% at 80% 90%, rgba(21,18,16,0.9) 0%, transparent 50%),
            linear-gradient(165deg, #181412 0%, #0D0B09 100%)
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
        }}
      />

      {label ? (
        <span className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.28em] text-[#B8AA9C] uppercase opacity-40">
          {label}
        </span>
      ) : null}
    </div>
  );
}
