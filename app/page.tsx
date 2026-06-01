import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { BeforeAfterSlider } from "@/app/_components/before-after-slider";
import { canonicalSiteUrl, serviceAreaTowns } from "@/lib/seo";

const heroBackgroundImage =
  "https://qyshjizmljqzxdpobqfw.supabase.co/storage/v1/object/public/marketing-assets/hdz/hero/hdz-hero-stock1-2200.jpg";

const services = [
  { title: "Lawn Maintenance", blurb: "From weekly cuts to overgrown resets, drainage-prone yards, and cleanup for vacant or rental properties." },
  { title: "Hardscaping", blurb: "Patios, pavers, and grade-sensitive installs for slopes, tight access areas, and high-traffic family spaces." },
  { title: "Outdoor Living", blurb: "Lighting, firepits, and outdoor kitchens planned for safety, utility lines, and all-season use." },
  { title: "Soil Analysis & Maintenance", blurb: "Compaction, pH imbalance, patchy growth, and nutrient correction plans for difficult lawns and beds." },
  { title: "Tree Service", blurb: "Storm-damaged limbs, risky overhangs, deadwood, and targeted removals near homes, fences, and power paths." },
  { title: "Retaining Walls", blurb: "Wall rebuilds and new installs for erosion control, failed walls, pooling water, and uneven grade transitions." },
  { title: "Driveway", blurb: "Concrete driveway repairs and replacements for cracking, settling, edge failure, and water runoff issues." },
  { title: "Sidewalks", blurb: "Trip-hazard fixes, panel replacement, root-lift correction, and code-conscious path upgrades." },
  { title: "Fencing", blurb: "New fence lines, storm repairs, gate access fixes, and property boundary installs with clean finish work." },
  { title: "Leaf Removal", blurb: "Seasonal cleanouts for heavy tree coverage, clogged drains, and properties that need curb-ready turnaround." },
  { title: "Snow Removal", blurb: "Driveway and walkway clearing, de-icing support, and priority service for early departures or limited mobility access." },
  { title: "Christmas Light Setup and Removal", blurb: "Seasonal install, maintenance, and takedown for rooflines, trees, and entry features with clean post-holiday removal." },
];

const serviceCardBackgrounds: Record<string, { image: string; position: string }> = {
  "Lawn Maintenance": { image: "/logos/LOAM_Lawn1.jpg", position: "center" },
  Hardscaping: { image: "/logos/LOAM_Patio.jpg", position: "center" },
  "Outdoor Living": { image: "/logos/LOAM_OutdoorLiving.jpg", position: "center" },
  "Soil Analysis & Maintenance": { image: "/logos/LOAM_SoilAnalysis.jpg", position: "center" },
  "Tree Service": { image: "/logos/LOAM_TreeRemoval.jpg", position: "center" },
  "Retaining Walls": { image: "/logos/LOAM_RetainingWall.jpg", position: "center" },
  Driveway: { image: "/logos/LOAM_Driveway.jpg", position: "center" },
  Sidewalks: { image: "/logos/LOAM_Sidewalk.jpg", position: "center" },
  Fencing: { image: "/logos/LOAM_WhiteFence.jpg", position: "center" },
  "Leaf Removal": { image: "/logos/LOAM_LeafRemoval.jpg", position: "center" },
  "Snow Removal": { image: "/logos/LOAM_SnowRemoval.jpg", position: "center" },
  "Christmas Light Setup and Removal": { image: "/logos/LOAM_Christmas.jpg", position: "center" },
};

const featuredServices = [
  {
    title: "Hardscaping",
    blurb: "Built around your property layout, usage, and long-term upkeep.",
  },
  {
    title: "Mowing & Maintenance",
    blurb: "From weekly cuts to overgrown resets, drainage-prone yards, and cleanup for vacant or rental properties.",
  },
  {
    title: "Retaining Walls",
    blurb: "Built around your property layout, usage, and long-term upkeep.",
  },
  {
    title: "Outdoor Living",
    blurb: "Built around your property layout, usage, and long-term upkeep.",
  },
];

const steps = [
  {
    title: "Tell us what you need",
    description: "Choose services, share your address, and add project photos in a quick intake form.",
  },
  {
    title: "Get a clear next step",
    description: "HDZ reviews your request and reaches out with practical recommendations and estimate details.",
  },
  {
    title: "Schedule and get it done",
    description: "Approve the plan, lock in scheduling, and get clean, professional work completed on your property.",
  },
];

const metrics = [
  { value: "1200+", label: "Completed Projects" },
  { value: "850+", label: "Satisfied Homeowners" },
  { value: "25+", label: "Years of Crew Experience" },
  { value: "Fast Response", label: "Local South Jersey Dispatch" },
];

const outcomes = [
  "Clear scope before work starts",
  "Reliable communication from estimate to completion",
  "Great work at an affordable price",
  "A cleaner, sharper property that stays maintained",
];

export const metadata: Metadata = {
  title: "South Jersey Landscaping & Hardscaping | Free Estimates",
  description:
    "HDZ Hardscaping & Landscaping LLC provides lawn maintenance, hardscaping, retaining walls, concrete, tree service, and seasonal property services across South Jersey.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "South Jersey landscaping",
    "South Jersey hardscaping",
    "lawn maintenance South Jersey",
    "retaining walls South Jersey",
    "driveway concrete contractor South Jersey",
    "tree service South Jersey",
  ],
  openGraph: {
    title: "South Jersey Landscaping & Hardscaping | HDZ",
    description:
      "Lawn care, patios, retaining walls, concrete, tree work, and seasonal cleanup with free estimate intake.",
    url: canonicalSiteUrl,
  },
};

export default function HdzLandingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="w-full pb-24 pt-0">
        <section
          className="overflow-hidden rounded-3xl bg-zinc-950 shadow-[0_35px_80px_-45px_rgba(16,185,129,0.6)]"
          style={{
            backgroundImage: `linear-gradient(102deg, rgba(0,0,0,0.82) 7%, rgba(0,0,0,0.5) 58%, rgba(0,0,0,0.2) 100%), url(${heroBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <Image
                src="/logos/HDZ_White_FullLogo.svg"
                alt="HDZ Hardscaping & Landscaping"
                width={520}
                height={96}
                className="h-auto w-[340px] sm:w-[440px] lg:w-[520px]"
                priority
              />
              <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-200">
                <Link href="/services" className="hover:text-lime-300">
                  Services
                </Link>
                <Link href="/about" className="hover:text-lime-300">
                  About
                </Link>
                <Link href="/contact" className="hover:text-lime-300">
                  Contact
                </Link>
              </nav>
              <h1 className="mt-3 max-w-xl text-4xl font-black leading-[1.045] tracking-tight text-lime-400 sm:text-5xl lg:text-6xl">
                <span className="bg-[linear-gradient(to_bottom_right,#9AE600,#85C700)] bg-clip-text text-transparent">
                  Hardscaping & Landscaping
                </span>
                <span className="mt-1 block whitespace-nowrap text-[0.75em] font-black leading-[1.05] tracking-tight text-white">
                  Built Around Your Budget
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-zinc-100/90 sm:text-lg">
                HDZ helps South Jersey homeowners plan, price, and complete landscaping and hardscaping work without the usual contractor guesswork.
              </p>
              <p className="mt-3 max-w-2xl text-sm font-semibold text-zinc-200 sm:text-base">
                Lawn maintenance, pavers, retaining walls, outdoor lighting, sod, tree service, sidewalks, and concrete work.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/intake"
                  data-analytics-event="cta_click"
                  data-analytics-label="hero_get_my_estimate_started"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-[linear-gradient(to_bottom_right,#9AE600,#85C700)] px-6 py-3 text-base font-extrabold text-black shadow-[0_12px_28px_-16px_rgba(163,230,53,0.9)] transition hover:brightness-105"
                >
                  Get My Estimate Started
                </Link>
                <a
                  href="tel:+18563947978"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-orange-400 bg-black/35 px-6 py-3 text-base font-bold text-white transition hover:bg-black/55"
                >
                  Call HDZ: 856-394-7978
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-lime-400/35 bg-[linear-gradient(160deg,rgba(15,80,30,0.1),rgba(8,30,14,0.1))] p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Top Requested Services</p>
              <div className="mt-3 space-y-3">
                {featuredServices.map((service) => (
                  <div key={service.title} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-sm font-black text-white">{service.title}</p>
                    <p className="mt-1 text-xs text-zinc-200">{service.blurb}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid gap-3 border-t border-lime-400/35 bg-[linear-gradient(160deg,rgba(15,80,30,0.86),rgba(8,30,14,0.92))] px-6 py-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <p className="text-3xl font-black leading-none text-white">{metric.value}</p>
                <p className="mt-1 text-xs font-semibold text-zinc-200">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Call for FREE Estimate:{" "}
            <a href="tel:+18563947978" className="text-lime-300 hover:text-lime-200">
              856-394-7978
            </a>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300">Scroll, choose your service, and tap Request Estimate to start your intake in minutes.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const background = serviceCardBackgrounds[service.title];
              return (
              <div
                key={service.title}
                className="relative overflow-hidden rounded-2xl border-2 border-lime-400/40 py-5 pl-[1.875rem] pr-[1.5625rem] text-white"
                style={
                  background
                    ? {
                        backgroundImage:
                          `linear-gradient(160deg, rgba(0,0,0,0.72) 10%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.75) 100%), url('${background.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: background.position,
                      }
                    : {
                        backgroundImage: "linear-gradient(170deg,rgba(16,24,18,0.95),rgba(8,12,9,0.98))",
                      }
                }
              >
                <p className="relative z-10 text-base font-black text-lime-300">{service.title}</p>
                <p className="relative z-10 mt-2 text-sm text-zinc-200">{service.blurb}</p>
                <Link
                  href="/intake"
                  data-analytics-event="cta_click"
                  data-analytics-label={`service_card_${service.title.toLowerCase().replace(/\s+/g, "_")}`}
                  className="relative z-10 mt-3 inline-flex text-sm font-black uppercase tracking-[0.12em] text-orange-300 transition hover:text-lime-300"
                >
                  Request Estimate
                </Link>
              </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-6 px-4 sm:px-6">
          <div className="rounded-2xl border border-lime-400/30 bg-[linear-gradient(160deg,rgba(15,80,30,0.86),rgba(8,30,14,0.92))] p-6">
            <h2 className="text-2xl font-black text-white">What You Get With HDZ</h2>
            <div className="mt-4 space-y-2">
              {outcomes.map((outcome) => (
                <p key={outcome} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-zinc-100">
                  {outcome}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-lime-400/30 bg-zinc-950/95 p-6">
            <h2 className="text-2xl font-black text-white">How It Works</h2>
            <div className="mt-4 space-y-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-400/50 bg-[linear-gradient(160deg,rgba(20,20,20,0.96),rgba(8,8,8,0.98))] p-6">
            <h2 className="text-2xl font-black text-white">Ready to See a Real Plan for Your Yard?</h2>
            <p className="mt-2 text-sm text-zinc-300">Most homeowners finish intake in under 3 minutes. Add photos to get a faster, more accurate response.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/intake"
                data-analytics-event="cta_click"
                data-analytics-label="midpage_start_my_intake"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-lime-400 px-5 text-sm font-extrabold text-black hover:bg-lime-300"
              >
                Start My Intake
              </Link>
              <a
                href="tel:+18563947978"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-orange-400 px-5 text-sm font-extrabold text-white hover:bg-zinc-900"
              >
                Speak With HDZ
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 px-4 sm:px-6">
          <div className="rounded-2xl border border-lime-400/30 bg-zinc-950/90 p-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">South Jersey Service Area Coverage</h2>
            <p className="mt-2 max-w-3xl text-sm text-zinc-300">
              HDZ supports homeowners across Camden, Burlington, and Gloucester County with routing based on active project demand and seasonal scheduling.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {serviceAreaTowns.map((town) => (
                <span key={town} className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-semibold text-zinc-100">
                  {town}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white sm:text-3xl">Before & After</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Drag to Compare</span>
          </div>
          <div className="mt-4">
            <BeforeAfterSlider beforeSrc="/images/before1.jpg" afterSrc="/images/after1.jpg" alt="Front yard transformation" />
          </div>
        </section>

        <section className="mt-10 px-4 sm:px-6">
          <div className="rounded-2xl border border-orange-400/50 bg-[linear-gradient(160deg,rgba(20,20,20,0.96),rgba(8,8,8,0.98))] p-6 text-center sm:p-8">
            <p className="text-base font-bold uppercase tracking-[0.22em] text-lime-300">Final Step</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Get Your Project Moving</h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs text-zinc-300 sm:text-sm">
              Tell us what you want done, where the property is, and how to reach you. We will follow up with clear next steps.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/intake"
                data-analytics-event="cta_click"
                data-analytics-label="final_step_get_my_estimate_started"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-[linear-gradient(to_bottom_right,#9AE600,#85C700)] px-6 py-3 text-base font-extrabold text-black shadow-[0_12px_28px_-16px_rgba(163,230,53,0.9)] transition hover:brightness-105"
              >
                Get My Estimate Started
              </Link>
              <a
                href="tel:+18563947978"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-orange-400 bg-black/35 px-6 py-3 text-base font-bold text-white transition hover:bg-black/55"
              >
                Call HDZ: 856-394-7978
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-lime-400/40 bg-black/95 p-3 backdrop-blur sm:hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-2">
          <Link
            href="/intake"
            data-analytics-event="cta_click"
            data-analytics-label="mobile_sticky_start_your_project"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-lime-300 bg-[linear-gradient(to_bottom_right,#9AE600,#85C700)] px-4 text-sm font-black text-black"
          >
            Start Your Project
          </Link>
          <a
            href="tel:+18563947978"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-orange-400 px-4 text-sm font-black text-white"
          >
            Call Now
          </a>
        </div>
      </div>
    </main>
  );
}
