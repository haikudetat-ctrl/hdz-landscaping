import { googleReviewUrl } from "@/lib/seo";

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" fill="#FBBC05" className="inline-block h-3.5 w-3.5">
          <path d="M12 2.5l2.9 6.06 6.6.9-4.8 4.62 1.18 6.6L12 17.6l-5.88 3.08L7.3 14.08 2.5 9.46l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

type GoogleReviewCtaProps = {
  /**
   * `bar` renders a slim strip that scrolls away with the page.
   * `floating` pins a pill to the viewport so it follows the reader.
   */
  variant?: "bar" | "floating";
};

export function GoogleReviewCta({ variant = "bar" }: GoogleReviewCtaProps) {
  const analytics = {
    "data-analytics-event": "review_click",
    "data-analytics-label": `google_review_${variant}`,
  };

  if (variant === "floating") {
    return (
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 text-white sm:left-auto sm:right-5 sm:translate-x-0">
        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...analytics}
          className="flex items-center gap-2.5 rounded-full border border-lime-300/70 bg-black/90 px-4 py-2.5 text-sm font-bold shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur transition hover:border-lime-300 hover:bg-black sm:px-5"
        >
          <GoogleGlyph className="h-5 w-5 shrink-0" />
          <span className="whitespace-nowrap">
            Leave us a <span className="text-lime-300">Review</span>
          </span>
          <Stars className="hidden shrink-0 gap-0.5 sm:inline-flex" />
        </a>
      </div>
    );
  }

  return (
    <div className="w-full border-b border-lime-400/25 bg-[linear-gradient(90deg,#0a0a0a_0%,#101a06_50%,#0a0a0a_100%)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4 py-2.5 text-center text-white">
        <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-zinc-300 sm:inline">
          Happy with our work?
        </span>
        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...analytics}
          className="group inline-flex items-center gap-2 rounded-full border border-lime-300/60 bg-black/50 px-4 py-1.5 text-sm font-extrabold transition hover:border-lime-300 hover:bg-black/80"
        >
          <GoogleGlyph className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">Leave us a </span>
            <span className="text-lime-300">Review on Google</span>
          </span>
          <span aria-hidden className="text-lime-300 transition group-hover:translate-x-0.5">
            &rarr;
          </span>
        </a>
        <Stars className="hidden shrink-0 gap-0.5 sm:inline-flex" />
      </div>
    </div>
  );
}
