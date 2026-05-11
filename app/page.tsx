import Link from "next/link";
import Image from "next/image";

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
  { value: "15+", label: "South Jersey Service Areas" },
];

const painPoints = [
  "Too many contractors are hard to reach after the first call.",
  "Vague estimates make it difficult to budget with confidence.",
  "Inconsistent crews leave properties looking unfinished.",
];

const outcomes = [
  "Clear scope before work starts",
  "Reliable communication from estimate to completion",
  "A cleaner, sharper property that stays maintained",
];

const faqs = [
  {
    question: "How fast will someone get back to me?",
    answer: "Most requests are reviewed quickly. Sharing photos and clear details helps HDZ respond faster with useful next steps.",
  },
  {
    question: "Can I request more than one service at once?",
    answer: "Yes. You can select multiple services in one intake and HDZ will help prioritize the work based on your goals.",
  },
  {
    question: "Do I need to be home for an initial estimate?",
    answer: "Not always. Include access notes and photos in your intake so the team can evaluate your project efficiently.",
  },
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
              <Image
                src="/logos/HDZ_White_FullLogo.svg"
                alt="HDZ Hardscaping & Landscaping"
                width={260}
                height={48}
                className="h-auto w-[170px] sm:w-[220px] lg:w-[260px]"
                priority
              />
              <h1 className="mt-3 max-w-xl text-4xl font-black leading-[1.045] tracking-tight text-lime-400 sm:text-5xl lg:text-6xl">
                Hardscaping & Landscaping
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
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-lime-400 px-6 py-3 text-base font-extrabold text-black transition hover:bg-lime-300"
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
                  <div key={service} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-sm font-black text-white">{service}</p>
                    <p className="mt-1 text-xs text-zinc-200">Built around your property layout, usage, and long-term upkeep.</p>
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
          <h2 className="text-2xl font-black text-white sm:text-3xl">Services Homeowners Ask For Most</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300">Practical, high-visibility improvements that make your property easier to maintain and better to live in.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative overflow-hidden rounded-2xl border border-lime-400/30 p-5 text-white"
                style={
                  service.title === "Tree Service"
                    ? {
                        backgroundImage:
                          "linear-gradient(160deg, rgba(0,0,0,0.72) 10%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.75) 100%), url('/logos/LOAM_TreeRemoval.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
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
                  className="relative z-10 mt-3 inline-flex text-xs font-black uppercase tracking-[0.12em] text-orange-300 hover:text-orange-200"
                >
                  Request Estimate
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/95 p-6">
            <h2 className="text-2xl font-black text-white">Why Homeowners Reach Out</h2>
            <div className="mt-4 space-y-2">
              {painPoints.map((pain) => (
                <p key={pain} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-200">
                  {pain}
                </p>
              ))}
            </div>
          </div>
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

        <section className="mt-10 px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Common Questions</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-zinc-950/90 p-4">
                <h3 className="text-sm font-black text-lime-300">{faq.question}</h3>
                <p className="mt-2 text-sm text-zinc-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 px-4 sm:px-6">
          <div className="rounded-2xl border border-orange-400/50 bg-[linear-gradient(160deg,rgba(20,20,20,0.96),rgba(8,8,8,0.98))] p-6 text-center sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-300">Final Step</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Get Your Project Moving</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-300 sm:text-base">
              Tell us what you want done, where the property is, and how to reach you. We will follow up with clear next steps.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/intake"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-lime-300 bg-lime-400 px-6 py-3 text-base font-extrabold text-black transition hover:bg-lime-300"
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
