"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { ConfirmationExperience, type SubmissionSnapshot } from "@/app/intake/_components/confirmation-experience";
import { leadServiceOptions } from "@/lib/lead";

const timelineOptions = ["ASAP", "Within 30 days", "1-3 months", "Just planning"];
const budgetOptions = ["Under $2,500", "$2,500-$7,500", "$7,500-$15,000", "$15,000+"];

export default function IntakePage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submission, setSubmission] = useState<SubmissionSnapshot | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.set("tenantSlug", "hdz");
    const snapshot = {
      phone: String(formData.get("phone") ?? ""),
      propertyAddress: String(formData.get("propertyAddress") ?? ""),
      servicesRequested: formData.getAll("servicesRequested").map((value) => String(value)),
      timeline: String(formData.get("timeline") ?? ""),
      preferredContactMethod: String(formData.get("preferredContactMethod") ?? ""),
      photoCount: formData
        .getAll("photos")
        .filter((entry): entry is File => entry instanceof File && entry.size > 0).length,
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const json = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(json?.error ?? "Unable to submit your request right now.");
      setSubmitting(false);
      return;
    }

    const json = (await response.json().catch(() => null)) as { leadId?: string } | null;
    const leadId = json?.leadId ?? "request-pending-id";

    setSubmission({
      leadId,
      phone: snapshot.phone,
      propertyAddress: snapshot.propertyAddress,
      servicesRequested: snapshot.servicesRequested,
      timeline: snapshot.timeline,
      preferredContactMethod: snapshot.preferredContactMethod,
      photoCount: snapshot.photoCount,
    });
    setSubmitted(true);
    setSubmitting(false);
    event.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0f172a_0%,#101827_42%,#13212f_100%)] text-slate-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 pb-28 sm:px-6 sm:py-12">
        <Link href="/" className="text-sm font-semibold text-lime-300 hover:text-lime-200">
          ← Back to HDZ Landing
        </Link>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">HDZ Hardscaping & Landscaping LLC</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {submitted ? "Request Submitted" : "Start Your Project"}
          </h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Tell us about your property and project goals. We will follow up quickly with next steps.
          </p>
          <div className="mt-3 inline-flex rounded-full border border-lime-400/35 bg-slate-900/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-lime-200">
            3-Minute Intake
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-400/40 bg-red-950/30 p-4">
            <p className="text-sm font-semibold text-red-200">{error}</p>
          </div>
        ) : null}

        {submitted && submission ? <ConfirmationExperience submission={submission} /> : null}

        {!submitted ? (
          <div className="mt-6 rounded-2xl border border-orange-400/50 bg-slate-900/85 p-6 text-white shadow-[0_20px_55px_-35px_rgba(255,120,56,0.6)]">
            <form onSubmit={onSubmit} className="space-y-5">
            <div className="rounded-xl border border-slate-600 bg-slate-800/70 p-3 text-sm text-slate-200">
              Fill out the essentials now. We use this to prepare your estimate and schedule your follow-up.
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-slate-100">Full name *</span>
                <input name="name" required className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-slate-100">Phone *</span>
                <input name="phone" required className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-slate-100">Email</span>
                <input name="email" type="email" className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-slate-100">Preferred contact method *</span>
                <select name="preferredContactMethod" defaultValue="" required className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="phone">Phone Call</option>
                  <option value="text">Text Message</option>
                  <option value="email">Email</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-semibold text-slate-100">Property address *</span>
              <input name="propertyAddress" required className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400" />
            </label>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-slate-100">Services requested *</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {leadServiceOptions.map((service) => (
                  <label key={service} className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm text-slate-100">
                    <input type="checkbox" name="servicesRequested" value={service} className="h-4 w-4 accent-lime-400" />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-semibold text-slate-100">Project description *</span>
              <textarea name="projectDescription" rows={4} required className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400" />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-slate-100">Timeline *</span>
                <select name="timeline" defaultValue="" required className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400">
                  <option value="" disabled>
                    Select one
                  </option>
                  {timelineOptions.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-slate-100">Budget range *</span>
                <select name="budgetRange" defaultValue="" required className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400">
                  <option value="" disabled>
                    Select one
                  </option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-semibold text-slate-100">Project photos</span>
              <input name="photos" type="file" accept="image/*" multiple className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-slate-100 outline-none focus:border-lime-400" />
              <span className="text-xs text-slate-400">Optional. Upload up to 8 photos to help us estimate faster.</span>
            </label>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-orange-400 bg-lime-400 px-5 py-3 text-base font-extrabold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Project Request"}
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-500 bg-slate-900/70 px-4 text-sm font-semibold text-slate-100">
              Back to Landing
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSubmission(null);
                setError(null);
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-500/15 px-4 text-sm font-semibold text-emerald-100"
            >
              Submit Another Property
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
