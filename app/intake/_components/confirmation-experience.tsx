"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type SubmissionSnapshot = {
  leadId: string;
  propertyAddress: string;
  servicesRequested: string[];
  timeline: string;
  preferredContactMethod: string;
  phone: string;
  photoCount: number;
};

type ConfirmationExperienceProps = {
  submission: SubmissionSnapshot;
};

type TimelineStage = {
  label: string;
  detail: string;
  status: "complete" | "current" | "upcoming";
};

const timelineStages: TimelineStage[] = [
  { label: "Request Submitted", detail: "Your intake has been logged.", status: "complete" },
  { label: "Property Review", detail: "Your details are queued for team review.", status: "complete" },
  { label: "Quote Preparation", detail: "Scope and estimate package in progress.", status: "current" },
  { label: "Scheduling Coordination", detail: "Preferred timing and access alignment.", status: "upcoming" },
  { label: "First Service Visit", detail: "Your first approved visit is scheduled.", status: "upcoming" },
];

const accelerationActions = [
  {
    type: "upload_photos",
    title: "Upload Property Photos",
    body: "Add close-up images of problem areas so scope can be tightened faster.",
  },
  {
    type: "gate_instructions",
    title: "Add Gate Instructions",
    body: "Share access notes like side-gate entry, lock codes, or pet instructions.",
  },
  {
    type: "preferred_service_days",
    title: "Add Preferred Service Days",
    body: "Tell us your ideal day windows to speed scheduling coordination.",
  },
  {
    type: "problem_areas",
    title: "Describe Problem Zones",
    body: "Point out drainage, lawn, edging, or wall issues to prioritize first.",
  },
] as const;

type ActionType = (typeof accelerationActions)[number]["type"];

function weatherMessage() {
  const month = new Date().getMonth();

  if (month >= 2 && month <= 4) {
    return "Spring demand is high across South Jersey. Early intake requests are scheduled first.";
  }

  if (month >= 5 && month <= 8) {
    return "Summer storms can shift route timing. HDZ may adjust service windows based on field conditions.";
  }

  if (month >= 9 && month <= 10) {
    return "Fall leaf volume can affect route duration. Your schedule will be confirmed with seasonal buffers.";
  }

  return "Winter weather may shift outdoor timelines. HDZ will coordinate around safety and site conditions.";
}

function statusDot(status: TimelineStage["status"]) {
  if (status === "complete") {
    return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-black text-white">✓</span>;
  }

  if (status === "current") {
    return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-lime-300 bg-lime-400/15 text-[10px] font-black text-lime-200">●</span>;
  }

  return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-500 bg-slate-800/70 text-[11px] font-black text-slate-300">○</span>;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function ConfirmationExperience({ submission }: ConfirmationExperienceProps) {
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [textValue, setTextValue] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"success" | "error" | null>(null);
  const [saving, setSaving] = useState(false);
  const [smsPhone, setSmsPhone] = useState(submission.phone);
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [smsStatusUpdates, setSmsStatusUpdates] = useState(true);
  const [smsSaving, setSmsSaving] = useState(false);
  const [smsMessage, setSmsMessage] = useState<string | null>(null);
  const [smsTone, setSmsTone] = useState<"success" | "error" | null>(null);

  async function saveEnrichment(type: Exclude<ActionType, "upload_photos">) {
    if (!textValue.trim()) {
      setStatusTone("error");
      setStatusMessage("Add a few details before saving.");
      return;
    }

    setSaving(true);
    setStatusTone(null);
    setStatusMessage(null);

    const response = await fetch(`/api/leads/${submission.leadId}/enrichment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, value: textValue.trim() }),
    });

    const json = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setStatusTone("error");
      setStatusMessage(json?.error ?? "Unable to save your detail right now.");
      setSaving(false);
      return;
    }

    setStatusTone("success");
    setStatusMessage("Detail saved to your request.");
    setTextValue("");
    setSaving(false);
  }

  async function savePhotos(files: FileList | null) {
    if (!files || files.length === 0) {
      setStatusTone("error");
      setStatusMessage("Select at least one photo.");
      return;
    }

    setSaving(true);
    setStatusTone(null);
    setStatusMessage(null);

    const formData = new FormData();
    for (const file of Array.from(files).slice(0, 8)) {
      formData.append("photos", file);
    }

    const response = await fetch(`/api/leads/${submission.leadId}/photos`, {
      method: "POST",
      body: formData,
    });

    const json = (await response.json().catch(() => null)) as { error?: string; uploaded?: number } | null;

    if (!response.ok) {
      setStatusTone("error");
      setStatusMessage(json?.error ?? "Unable to upload photos right now.");
      setSaving(false);
      return;
    }

    setStatusTone("success");
    setStatusMessage(`${json?.uploaded ?? files.length} photo(s) added to your request.`);
    setSaving(false);
  }

  async function saveSmsPreferences() {
    if (!smsPhone.trim()) {
      setSmsTone("error");
      setSmsMessage("Add a phone number to enable SMS updates.");
      return;
    }

    if (smsStatusUpdates && !smsOptIn) {
      setSmsTone("error");
      setSmsMessage("Enable SMS opt-in to receive status updates.");
      return;
    }

    setSmsSaving(true);
    setSmsTone(null);
    setSmsMessage(null);

    const response = await fetch(`/api/leads/${submission.leadId}/sms-preferences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        smsOptIn,
        smsStatusUpdates,
        phone: smsPhone.trim(),
      }),
    });

    const json = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setSmsTone("error");
      setSmsMessage(json?.error ?? "Unable to save SMS preferences.");
      setSmsSaving(false);
      return;
    }

    setSmsTone("success");
    setSmsMessage("SMS confirmation preferences saved.");
    setSmsSaving(false);
  }

  return (
    <motion.section
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08 }}
      className="mt-6 space-y-4"
    >
      <motion.div variants={fadeInUp} className="rounded-2xl border border-emerald-300/30 bg-[linear-gradient(165deg,rgba(12,55,38,0.95),rgba(15,33,44,0.96))] p-5 shadow-[0_20px_55px_-38px_rgba(34,197,94,0.6)] sm:p-6">
        <div className="flex items-start gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/35 bg-emerald-500/20 text-emerald-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Confirmation</p>
            <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">Property Intake Complete</h2>
            <p className="mt-2 text-sm text-slate-200 sm:text-base">
              Your request has entered the HDZ operations queue. A team member will review your property details and follow up with clear next steps.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-600/50 bg-slate-900/85 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">Operations Timeline</h3>
            <span className="rounded-full border border-lime-300/30 bg-lime-400/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-lime-200">
              Active Queue
            </span>
          </div>

          <ol className="mt-4 space-y-3">
            {timelineStages.map((stage, index) => (
              <motion.li
                key={stage.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex gap-3"
              >
                <div className="flex flex-col items-center">
                  {statusDot(stage.status)}
                  {index < timelineStages.length - 1 ? <span className="mt-1 h-8 w-px bg-slate-600" /> : null}
                </div>
                <div className="pb-1">
                  <p className="text-sm font-semibold text-white">{stage.label}</p>
                  <p className="text-xs text-slate-300">{stage.detail}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-slate-600/60 bg-[linear-gradient(165deg,rgba(30,41,59,0.92),rgba(15,23,42,0.98))] p-5">
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">Property Snapshot</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-200">
            <p><span className="text-slate-400">Request ID:</span> {submission.leadId.slice(0, 8).toUpperCase()}</p>
            <p><span className="text-slate-400">Property:</span> {submission.propertyAddress}</p>
            <p><span className="text-slate-400">Timing:</span> {submission.timeline}</p>
            <p><span className="text-slate-400">Contact:</span> {submission.preferredContactMethod}</p>
            <p><span className="text-slate-400">Photos:</span> {submission.photoCount}</p>
          </div>
          <div className="mt-4 rounded-xl border border-slate-500/50 bg-slate-800/60 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">Requested Services</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {submission.servicesRequested.map((service) => (
                <span key={service} className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-100">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-600/60 bg-slate-900/80 p-5">
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">What Happens Next</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li className="rounded-lg border border-slate-600/50 bg-slate-800/50 px-3 py-2">Most requests are reviewed within 2 business hours.</li>
            <li className="rounded-lg border border-slate-600/50 bg-slate-800/50 px-3 py-2">A team member may verify access conditions before final quote prep.</li>
            <li className="rounded-lg border border-slate-600/50 bg-slate-800/50 px-3 py-2">Weather and route density can affect final scheduling windows.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-600/60 bg-slate-900/80 p-5">
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">Weather + Route Advisory</h3>
          <p className="mt-3 rounded-lg border border-slate-600/50 bg-slate-800/50 px-3 py-2 text-sm text-slate-200">
            {weatherMessage()}
          </p>
          <p className="mt-3 text-xs text-slate-400">Hook ready for dynamic weather and seasonal backlog logic.</p>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-600/60 bg-slate-900/80 p-5">
        <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">SMS Confirmation + Status Updates</h3>
        <p className="mt-2 text-sm text-slate-300">
          Opt in to receive a text confirmation now and optional progress updates as your request moves through review and scheduling.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-semibold text-slate-100">Mobile number</span>
            <input
              value={smsPhone}
              onChange={(event) => setSmsPhone(event.target.value)}
              placeholder="(856) 394-7978"
              className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-lime-300"
            />
          </label>

          <div className="space-y-2">
            <label className="flex items-start gap-2 rounded-lg border border-slate-600/50 bg-slate-800/50 px-3 py-2 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={smsOptIn}
                onChange={(event) => {
                  setSmsOptIn(event.target.checked);
                  if (!event.target.checked) setSmsStatusUpdates(false);
                }}
                className="mt-0.5 h-4 w-4 accent-emerald-400"
              />
              <span>Send SMS confirmation for this intake request.</span>
            </label>
            <label className="flex items-start gap-2 rounded-lg border border-slate-600/50 bg-slate-800/50 px-3 py-2 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={smsStatusUpdates}
                onChange={(event) => setSmsStatusUpdates(event.target.checked)}
                disabled={!smsOptIn}
                className="mt-0.5 h-4 w-4 accent-emerald-400 disabled:opacity-50"
              />
              <span>Send status updates (review, quote ready, scheduling).</span>
            </label>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            disabled={smsSaving}
            onClick={() => void saveSmsPreferences()}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-emerald-300/35 bg-emerald-500/20 px-4 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30 disabled:opacity-60"
          >
            {smsSaving ? "Saving..." : "Save SMS Preferences"}
          </button>
          <p className="text-xs text-slate-400">Message/data rates may apply. You can opt out anytime.</p>
        </div>

        {smsMessage ? (
          <p className={`mt-3 text-xs ${smsTone === "error" ? "text-red-300" : "text-emerald-200"}`}>{smsMessage}</p>
        ) : null}
      </motion.div>

      <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-600/60 bg-slate-900/80 p-5">
        <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">Optional Acceleration Actions</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {accelerationActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => {
                setActiveAction(action.type);
                setStatusMessage(null);
                setStatusTone(null);
                setTextValue("");
              }}
              className="group rounded-xl border border-slate-600/60 bg-slate-800/60 p-3 text-left transition hover:border-emerald-300/40 hover:bg-slate-800"
            >
              <p className="text-sm font-semibold text-white group-hover:text-emerald-100">{action.title}</p>
              <p className="mt-1 text-xs text-slate-300">{action.body}</p>
            </button>
          ))}
        </div>

        {activeAction ? (
          <div className="mt-4 rounded-xl border border-slate-600/60 bg-slate-800/60 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
              {activeAction === "upload_photos" ? "Upload Follow-Up Photos" : "Append Request Detail"}
            </p>

            {activeAction === "upload_photos" ? (
              <div className="mt-3 space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => void savePhotos(event.target.files)}
                  className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                />
                <p className="text-xs text-slate-400">Up to 8 images. Added directly to your submitted request.</p>
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <textarea
                  rows={3}
                  value={textValue}
                  onChange={(event) => setTextValue(event.target.value)}
                  placeholder={
                    activeAction === "gate_instructions"
                      ? "Example: Side gate on left, code 2741, please latch after exit."
                      : activeAction === "preferred_service_days"
                        ? "Example: Tuesdays or Thursdays after 10am are best."
                        : "Example: Back right corner has pooling water and thin turf near drain line."
                  }
                  className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-lime-300"
                />
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void saveEnrichment(activeAction)}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-emerald-300/35 bg-emerald-500/20 px-4 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save to Request"}
                </button>
              </div>
            )}

            {statusMessage ? (
              <p className={`mt-3 text-xs ${statusTone === "error" ? "text-red-300" : "text-emerald-200"}`}>{statusMessage}</p>
            ) : null}
          </div>
        ) : null}
      </motion.div>

      <motion.div variants={fadeInUp} className="rounded-2xl border border-lime-300/30 bg-[linear-gradient(165deg,rgba(39,66,46,0.9),rgba(30,41,59,0.92))] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-200">Local Trust Signal</p>
        <p className="mt-2 text-sm text-slate-100">
          Serving properties across South Jersey. Nearby homeowners most commonly request lawn maintenance, pavers, retaining walls, and lighting upgrades.
        </p>
      </motion.div>
    </motion.section>
  );
}

export type { SubmissionSnapshot };
