"use client";

import Image from "next/image";
import { useId, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
};

export function BeforeAfterSlider({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const sliderId = useId();

  return (
    <figure className="rounded-2xl border border-lime-400/25 bg-[linear-gradient(145deg,rgba(10,18,12,0.9),rgba(5,8,6,0.95))] p-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={afterSrc}
          alt={`${alt} after`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="absolute inset-0 z-0 object-cover"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={`${alt} before`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `calc(${position}% - 1px)` }}>
          <div className="h-full w-0.5 bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.35)]" />
        </div>
      </div>

      <div className="mt-3">
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="h-1.5 w-full cursor-ew-resize appearance-none rounded-full bg-zinc-700 accent-lime-300"
          aria-label="Before and after image slider"
        />
      </div>
    </figure>
  );
}
