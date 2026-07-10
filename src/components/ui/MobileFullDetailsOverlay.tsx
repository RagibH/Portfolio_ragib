import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MobileFullDetailsOverlayProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  status?: string;
  details?: string;
  description: string;
  pills?: string[];
  actions?: ReactNode;
  onClose: () => void;
};

export default function MobileFullDetailsOverlay({
  open,
  title,
  subtitle,
  status,
  details,
  description,
  pills,
  actions,
  onClose,
}: MobileFullDetailsOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/85 p-4 md:hidden">
      <div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[#1A1614] shadow-[0_25px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] px-5 py-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#C89B76]">
              {status}
            </p>
            <h2 className="mt-2 text-[1.125rem] font-semibold leading-[1.2] text-[#F5F1EC]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 text-[0.75rem] leading-[1.5] text-[#B8AA9C]">
                {subtitle}
              </p>
            ) : null}
            {details ? (
              <p className="mt-2 text-[0.75rem] uppercase tracking-[0.14em] text-[#B8AA9C]">
                {details}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[rgba(255,255,255,0.12)] px-3 py-1 text-[0.75rem] uppercase tracking-[0.18em] text-[#F5F1EC] transition hover:border-[#C89B76] hover:text-[#C89B76]"
          >
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto px-5 py-5 text-[#B8AA9C]">
          <p className="whitespace-pre-line text-[0.9375rem] leading-[1.8]">
            {description}
          </p>

          {pills?.length ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <li key={pill}>
                  <span className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.15)] px-3 py-1 text-[0.625rem] uppercase tracking-[0.12em] text-[#B8AA9C]">
                    {pill}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {actions ? (
          <div className="border-t border-[rgba(255,255,255,0.08)] px-5 py-4">
            <div className="flex flex-wrap gap-3">{actions}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
