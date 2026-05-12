import type { Metadata } from "next";
import Link from "next/link";

import { serviceAreaTowns, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Landscaping & Hardscaping Services | HDZ South Jersey",
  description:
    "Explore HDZ Hardscaping & Landscaping services in South Jersey including lawn maintenance, patios, retaining walls, tree service, concrete, fencing, leaf and snow removal.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "HDZ Services | South Jersey Landscaping & Hardscaping",
    description:
      "Detailed service list for South Jersey homeowners: lawn maintenance, hardscaping, tree work, concrete, fencing, and seasonal cleanup.",
    url: `${siteUrl}/services`,
  },
};

const services = [
  {
    name: "Lawn Maintenance",
    detail: "Weekly mowing, edging, cleanups, and overgrowth resets for residential properties.",
  },
  {
    name: "Hardscaping",
    detail: "Patios, pavers, walkways, and outdoor structures designed for daily use and long-term durability.",
  },
  {
    name: "Outdoor Living",
    detail: "Lighting, firepit, and outdoor kitchen builds planned for safety, layout, and utility access.",
  },
  {
    name: "Soil Analysis & Maintenance",
    detail: "Soil condition checks and correction plans for pH imbalance, patchy growth, and compaction issues.",
  },
  {
    name: "Tree Service",
    detail: "Pruning, removals, and storm-related cleanup near homes, fences, and access paths.",
  },
  {
    name: "Retaining Walls",
    detail: "Erosion control walls, grade stabilization, and replacement of failing wall systems.",
  },
  {
    name: "Driveway & Sidewalk Concrete",
    detail: "Concrete repairs and installs for safe, clean, and properly sloped flatwork surfaces.",
  },
  {
    name: "Fencing",
    detail: "Fence installation, repairs, and gate alignment for privacy, boundary, and access control.",
  },
  {
    name: "Leaf & Snow Removal",
    detail: "Seasonal property cleanup, driveway clearing, and walkway safety service through winter months.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">HDZ Services</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Landscaping & Hardscaping Services in South Jersey
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-zinc-300 sm:text-base">
          HDZ provides practical outdoor improvements for homeowners who want clean work, clear communication, and strong long-term value.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/intake"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-[linear-gradient(to_bottom_right,#9AE600,#85C700)] px-6 py-3 text-base font-extrabold text-black shadow-[0_12px_28px_-16px_rgba(163,230,53,0.9)] transition hover:brightness-105"
          >
            Get My Estimate Started
          </Link>
          <a
            href="tel:+18563947978"
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-orange-400 px-6 py-3 text-base font-bold text-white hover:bg-zinc-900"
          >
            Call 856-394-7978
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="rounded-2xl border-2 border-lime-400/40 bg-[linear-gradient(170deg,rgba(16,24,18,0.95),rgba(8,12,9,0.98))] py-5 pl-[1.875rem] pr-[1.5625rem]"
            >
              <h2 className="text-lg font-black text-lime-300">{service.name}</h2>
              <p className="mt-2 text-sm text-zinc-200">{service.detail}</p>
              <Link
                href="/intake"
                className="mt-4 inline-flex text-sm font-black uppercase tracking-[0.12em] text-orange-300 transition hover:text-lime-300"
              >
                Request Estimate
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950/80 p-5">
          <h2 className="text-lg font-black text-lime-300">Primary Service Area Towns</h2>
          <p className="mt-2 text-sm text-zinc-300">Coverage and scheduling are prioritized across these South Jersey markets:</p>
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
