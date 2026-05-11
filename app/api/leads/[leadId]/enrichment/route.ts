import { NextResponse } from "next/server";
import { z } from "zod";

import { getSupabaseServiceClient } from "@/lib/supabase";

const enrichmentSchema = z.object({
  type: z.enum(["gate_instructions", "preferred_service_days", "problem_areas"]),
  value: z.string().trim().min(2).max(2000),
});

export async function POST(
  request: Request,
  context: { params: Promise<{ leadId: string }> },
) {
  try {
    const { leadId } = await context.params;
    const raw = (await request.json()) as unknown;
    const parsed = enrichmentSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid enrichment payload." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServiceClient();

    const leadCheck = await supabase.from("leads").select("id").eq("id", leadId).maybeSingle();
    if (leadCheck.error || !leadCheck.data) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    const insert = await supabase.from("lead_enrichment").insert({
      lead_id: leadId,
      detail_type: parsed.data.type,
      detail_value: parsed.data.value,
      created_at: new Date().toISOString(),
    });

    if (insert.error) {
      return NextResponse.json({ error: `Unable to save detail: ${insert.error.message}` }, { status: 500 });
    }

    const touchLead = await supabase.from("leads").update({ updated_at: new Date().toISOString() }).eq("id", leadId);

    if (touchLead.error) {
      return NextResponse.json({ error: `Saved detail but failed to touch lead: ${touchLead.error.message}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 500 },
    );
  }
}
