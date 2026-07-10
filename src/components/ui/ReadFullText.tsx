"use client";

import {
  type ElementType,
  type MouseEvent,
  type ReactNode,
  useId,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type ReadFullTextProps = {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: ElementType;
  collapseLines?: number;
  onExpandedChange?: (expanded: boolean) => void;
};

export default function ReadFullText({
  children,
  className,
  bodyClassName,
  as: Component = "p",
  collapseLines = 3,
  onExpandedChange,
}: ReadFullTextProps) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setExpanded((current) => {
      const next = !current;
      onExpandedChange?.(next);
      return next;
    });
  }

  return (
    <div
      className={cn(
        "read-full-text",
        expanded && "read-full-text--expanded",
        className
      )}
    >
      <Component
        id={bodyId}
        className={cn("read-full-text__body", bodyClassName)}
        style={{ ["--read-full-lines" as string]: collapseLines }}
      >
        {children}
      </Component>
      <button
        type="button"
        className="read-full-text__toggle"
        aria-expanded={expanded}
        aria-controls={bodyId}
        onClick={handleToggle}
      >
        {expanded ? "Show less" : "Read full"}
      </button>
    </div>
  );
}
