import Link from "next/link";

const heroBackgroundImage =
  "https://qyshjizmljqzxdpobqfw.supabase.co/storage/v1/object/public/marketing-assets/hdz/hero/hdz-hero-stock1-2200.jpg";

const services = [
  { title: "Lawn Maintenance", blurb: "Routine cuts, edging, and cleanup to keep curb appeal sharp." },
  { title: "Hardscaping", blurb: "Built features that add structure, function, and long-term value." },
  { title: "Outdoor Lighting", blurb: "Highlight your property and improve night-time safety." },
  { title: "Top Soil", blurb: "Fresh grade-ready top soil for healthier lawn and landscape beds." },
  { title: "Sod", blurb: "Fast green-up with clean installation and post-install guidance." },
  { title: "Tree Service", blurb: "Trim, cleanup, and property-safe tree work." },
  { title: "Pavers", blurb: "Durable, clean paver installs for patios, walkways, and entries." },
  { title: "Retaining Walls", blurb: "Stabilize elevation and define your outdoor space." },
  { title: "Sidewalks", blurb: "Straight, safe concrete paths with clean finish work." },
  { title: "Driveways / Concrete", blurb: "Strong concrete flatwork built for everyday use." },
];

const featuredServices = ["Hardscaping", "Pavers", "Retaining Walls", "Outdoor Lighting"];

const steps = [
  {
    title: "Share your project",
    description: "Tell us the property address, services needed, timeline, and budget in our quick intake form.",
  },
  {
    title: "Get your plan",
    description: "HDZ reviews your details and photos, then we reach out with scope, recommendations, and next steps.",
  },
  {
    title: "Build with confidence",
    description: "We schedule your work, complete the job, and keep communication clear from start to finish.",
  },
];

const metrics = [
  { value: "1200+", label: "Projects Completed" },
  { value: "850+", label: "Happy Customers" },
  { value: "25+", label: "Years Combined Crew Experience" },
  { value: "15+", label: "Service Areas" },
];

export default function HdzLandingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="w-full pb-24 pt-0">
        <section
          className="overflow-hidden rounded-3xl border border-lime-400/30 bg-zinc-950 shadow-[0_35px_80px_-45px_rgba(16,185,129,0.6)]"
          style={{
            backgroundImage: `linear-gradient(102deg, rgba(0,0,0,0.82) 7%, rgba(0,0,0,0.5) 58%, rgba(0,0,0,0.2) 100%), url(${heroBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-lime-300">HDZ Hardscaping & Landscaping LLC</p>
              <h1 className="mt-3 max-w-xl text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Hardscaping & Landscaping
                <span className="block text-lime-400">Built Around Your Property</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-zinc-100/90 sm:text-lg">
                Lawn maintenance, pavers, retaining walls, outdoor lighting, sod, tree service, sidewalks, and concrete work
                for South Jersey homeowners.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/intake"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-lime-400 px-6 py-3 text-base font-extrabold text-black transition hover:bg-lime-300"
                >
                  Start Your Project
                </Link>
                <a
                  href="tel:+18563947978"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-orange-400 bg-black/35 px-6 py-3 text-base font-bold text-white transition hover:bg-black/55"
                >
                  Call 856-394-7978
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-lime-400/35 bg-[linear-gradient(160deg,rgba(15,80,30,0.86),rgba(8,30,14,0.92))] p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Top Requested Services</p>
              <div className="mt-3 space-y-3">
                {featuredServices.map((service) => (
                  <div key={service} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-sm font-black text-white">{service}</p>
                    <p className="mt-1 text-xs text-zinc-200">Custom installs tailored to your property layout.</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid gap-3 border-t border-lime-300/25 bg-[linear-gradient(100deg,#17b44d,#0d8e37)] px-6 py-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/15 bg-black/15 px-3 py-2">
                <p className="text-3xl font-black leading-none text-white">{metric.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-lime-100">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Services</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300">High-impact outdoor upgrades with contractor-grade execution and clear communication.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-lime-400/30 bg-[linear-gradient(170deg,rgba(16,24,18,0.95),rgba(8,12,9,0.98))] p-5 text-white"
              >
                <p className="text-base font-black text-lime-300">{service.title}</p>
                <p className="mt-2 text-sm text-zinc-300">{service.blurb}</p>
                <Link href="/intake" className="mt-3 inline-flex text-xs font-black uppercase tracking-[0.12em] text-orange-300 hover:text-orange-200">
                  Request Estimate
                </Link>
              </div>
            ))}
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
            <h2 className="text-2xl font-black text-white">Ready to Price Your Project?</h2>
            <p className="mt-2 text-sm text-zinc-300">Most homeowners finish intake in under 3 minutes. Add photos for a faster first estimate.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/intake"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-lime-400 px-5 text-sm font-extrabold text-black hover:bg-lime-300"
              >
                Start Your Project
              </Link>
              <a
                href="tel:+18563947978"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-orange-400 px-5 text-sm font-extrabold text-white hover:bg-zinc-900"
              >
                Call 856-394-7978
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white sm:text-3xl">Before & After</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Gallery Placeholder</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="flex min-h-48 items-center justify-center rounded-2xl border border-lime-400/20 bg-[linear-gradient(145deg,rgba(10,18,12,0.9),rgba(5,8,6,0.95))] text-sm font-bold text-zinc-300"
              >
                Before / After {slot}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-lime-400/40 bg-black/95 p-3 backdrop-blur sm:hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-2">
          <Link
            href="/intake"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-lime-300 bg-lime-400 px-4 text-sm font-black text-black"
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
