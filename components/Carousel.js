"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "./Photo";

export default function Carousel({ items, label = "Carousel" }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index];
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const childCenter = child.offsetLeft - track.offsetLeft + child.clientWidth / 2;
      const d = Math.abs(childCenter - center);
      if (d < distance) {
        distance = d;
        closest = i;
      }
    });
    setActive(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    };
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const track = trackRef.current;
    if (!track || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - dx;
  };

  const onPointerUp = (e) => {
    const track = trackRef.current;
    drag.current.down = false;
    if (track && track.hasPointerCapture?.(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(Math.min(active + 1, items.length - 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(Math.max(active - 1, 0));
    }
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, i) => (
          <article
            key={item.title + i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="w-[86%] shrink-0 snap-center overflow-hidden rounded-sm border border-navy/15 bg-white/70 shadow-plate sm:w-[62%] lg:w-[38%]"
          >
            <Photo
              src={item.image}
              alt=""
              seed={i + 1}
              className="h-40 w-full"
            />
            <div className="p-7">
            {item.kicker && (
              <p className="font-display text-sm italic text-brass-deep">
                {item.kicker}
              </p>
            )}
            <h3 className="mt-2 font-display text-2xl text-navy">{item.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-navy/75">
              {item.body}
            </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(active - 1, 0))}
            disabled={active === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/25 text-navy transition-opacity disabled:opacity-30"
          >
            <span className="sr-only">Previous</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(active + 1, items.length - 1))}
            disabled={active === items.length - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/25 text-navy transition-opacity disabled:opacity-30"
          >
            <span className="sr-only">Next</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 gap-1.5">
          {items.map((item, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => scrollToIndex(i)}
              className="group flex-1 py-2"
            >
              <span className="sr-only">Go to slide {i + 1}</span>
              <span
                className={`block h-[2px] transition-colors ${
                  i === active ? "bg-brass" : "bg-navy/15 group-hover:bg-navy/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
