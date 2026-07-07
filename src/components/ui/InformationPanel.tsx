import { cn } from "@/lib/utils";

export type InfoRow = {
  label: string;
  value: string | string[];
};

type InformationPanelProps = {
  rows: InfoRow[];
  className?: string;
};

export default function InformationPanel({
  rows,
  className,
}: InformationPanelProps) {
  return (
    <dl className={cn("info-panel", className)}>
      <div className="info-panel__rows">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-4 sm:grid-cols-[148px_1fr] sm:gap-10"
          >
            <dt className="font-mono text-[10px] tracking-[0.22em] text-[#B8AA9C] uppercase">
              {row.label}
            </dt>
            <dd className="font-sans text-[0.9375rem] font-light leading-[1.75] tracking-[0.01em] text-[#F5F1EC]">
              {Array.isArray(row.value) ? (
                <ul className="flex list-none flex-col gap-2.5">
                  {row.value.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </div>
    </dl>
  );
}
