import type { Metadata } from "next";
import Link from "next/link";

import { serviceAreaTowns, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact HDZ Hardscaping & Landscaping | Free Estimate",
  description:
    "Contact HDZ Hardscaping & Landscaping LLC for landscaping and hardscaping estimates in South Jersey. Call 856-394-7978 or submit intake online.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact HDZ | South Jersey Landscaping & Hardscaping",
    description: "Call 856-394-7978 or submit intake online for South Jersey landscaping and hardscaping estimates.",
    url: `${siteUrl}/contact`,
  },
};

const contactOptions = [
  {
    label: "Call",
    value: "856-394-7978",
    href: "tel:+18563947978",
    detail: "Best for immediate project questions and scheduling.",
  },
  {
    label: "Online Intake",
    value: "Start Your Project",
    href: "/intake",
    detail: "Best for detailed requests with services, timeline, and photos.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">Contact HDZ</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Call for a Free Estimate</h1>
        <p className="mt-4 max-w-3xl text-sm text-zinc-300 sm:text-base">
          Tell us what you need, where the property is located, and your preferred timing. We will respond with clear next steps.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-14 sm:px-6 lg:grid-cols-2">
        {contactOptions.map((option) => (
          <article
            key={option.label}
            className="rounded-2xl border-2 border-lime-400/40 bg-[linear-gradient(170deg,rgba(16,24,18,0.95),rgba(8,12,9,0.98))] py-5 pl-[1.875rem] pr-[1.5625rem]"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">{option.label}</p>
            <p className="mt-2 text-2xl font-black text-white">{option.value}</p>
            <p className="mt-2 text-sm text-zinc-200">{option.detail}</p>
            <Link
              href={option.href}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-lime-300 bg-[linear-gradient(to_bottom_right,#9AE600,#85C700)] px-5 text-sm font-extrabold text-black shadow-[0_12px_28px_-16px_rgba(163,230,53,0.9)] transition hover:brightness-105"
            >
              {option.label === "Call" ? "Call Now" : "Open Intake"}
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5">
          <h2 className="text-lg font-black text-lime-300">Current South Jersey Coverage</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {serviceAreaTowns.map((town) => (
              <span key={town} className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-semibold text-zinc-100">
                {town}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
