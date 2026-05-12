"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function AnalyticsEventBridge() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const clickable = target.closest<HTMLElement>("a,button");
      if (!clickable) {
        return;
      }

      const analyticsEvent = clickable.dataset.analyticsEvent;
      if (analyticsEvent) {
        trackEvent(analyticsEvent, {
          location: window.location.pathname,
          label: clickable.dataset.analyticsLabel ?? clickable.textContent?.trim() ?? undefined,
        });
      }

      if (clickable instanceof HTMLAnchorElement) {
        const href = clickable.getAttribute("href") ?? "";
        if (href.startsWith("tel:")) {
          trackEvent("phone_click", {
            location: window.location.pathname,
            href,
          });
        }

        if (href.startsWith("mailto:")) {
          trackEvent("email_click", {
            location: window.location.pathname,
            href,
          });
        }
      }
    }

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
}

