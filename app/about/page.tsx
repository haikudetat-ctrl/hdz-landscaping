import type { Metadata } from "next";
import Link from "next/link";

import { canonicalSiteUrl, serviceAreaTowns } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About HDZ Hardscaping & Landscaping | South Jersey",
  description:
    "Learn about HDZ Hardscaping & Landscaping LLC, a South Jersey contractor focused on dependable landscaping, hardscaping, and property care.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About HDZ Hardscaping & Landscaping",
    description: "Local South Jersey contractor focused on reliable communication, clean execution, and practical project planning.",
    url: `${canonicalSiteUrl}/about`,
  },
};

const principles = [
  "Clear scope before work starts",
  "Dependable communication from estimate through completion",
  "Great work at an affordable price",
  "Respect for your property, schedule, and budget",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">About HDZ</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Built for Homeowners Who Want Real Follow-Through</h1>
        <p className="mt-4 max-w-3xl text-sm text-zinc-300 sm:text-base">
          HDZ Hardscaping & Landscaping LLC serves South Jersey homeowners with practical planning, clean execution, and reliable project follow-up.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-zinc-950/90 p-6">
          <h2 className="text-2xl font-black text-white">How We Operate</h2>
          <p className="mt-3 text-sm text-zinc-300">
            We run projects through a clear intake and dispatch process so you know what happens next, who is responsible, and how your work is prioritized.
          </p>
          <div className="mt-4 space-y-2">
            {principles.map((principle) => (
              <p key={principle} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-100">
                {principle}
              </p>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-lime-400/30 bg-[linear-gradient(160deg,rgba(15,80,30,0.86),rgba(8,30,14,0.92))] p-6">
          <h2 className="text-2xl font-black text-white">Service Area Focus</h2>
          <p className="mt-3 text-sm text-zinc-100">
            We focus on South Jersey properties needing lawn maintenance, hardscaping, retaining walls, tree service, concrete work, and seasonal upkeep.
          </p>
          <p className="mt-3 text-sm text-zinc-100">
            If you are comparing options, we recommend starting intake with project details and photos so we can provide the most useful next step.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {serviceAreaTowns.map((town) => (
              <span key={town} className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-semibold text-zinc-100">
                {town}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/intake"
              data-analytics-event="cta_click"
              data-analytics-label="about_page_start_my_intake"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-[linear-gradient(to_bottom_right,#9AE600,#85C700)] px-6 py-3 text-base font-extrabold text-black shadow-[0_12px_28px_-16px_rgba(163,230,53,0.9)] transition hover:brightness-105"
            >
              Start My Intake
            </Link>
            <a
              href="tel:+18563947978"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-orange-400 px-6 py-3 text-base font-bold text-white hover:bg-black/20"
            >
              Call 856-394-7978
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
