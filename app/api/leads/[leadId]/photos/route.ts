import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { getLeadPhotoBucket, getSupabaseServiceClient } from "@/lib/supabase";

export async function POST(
  request: Request,
  context: { params: Promise<{ leadId: string }> },
) {
  try {
    const { leadId } = await context.params;
    const formData = await request.formData();

    const files = formData
      .getAll("photos")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0)
      .slice(0, 8);

    if (files.length === 0) {
      return NextResponse.json({ error: "No photo files provided." }, { status: 400 });
    }

    const supabase = getSupabaseServiceClient();

    const leadCheck = await supabase.from("leads").select("id").eq("id", leadId).maybeSingle();
    if (leadCheck.error || !leadCheck.data) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    const bucket = getLeadPhotoBucket();
    const now = new Date().toISOString();

    for (const file of files) {
      const extension = (file.name.split(".").pop() || "jpg").toLowerCase();
      const filePath = `${leadId}/${randomUUID()}.${extension}`;

      const upload = await supabase.storage.from(bucket).upload(filePath, file, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

      if (upload.error) {
        return NextResponse.json({ error: `Photo upload failed: ${upload.error.message}` }, { status: 500 });
      }

      const insert = await supabase.from("lead_photos").insert({
        lead_id: leadId,
        storage_path: filePath,
        caption: "Follow-up photo",
        created_at: now,
      });

      if (insert.error) {
        return NextResponse.json({ error: `Photo record failed: ${insert.error.message}` }, { status: 500 });
      }
    }

    const touchLead = await supabase.from("leads").update({ updated_at: new Date().toISOString() }).eq("id", leadId);

    if (touchLead.error) {
      return NextResponse.json({ error: `Photos saved but lead update failed: ${touchLead.error.message}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true, uploaded: files.length });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 500 },
    );
  }
}
