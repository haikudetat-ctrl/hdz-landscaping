import { NextResponse } from "next/server";
import { z } from "zod";

import { getSupabaseServiceClient } from "@/lib/supabase";

const smsPreferencesSchema = z.object({
  smsOptIn: z.boolean(),
  smsStatusUpdates: z.boolean(),
  phone: z.string().trim().min(7).max(50),
});

export async function POST(
  request: Request,
  context: { params: Promise<{ leadId: string }> },
) {
  try {
    const { leadId } = await context.params;
    const raw = (await request.json()) as unknown;
    const parsed = smsPreferencesSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid SMS preferences payload." },
        { status: 400 },
      );
    }

    if (parsed.data.smsStatusUpdates && !parsed.data.smsOptIn) {
      return NextResponse.json(
        { error: "SMS status updates require SMS opt-in consent." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServiceClient();

    const leadCheck = await supabase.from("leads").select("id").eq("id", leadId).maybeSingle();
    if (leadCheck.error || !leadCheck.data) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    const now = new Date().toISOString();

    const upsert = await supabase.from("lead_contact_preferences").upsert(
      {
        lead_id: leadId,
        sms_opt_in: parsed.data.smsOptIn,
        sms_status_updates: parsed.data.smsStatusUpdates,
        phone: parsed.data.phone,
        consent_text:
          "I agree to receive SMS confirmations and optional project status updates from HDZ. Message/data rates may apply.",
        consented_at: parsed.data.smsOptIn ? now : null,
        updated_at: now,
      },
      { onConflict: "lead_id" },
    );

    if (upsert.error) {
      return NextResponse.json({ error: `Unable to save SMS preferences: ${upsert.error.message}` }, { status: 500 });
    }

    const touchLead = await supabase.from("leads").update({ updated_at: now }).eq("id", leadId);
    if (touchLead.error) {
      return NextResponse.json({ error: `Preferences saved but lead update failed: ${touchLead.error.message}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 500 },
    );
  }
}
