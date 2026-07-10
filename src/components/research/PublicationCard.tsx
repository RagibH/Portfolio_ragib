"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import MobileFullDetailsOverlay from "@/components/ui/MobileFullDetailsOverlay";
import type { PublicationData } from "./types";

type PublicationCardProps = {
  publication: PublicationData;
  className?: string;
};

export default function PublicationCard({
  publication,
  className,
}: PublicationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const href = publication.href ?? "#";
  const isExternal = href.startsWith("http");

  return (
    <>
      <article
        className={cn(
          "publication-card group h-full overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1A1614]",
          "transition-[border-color,transform] duration-[450ms] ease-out",
          "hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.14)]",
          className
        )}
      >
        <div className="publication-card__inner flex h-full flex-col">
          <div className="publication-card__meta-row">
            <span className="publication-card__status">{publication.status}</span>
            <span className="publication-card__year">{publication.year}</span>
          </div>

          <h3 className="publication-card__title">{publication.title}</h3>

          <p className="publication-card__authors">{publication.authors}</p>

          <div className="publication-card__details">
            <span>{publication.venue}</span>
            {publication.role ? (
              <>
                <span className="publication-card__sep" aria-hidden="true">
                  ·
                </span>
                <span>{publication.role}</span>
              </>
            ) : null}
          </div>

          <div className="mt-5 publication-card__abstract mobile-full-text-summary text-[#B8AA9C]">
            {publication.description}
          </div>

          <button
            type="button"
            className="read-full-text__toggle mobile-full-text-toggle"
            onClick={() => setIsOpen(true)}
          >
            Read full
          </button>

          <div className="publication-card__actions mt-auto pt-8">
            {isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-card__action"
              >
                Read Paper
              </a>
            ) : (
              <Link href={href} className="featured-card__action">
                Read More
              </Link>
            )}
            {publication.doi ? (
              <a
                href={publication.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-card__action publication-card__doi"
              >
                DOI
              </a>
            ) : null}
          </div>
        </div>
      </article>

      <MobileFullDetailsOverlay
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={publication.title}
        subtitle={publication.venue}
        status={publication.status}
        description={publication.description}
        pills={[]}
        actions={
          isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-card__action"
            >
              Read Paper
            </a>
          ) : (
            <Link href={href} className="featured-card__action">
              Read More
            </Link>
          )
        }
      />
    </>
  );
}
