"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectMediaItem } from "./types";

type ProjectShowcaseMediaProps = {
  items: ProjectMediaItem[];
  link?: string;
  label: string;
};

export default function ProjectShowcaseMedia({
  items,
  link,
  label,
}: ProjectShowcaseMediaProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isSlidable = items.length > 1;

  const pauseAllVideos = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
  }, []);

  useEffect(() => {
    pauseAllVideos();
  }, [activeIndex, pauseAllVideos]);

  const goTo = (index: number) => {
    if (!isSlidable) return;
    setActiveIndex(index);
  };

  const goNext = () => {
    if (!isSlidable) return;
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const goPrev = () => {
    if (!isSlidable) return;
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const renderMedia = (item: ProjectMediaItem, index: number) => {
    const isActive = activeIndex === index;

    if (item.type === "image") {
      return (
        <div
          className={`project-showcase-media__frame${
            isActive ? " project-showcase-media__frame--active" : ""
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt ?? label}
            width={item.width ?? 1200}
            height={item.height ?? 900}
            className="project-showcase-media__image"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>
      );
    }

    return (
      <div
        className={`project-showcase-media__frame${
          isActive ? " project-showcase-media__frame--active" : ""
        }`}
      >
        <video
          ref={(element) => {
            videoRefs.current[index] = element;
          }}
          className="project-showcase-media__video"
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    );
  };

  const mediaContent = (
    <div className="project-showcase-media">
      <div
        className="project-showcase-media__track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className={`project-showcase-media__slide${
              activeIndex === index ? " project-showcase-media__slide--active" : ""
            }`}
            style={
              item.type === "image" && item.backgroundColor
                ? { background: item.backgroundColor }
                : undefined
            }
          >
            {renderMedia(item, index)}
          </div>
        ))}
      </div>

      {isSlidable ? (
        <>
          <button
            type="button"
            className="project-showcase-media__nav project-showcase-media__nav--prev"
            onClick={goPrev}
            aria-label={`Previous ${label} media`}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="project-showcase-media__nav project-showcase-media__nav--next"
            onClick={goNext}
            aria-label={`Next ${label} media`}
          >
            <span aria-hidden="true">→</span>
          </button>
          <div className="project-showcase-media__dots" role="tablist" aria-label={`${label} media`}>
            {items.map((item, index) => (
              <button
                key={`${item.src}-dot-${index}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Show ${label} media ${index + 1}`}
                className={`project-showcase-media__dot${
                  activeIndex === index ? " project-showcase-media__dot--active" : ""
                }`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-showcase-media__link"
        aria-label={`Visit ${label} website`}
      >
        {mediaContent}
      </a>
    );
  }

  return mediaContent;
}
